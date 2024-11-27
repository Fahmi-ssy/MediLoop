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
   } catch (err) {
       console.error(err);
       return new Response(
           JSON.stringify({
               message: "Failed to create user",
               status: 500,
           }),
           { status: 500, headers: { "Content-Type": "application/json" } }
       );
   }
}
