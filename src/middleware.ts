import { NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/server/appwrite";

export async function middleware(request: Request) {
  const url = new URL(request.url);

  // Handle authentication for protected API routes
  if (url.pathname.startsWith("/api/protected")) {
    try {
      const user = await getLoggedInUser();

      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // If authentication succeeded, attach user to request headers
      // so it can be accessed in route handlers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", user.$id);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 },
      );
    }
  }

  // Handle authentication for /auth page
  if (url.pathname === "/auth") {
    try {
      const user = await getLoggedInUser();
      if (user?.$id === process.env.APPWRITE_ADMIN_USER_ID) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    } catch {
      // User not authenticated, showing login page
    }
    return NextResponse.next();
  }

  // Protect admin routes and auth/dashboard route
  if (url.pathname.startsWith("/admin") || url.pathname === "/auth/dashboard") {
    try {
      const user = await getLoggedInUser();
      if (!user) {
        return NextResponse.redirect(new URL("/auth", request.url));
      }
      if (user.$id !== process.env.APPWRITE_ADMIN_USER_ID) {
        return NextResponse.redirect(
          new URL("/auth?error=unauthorized", request.url),
        );
      }
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

// Define which paths this middleware should run on
export const config = {
  matcher: [
    "/admin/:path*",
    "/auth",
    "/auth/dashboard",
    "/api/protected/:path*",
  ],
};
