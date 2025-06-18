import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";

export async function GET() {
  const adminClient = await createAdminClient();

  try {
    const featured = await adminClient.database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FEATURED_COLLECTION_ID!,
    );

    // Map the products to ensure they're in the expected format
    const mappedProducts = featured.documents.map((product) => {
      return {
        ...product,
        id: product.$id, // Ensure id is always available
        collection: product.product_collection, // Add this for backward compatibility
      };
    });

    return NextResponse.json(mappedProducts);
  } catch (error: unknown) {
    console.error("Failed to fetch featured products:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to fetch featured products";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
