import { NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";

export async function GET() {
  const adminClient = await createAdminClient();

  try {
    const featured = await adminClient.database.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_FEATURED_COLLECTION_ID!,
      queries: [Query.limit(100)],
    });

    // Map the products to ensure they're in the expected format
    const mappedProducts = featured.rows.map((product) => {
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
      error instanceof Error ? error.message : "Failed to fetch featured products";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
