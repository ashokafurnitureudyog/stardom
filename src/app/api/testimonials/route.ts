import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";

export async function GET() {
  try {
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_TESTIMONIALS_COLLECTION_ID!;

    const response = await database.listDocuments(databaseId, collectionId);

    return NextResponse.json(response.documents);
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 },
    );
  }
}
