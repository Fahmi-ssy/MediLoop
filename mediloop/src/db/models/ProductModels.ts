import { Product } from "@/types";
import database from "../config/mongodb";

class ProductModel {
    static collection() {
        return database.collection("products");
    }

    static async getAll(page: number, limit: number, query?: string) {
        try {
            const skip = (page - 1) * limit;
            let filter = {};
            if (query) {
                filter = {
                    $or: [
                        { name: { $regex: query, $options: 'i' } },
                    ]
                };
            }
            const products = await this.collection().find(filter).skip(skip).limit(limit).toArray();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    static async getByName(name: string) {
        const product = await this.collection().findOne({
            name: name,
        });
        return product;
    }

    static async searchByNameOrDescription(searchQuery: string) {
        const regex = new RegExp(searchQuery, "i"); 
        const products = await this.collection()
          .find({
            $or: [{ name: regex }, { description: regex }],
          })
          .toArray();
        return products;
    }

    static async create(data: Omit<Product, '_id'>) {
        try {
            if (!data.product_embedding) {
                throw new Error("Product embedding is required");
            }
            const result = await this.collection().insertOne({
                ...data,
                product_embedding: data.product_embedding
            } as Product);
            if (!result.acknowledged) {
                throw new Error("Failed to insert product");
            }
            return result;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    }

    static async updateOne(filter: Partial<Product>, updateData: any) {
        try {
            const result = await this.collection().updateOne(filter, updateData);
            return result;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    }

    static async deleteOne(filter: Filter<Document>) {
        try {
            const result = await this.collection().deleteOne(filter);
            return result;
        } catch (error) {
            console.error("Error in deleteOne:", error);
            throw error;
        }
    }
}

export default ProductModel;
