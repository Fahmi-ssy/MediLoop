import errorHandler from "@/db/helpers/errorHandler";
import UserModel from "@/db/models/UserModels";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await UserModel.register(data);

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        status: 200,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
}
