import { signToken } from "@/db/helpers/jwt";
import AdminModel from "@/db/models/AdminModels";
import errorHandler from "@/db/helpers/errorHandler";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const admin = await AdminModel.validateAdmin(body.email, body.password);

    const accessToken = signToken({ 
      _id: admin._id.toString()
    });

    cookies().set("Authorization", `Bearer ${accessToken}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/"
    });

    return Response.json({ 
      message: "Admin login successful",
      accessToken 
    });
  } catch (error) {
    return errorHandler(error);
  }
}