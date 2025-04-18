// middleware.ts
import { NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/server/appwrite";

export async function middleware(request: Request) {
  const user = await getLoggedInUser();
  const url = new URL(request.url);

  // Allow auth route without restrictions
  if (url.pathname === "/auth") {
    if (user?.$id === process.env.APPWRITE_ADMIN_USER_ID) {
      console.log("Redirecting authenticated admin to dashboard");
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if (url.pathname.startsWith("/admin")) {
    if (!user) {
      console.log("No user - redirecting to auth");
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    if (user.$id !== process.env.APPWRITE_ADMIN_USER_ID) {
      console.log("User not admin - redirecting to unauthorized");
      return NextResponse.redirect(
        new URL("/auth?error=unauthorized", request.url),
      );
    }
  }

  return NextResponse.next();
}
