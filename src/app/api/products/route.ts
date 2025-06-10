import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";

// Update GET products route
export async function GET() {
  const adminClient = await createAdminClient();

  try {
    const products = await adminClient.database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
    );

    // Map the products to ensure they're in the expected format
    const mappedProducts = products.documents.map((product) => {
      // Add a 'collection' property that mirrors product_collection for compatibility
      return {
        ...product,
        id: product.$id, // Ensure id is always available
        collection: product.product_collection, // Add this for backward compatibility
      };
    });

    return NextResponse.json(mappedProducts);
  } catch (error: unknown) {
    console.error("Failed to fetch products:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch products";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
