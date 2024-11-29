import { verifyWithJose } from "@/db/helpers/jwt";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const auth = cookies().get("Authorization")?.value;

  // Middleware only applies to the /api/multer route
  if (request.nextUrl.pathname.startsWith("/api/multer")) {
    // If no Authorization header exists, return Unauthorized response
    if (!auth) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Split the "Authorization" header into type and token
    const [type, token] = auth.split(" ");
    
    // Ensure the token type is "Bearer"
    if (type !== "Bearer") {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      // Verify the JWT token using your custom helper
      const verified = await verifyWithJose<{ _id: string }>(token);
      // Attach the user ID as a custom header for downstream use
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", verified._id);

      // Continue with the next response, adding the modified headers
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      // Handle any errors during token verification
      return new NextResponse(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // If the path doesn't match, pass the request through unchanged
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/multer/:path*"], // Only applies to the /api/multer routes
};
