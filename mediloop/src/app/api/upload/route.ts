import { NextResponse } from 'next/server';
import FileModel from '@/db/models/MulterModels';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
  try {
    const fileData = await request.json();

    // Upload base64 image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(fileData.base64Data, {
      folder: 'mediloop'
    });

    // Update file metadata with Cloudinary information
    const updatedFileData = {
      ...fileData,
      createdAt: new Date(fileData.createdAt),
      cloudinaryId: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url
    };

    // Save file metadata to database
    await FileModel.saveFile(updatedFileData);

    return NextResponse.json({
      success: true,
      url: cloudinaryResponse.secure_url
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
