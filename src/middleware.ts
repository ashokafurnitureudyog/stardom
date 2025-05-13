/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/server/appwrite";

export async function middleware(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === "/auth") {
    try {
      const user = await getLoggedInUser();
      if (user?.$id === process.env.APPWRITE_ADMIN_USER_ID) {
        console.log("Redirecting authenticated admin to dashboard");
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    } catch (error) {
      console.log("User not authenticated, showing login page");
    }
    return NextResponse.next();
  }

  // Protect admin routes and auth/dashboard route
  if (url.pathname.startsWith("/admin") || url.pathname === "/auth/dashboard") {
    try {
      const user = await getLoggedInUser();

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

      return NextResponse.next();
    } catch (error) {
      console.log("Authentication error - redirecting to auth");
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}
