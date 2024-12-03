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

   
    static async updateProductByName(name: string, updates: Partial<Product>) {
        const result = await this.collection().findOneAndUpdate(
            { name },
            { $set: updates },
            { returnDocument: "after" }
        );
        if (!result) {
            return null;
        }
        return result;
    }

   
    static async deleteProductByName(name: string) {
        const result = await this.collection().deleteOne({ name });
        return result.deletedCount > 0;
    }
}

export default ProductModel;
