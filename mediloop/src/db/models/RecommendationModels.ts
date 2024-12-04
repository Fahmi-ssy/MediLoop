import database from "../config/mongodb";
import { ObjectId } from 'mongodb';

interface RecommendationSchema {
    userId?: string;
    todoList: string[];
    lifestyleChanges: string[];
    products: {
      name: string;
      description: string;
      image: string;
      price: number;
    }[];
    imageAnalysis?: string;
    createdAt: Date;
    imageUrl?: string;
  }
  
  class RecommendationModel {
    static collection() {
      return database.collection<RecommendationSchema>("recommendations");
    }
  
    static async create(data: RecommendationSchema) {
      if (!data.userId) {
        throw new Error('userId is required');
      }
      
      // console.log('Creating recommendation with data:', {
      //   ...data,
      //   userId: data.userId,
      //   todoListLength: data.todoList.length,
      //   lifestyleChangesLength: data.lifestyleChanges.length,
      //   productsLength: data.products.length
      // });
      
      try {
        const result = await this.collection().insertOne({
          ...data,
          createdAt: new Date()
        });
        
        console.log('Creation result:', result);
        
        // Verify the document was created
        const savedDoc = await this.collection().findOne({ _id: result.insertedId });
        // console.log('Saved document:', savedDoc);
        
        return result;
      } catch (error) {
        console.error('Error in create:', error);
        throw error;
      }
    }
  
    static async findByUserId(userId: string) {
      console.log('Finding recommendations for userId:', userId);
      
      try {
        const collection = this.collection();
        console.log('Collection name:', collection.collectionName);
        
        const query = { userId: userId };
        console.log('Query:', query);
        
        const result = await collection
          .find(query)
          .sort({ createdAt: -1 })
          .toArray();
          
        console.log('Raw database result:', result);
        
        return result;
      } catch (error) {
        console.error('Error in findByUserId:', error);
        throw error;
      }
    }
  
    static async deleteOne(id: string) {
      if (!id) {
        throw new Error('id is required');
      }
      
      try {
        console.log('Deleting recommendation with id:', id);
        const result = await this.collection().deleteOne({ 
          _id: new ObjectId(id) 
        });
        
        console.log('Delete result:', result);
        return result;
      } catch (error) {
        console.error('Error in deleteOne:', error);
        throw error;
      }
    }
  }
  
  export default RecommendationModel;