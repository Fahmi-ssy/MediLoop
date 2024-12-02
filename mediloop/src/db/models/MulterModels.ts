import { z } from "zod";
import database from "../config/mongodb";
import { ObjectId } from "mongodb";
import { FileMetadata } from "@/types";

// Define schema for file data validation
const FileSchema = z.object({
  originalName: z.string(), // Original file name from client
  cloudinaryId: z.string(), // Cloudinary public_id
  url: z.string().url(), // Cloudinary URL
  uploadedBy: z.string(), // User or entity that uploaded the file
  createdAt: z.union([z.date(), z.string()]).transform((val) => new Date(val)),
  base64Data: z.string().optional(), // Add this field to store base64 data if needed
});

// Infer the TypeScript type from Zod schema


class FileModel {
  static collection() {
    return database.collection<FileMetadata>("files");
  }

  static async saveFile(fileData: FileMetadata & { base64Data?: string }) {
    // Validate data with Zod
    FileSchema.parse(fileData);

    // If you want to store the base64 data, include it in the database
    // Be cautious with this as base64 strings can be quite large
    const dataToStore = {
      ...fileData,
      base64Data: fileData.base64Data ? fileData.base64Data.substring(0, 1000) : undefined, // Optional: store truncated base64 if needed
    };

    // Save metadata to the database
    const result = await this.collection().insertOne(dataToStore);
    return result;
  }

  static async findFileById(id: string) {
    const objectId = new ObjectId(id);
    return this.collection().findOne({ _id: objectId });
  }

  static async deleteFileByCloudinaryId(cloudinaryId: string) {
    const result = await this.collection().deleteOne({ cloudinaryId });
    return result;
  }
}

export default FileModel;
