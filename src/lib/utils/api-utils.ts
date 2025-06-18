import { NextRequest, NextResponse } from "next/server";

type ApiHandlerFunction<T> = (req: NextRequest, userId?: string) => Promise<T>;

/**
 * A utility wrapper for API route handlers that provides standardized error handling
 * and passes the authenticated user ID from request headers
 */
export async function apiHandler<T>(
  req: NextRequest,
  handler: ApiHandlerFunction<T>,
): Promise<NextResponse> {
  try {
    // Get the user ID from request headers (set by middleware)
    const userId = req.headers.get("x-user-id");

    // Call the handler function with request and user ID
    const result = await handler(req, userId || undefined);

    // Return the result
    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);

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
