import { signToken } from "@/db/helpers/jwt";
import AdminModel from "@/db/models/AdminModels";
import errorHandler from "@/db/helpers/errorHandler";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const admin = await AdminModel.validateAdmin(body.email, body.password);

    const accessToken = signToken({ 
      _id: admin._id.toString(),
      role: "admin" 
    });
   
    cookies().set("Authorization", `Bearer ${accessToken}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 7 days      
    });

    return Response.json({ 
      message: "Admin login successful",
      accessToken 
    });
  } catch (error) {
    return errorHandler(error);
  }
}