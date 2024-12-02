import { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId | string; // _id can be an ObjectId or a string (after conversion)
    username: string;
    email: string;
    password: string;
    // other user fields
  }
// types.ts
export interface FileMetadata {
    originalName: string;
    cloudinaryId: string;
    url: string;
    uploadedBy: string;
    createdAt?: Date;
  }
  
  export interface Post {
    id: string;
    title: string;
    content: string;
    file?: FileMetadata; // Optional file attachment
    createdBy: string; // User ID
    createdAt: Date;
  }

  export interface File {
    _id: ObjectId | string;
    originalName: string;
    cloudinaryId: string;
    url: string;
    uploadedBy: string;
    createdAt: Date;
  }
  
  export interface Product {
    _id: ObjectId | string;
    name: string;
    description: string;
    price: number;
    image: FileMetadata;
    createdAt: Date;
    createdBy: string; // User ID
    
  }