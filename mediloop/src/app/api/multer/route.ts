import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import FileModel from "@/db/models/MulterModels";
import { IncomingMessage } from "http";

// Configure multer storage (memory for now)
const upload = multer({ storage: multer.memoryStorage() });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser to allow multer to handle the request
  },
};

// Handle file upload for POST requests
export async function POST(req: NextRequest) {
  // Ensure it's a POST request
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }

  try {
    // Create a promise to handle multer's async behavior
    await new Promise<void>((resolve, reject) => {
      const reqWithHeaders = req as unknown as IncomingMessage; // Cast to IncomingMessage to work with multer

      // Use multer to handle the file upload
      const multerUpload = upload.single("file"); // 'file' is the name of the form field in Postman

      // Use the `reqWithHeaders` object to pass into multer
      multerUpload(reqWithHeaders, {} as any, (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    // After multer has processed the file, retrieve the uploaded file from `req.file`
    const file = (req as any).file;
    console.log(file, "file");

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    // Extract user ID from request headers (you might need middleware to add this)
    const userId = req.headers.get("x-user-id");
    console.log(userId, "userId");

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized: No user ID found" }, { status: 401 });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      async (error, cloudinaryResult: UploadApiResponse | undefined) => {
        if (error) {
          return NextResponse.json({ message: "Cloudinary upload failed" }, { status: 500 });
        }

        if (!cloudinaryResult) {
          return NextResponse.json({ message: "Cloudinary returned no result" }, { status: 500 });
        }

        // Save file metadata to your database
        const fileMetadata = {
          originalName: file.originalname,
          cloudinaryId: cloudinaryResult.public_id,
          url: cloudinaryResult.secure_url,
          uploadedBy: userId, // userId is now guaranteed to be a string
          createdAt: new Date(),
        };

        // Save file details to the database
        const saveResult = await FileModel.saveFile(fileMetadata);

        // Send response with the saved file details
        return NextResponse.json({
          message: "File uploaded successfully",
          saveResult,
        });
      }
    );

    // Pipe the file stream to Cloudinary
    file.stream.pipe(result);
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ message: "File upload failed" }, { status: 500 });
  }
}
