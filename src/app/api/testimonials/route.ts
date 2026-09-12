import { NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";

export async function GET() {
  try {
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_TESTIMONIALS_COLLECTION_ID!;

    const response = await database.listRows({
      databaseId: databaseId,
      tableId: collectionId,
      queries: [Query.limit(100)],
    });

    return NextResponse.json(response.rows);
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
