import { Product } from "@/types";
import database from "../config/mongodb";

class ProductModel {
    static collection() {
        return database.collection<Product>("products");
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
}

export default ProductModel;
