import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";

export async function GET() {
  try {
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_PORTFOLIO_COLLECTION_ID!;

    const response = await database.listDocuments(databaseId, collectionId);

    // Transform the documents to include the testimonial object
    const transformedProjects = response.documents.map((doc) => ({
      ...doc,
      id: doc.$id,
      testimonial: {
        quote: doc.testimonial_quote || "",
        author: doc.testimonial_author || "",
        position: doc.testimonial_position || "",
      },
    }));

    return NextResponse.json(transformedProjects);
  } catch (error) {
    console.error("Failed to fetch portfolio projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio projects" },
      { status: 500 },
    );
  }
}
