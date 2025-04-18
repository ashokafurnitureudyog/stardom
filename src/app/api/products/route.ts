/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";

export async function GET() {
  const adminClient = await createAdminClient();

  try {
    const products = await adminClient.database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
    );
    return NextResponse.json(products.documents);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
