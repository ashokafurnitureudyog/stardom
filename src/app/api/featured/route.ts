/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";

export async function GET() {
  const adminClient = await createAdminClient();

  try {
    const featured = await adminClient.database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_FEATURED_COLLECTION_ID!, // Use env var instead of hardcoded "featured"
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
  } catch (error: any) {
    console.error("Failed to fetch featured products:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch featured products" },
      { status: 500 },
    );
  }
}
