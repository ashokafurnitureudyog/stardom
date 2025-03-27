// middleware.ts
import { NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/server/appwrite";

export async function middleware(request: Request) {
  const user = await getLoggedInUser();

  if (!user && request.url.includes("/admin")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}
// See "Matching Paths" below to learn more
// src/middleware.ts
export const config = {
  matcher: "/admin/:path*",
};
