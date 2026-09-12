import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/server/appwrite";

// Constants
const ROUTES = {
  AUTH: "/auth",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN: "/admin",
  AUTH_DASHBOARD: "/auth/dashboard",
};

/**
 * The single account allowed into the dashboard. Missing configuration denies
 * access outright rather than bouncing the user between /auth and /admin,
 * which reads as a redirect loop in the browser.
 */
function adminUserId(): string | null {
  const id = process.env.APPWRITE_ADMIN_USER_ID;
  if (!id) {
    console.error("APPWRITE_ADMIN_USER_ID is not set; admin access is disabled.");
    return null;
  }
  return id;
}

/**
 * Handle auth page
 */
async function handleAuthPage(request: NextRequest): Promise<NextResponse | null> {
  const url = new URL(request.url);

  if (url.pathname !== ROUTES.AUTH) {
    return null;
  }

  const admin = adminUserId();
  if (!admin) return null;

  const user = await getLoggedInUser();

  if (user?.$id === admin) {
    return NextResponse.redirect(new URL(ROUTES.ADMIN_DASHBOARD, request.url));
  }

  return null;
}

/**
 * Handle admin routes
 */
async function handleAdminRoutes(request: NextRequest): Promise<NextResponse | null> {
  const url = new URL(request.url);

  if (!url.pathname.startsWith(ROUTES.ADMIN) && url.pathname !== ROUTES.AUTH_DASHBOARD) {
    return null;
  }

  const admin = adminUserId();
  if (!admin) {
    return new NextResponse("Admin access is not configured.", { status: 503 });
  }

  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.redirect(new URL(ROUTES.AUTH, request.url));
  }

  if (user.$id !== admin) {
    return NextResponse.redirect(new URL(`${ROUTES.AUTH}?error=unauthorized`, request.url));
  }

  return null;
}

export default async function proxy(request: NextRequest): Promise<NextResponse> {
  // Check Auth page
  const authResponse = await handleAuthPage(request);
  if (authResponse) return authResponse;

  // Check Admin routes
  const adminResponse = await handleAdminRoutes(request);
  if (adminResponse) return adminResponse;

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth", "/auth/dashboard"],
};
