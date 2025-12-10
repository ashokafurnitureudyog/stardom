import { NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/server/appwrite";
import type { NextRequest } from "next/server";

// Constants
const ROUTES = {
  AUTH: "/auth",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN: "/admin",
  AUTH_DASHBOARD: "/auth/dashboard",
  API_PROTECTED: "/api/protected",
};

/**
 * Handle API protected routes
 */
async function handleApiProtectedRoutes(
  request: NextRequest,
): Promise<NextResponse | null> {
  const url = new URL(request.url);

  if (!url.pathname.startsWith(ROUTES.API_PROTECTED)) {
    return null;
  }

  // We rely on api-utils.ts for the actual detailed validation to avoid double-fetching
  // inside the proxy if possible, OR we do a quick check here.
  // However, since we want to block unauthorized access at the edge/proxy level:
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null; // Let the request continue to the actual API route
}

/**
 * Handle auth page
 */
async function handleAuthPage(
  request: NextRequest,
): Promise<NextResponse | null> {
  const url = new URL(request.url);

  if (url.pathname !== ROUTES.AUTH) {
    return null;
  }

  const user = await getLoggedInUser();

  if (user?.$id === process.env.APPWRITE_ADMIN_USER_ID) {
    return NextResponse.redirect(new URL(ROUTES.ADMIN_DASHBOARD, request.url));
  }

  return null;
}

/**
 * Handle admin routes
 */
async function handleAdminRoutes(
  request: NextRequest,
): Promise<NextResponse | null> {
  const url = new URL(request.url);

  if (
    !url.pathname.startsWith(ROUTES.ADMIN) &&
    url.pathname !== ROUTES.AUTH_DASHBOARD
  ) {
    return null;
  }

  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.redirect(new URL(ROUTES.AUTH, request.url));
  }

  if (user.$id !== process.env.APPWRITE_ADMIN_USER_ID) {
    return NextResponse.redirect(
      new URL(`${ROUTES.AUTH}?error=unauthorized`, request.url),
    );
  }

  return null;
}

export default async function proxy(
  request: NextRequest,
): Promise<NextResponse> {
  // Check API routes first
  const apiResponse = await handleApiProtectedRoutes(request);
  if (apiResponse) return apiResponse;

  // Check Auth page
  const authResponse = await handleAuthPage(request);
  if (authResponse) return authResponse;

  // Check Admin routes
  const adminResponse = await handleAdminRoutes(request);
  if (adminResponse) return adminResponse;

  // Default response
  const response = NextResponse.next();

  // Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth",
    "/auth/dashboard",
    "/api/protected/:path*",
  ],
};
