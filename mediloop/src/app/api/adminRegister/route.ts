import errorHandler from "@/db/helpers/errorHandler";
import AdminModel from "@/db/models/AdminModels";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await AdminModel.register(data);

    return new Response(
      JSON.stringify({
        message: "Admin created successfully",
        status: 201,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return errorHandler(error);
  }
}