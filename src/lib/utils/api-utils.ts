import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";

type ApiHandlerFunction<T> = (req: NextRequest, userId?: string) => Promise<T>;

/**
 * A utility wrapper for API route handlers that provides standardized error handling
 * and enforces strict server-side session validation.
 */
export async function apiHandler<T>(
  req: NextRequest,
  handler: ApiHandlerFunction<T>,
): Promise<NextResponse> {
  try {
    // strict server-side validation
    // We do NOT trust x-user-id header from the client or proxy

    const sessionCookie = (await cookies()).get("admin-session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { error: "Unauthorized: No session found" },
        { status: 401 },
      );
    }

    // Verify session validity with Appwrite
    // This throws if session is invalid
    const { account } = await createSessionClient();
    const user = await account.get();

    // Call the handler function with request and verified user ID
    const result = await handler(req, user.$id);

    // Return the result
    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);

    // Handle authentication errors specifically
    // Appwrite throws 401/403 errors typically with code property or specific message
    const isAuthError =
      error instanceof Error &&
      (error.message.includes("Unauthorized") ||
        error.message.includes("unauthorized") ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).code === 401);

    if (isAuthError) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid session" },
        { status: 401 },
      );
    }

    // Handle different error types
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "An error occurred" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 },
    );
  }
}

/**
 * Extract and parse JSON data from a request
 */
export async function parseRequestJson<T>(req: NextRequest): Promise<T> {
  return (await req.json()) as T;
}

/**
 * Extract and parse FormData from a request
 */
export async function parseRequestFormData(
  req: NextRequest,
): Promise<FormData> {
  return await req.formData();
}
