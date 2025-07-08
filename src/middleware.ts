import { NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/server/appwrite";
import type { NextRequest } from "next/server";
import { User } from "./types/ComponentTypes";
//TODO: Do API Key authentication in all API routes to prevent unauthorized access
// Constants for better maintainability
const ROUTES = {
  AUTH: "/auth",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN: "/admin",
  AUTH_DASHBOARD: "/auth/dashboard",
  API_PROTECTED: "/api/protected",
};

const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized",
  AUTHENTICATION_FAILED: "Authentication failed",
};

// Cache for user authentication to prevent duplicate calls
const cachedUserRequests = new Map<string, Promise<User | null>>();

/**
 * Gets the logged-in user with request-based caching
 */
async function getUserWithCache(requestId: string): Promise<User | null> {
  if (!cachedUserRequests.has(requestId)) {
    const userPromise = getLoggedInUser().catch((error) => {
      // Delete from cache on error so subsequent requests can retry
      cachedUserRequests.delete(requestId);
      throw error;
    });

    cachedUserRequests.set(requestId, userPromise);

    // Clean up cache after a short delay
    setTimeout(() => cachedUserRequests.delete(requestId), 5000);
  }

  return cachedUserRequests.get(requestId)!;
}

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

  try {
    const requestId = request.url;
    const user = await getUserWithCache(requestId);

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: 401 },
      );
    }

    // Attach user to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", user.$id);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("API authentication error:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.AUTHENTICATION_FAILED },
      { status: 401 },
    );
  }
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

  try {
    const requestId = request.url;
    const user = await getUserWithCache(requestId);

    if (user?.$id === process.env.APPWRITE_ADMIN_USER_ID) {
      return NextResponse.redirect(
        new URL(ROUTES.ADMIN_DASHBOARD, request.url),
      );
    }
  } catch (error) {
    // Allow access to login page if user is not authenticated
    console.debug("User not authenticated for auth page:", error);
  }

  return NextResponse.next();
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

  try {
    const requestId = request.url;
    const user = await getUserWithCache(requestId);

    if (!user) {
      return NextResponse.redirect(new URL(ROUTES.AUTH, request.url));
    }

    if (user.$id !== process.env.APPWRITE_ADMIN_USER_ID) {
      return NextResponse.redirect(
        new URL(`${ROUTES.AUTH}?error=unauthorized`, request.url),
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Admin route authentication error:", error);
    return NextResponse.redirect(new URL(ROUTES.AUTH, request.url));
  }
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // Process handlers in sequence
  const apiResponse = await handleApiProtectedRoutes(request);
  if (apiResponse) return apiResponse;

  const authResponse = await handleAuthPage(request);
  if (authResponse) return authResponse;

  const adminResponse = await handleAdminRoutes(request);
  if (adminResponse) return adminResponse;

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
