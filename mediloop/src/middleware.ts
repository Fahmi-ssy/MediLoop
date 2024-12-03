import { verifyWithJose } from "@/db/helpers/jwt";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const auth = cookies().get("Authorization")?.value;

  // Middleware only applies to the /api/upload route
  if (request.nextUrl.pathname.startsWith("/api/upload")) {
    // If no Authorization header exists, return Unauthorized response
    if (!auth)
      return NextResponse.json(
        {
          message: "You need to login first to upload image.",
        },
        {
          status: 401,
        }
      );
    const [type, token] = auth?.split(" ");
    if (type !== "Bearer")
      return NextResponse.json(
        {
          message: "You need to login first to upload image.",
        },
        {
          status: 401,
        }
      );

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

  // Middleware only applies to the /discovery route
  if (request.nextUrl.pathname.startsWith("/discovery")) {
    if (!auth) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Check if the route is admin-specific
  if (request.nextUrl.pathname.startsWith("/adminDashboard")) {
    const auth = cookies().get("Authorization")?.value;

    if (!auth) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const [type, token] = auth.split(" ");
      
      if (type !== "Bearer") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      const verified = await verifyWithJose<{ _id: string; role: string }>(token);
      
      // Check if the user has admin role
      if (verified.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Check if the route is admin-specific
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const auth = cookies().get("Authorization")?.value;

    if (!auth) {
      return NextResponse.redirect(new URL("/adminLogin", request.url));
    }

    try {
      const [type, token] = auth.split(" ");
      
      if (type !== "Bearer") {
        return NextResponse.redirect(new URL("/adminLogin", request.url));
      }

      const verified = await verifyWithJose<{ _id: string; role: string }>(token);
      
      // Check if the user has admin role
      if (verified.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/adminLogin", request.url));
    }
  }

  // If the path doesn't match, pass the request through unchanged
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/upload/:path*", "/discovery/:path*", "/adminDashboard/:path*", "/admin/:path*"],
};
