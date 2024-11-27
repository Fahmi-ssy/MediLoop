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
  createdAt: z.date().default(() => new Date()), // Auto-generate creation date
});

// Infer the TypeScript type from Zod schema


class FileModel {
  static collection() {
    return database.collection<FileMetadata>("files");
  }

  static async saveFile(fileData: FileMetadata) {
    // Validate data with Zod
    FileSchema.parse(fileData);

    // Save metadata to the database
    const result = await this.collection().insertOne(fileData);
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
