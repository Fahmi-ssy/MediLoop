import { comparePassword } from "@/db/helpers/bycrypt";
import { signToken } from "@/db/helpers/jwt";
import UserModel from "@/db/models/UserModels";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);

    const user = await UserModel.findByEmail(body.email);
    if (!user) throw { message: "Invalid email/password", status: 401 };

    const isValid = comparePassword(body.password, user.password);
    if (!isValid) throw { message: "Invalid email/password", status: 401 };

    const accessToken = signToken({ _id: user._id.toString() });

    cookies().set("Authorization", `Bearer ${accessToken}`);
    return Response.json({ message: "Login success", accessToken });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Unable to login",
        status: 500,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
