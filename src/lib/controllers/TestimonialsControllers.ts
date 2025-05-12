/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { createAdminClient } from "@/lib/server/appwrite";
import { ID } from "node-appwrite";

export async function getTestimonials() {
  try {
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_TESTIMONIALS_COLLECTION_ID!;

    const response = await database.listDocuments(databaseId, collectionId);
    return { success: true, data: response.documents };
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return { success: false, error: "Failed to fetch testimonials" };
  }
}

// Modify just this function in the controller file
export async function createTestimonial(formData: FormData) {
  try {
    const { database } = await createAdminClient();

    // Get basic fields
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const context = formData.get("context") as string;
    const purchaseDate = formData.get("purchaseDate") as string;
    const quote = formData.get("quote") as string;

    // Get image URL directly - no conditional logic needed!
    const img = formData.get("img") as string;

    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_TESTIMONIALS_COLLECTION_ID!;

    if (!databaseId || !collectionId) {
      throw new Error("Database or collection ID not configured");
    }

    // Create testimonial document
    const testimonial = await database.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        name,
        title,
        location,
        context,
        purchaseDate,
        verified: true,
        quote,
        img,
      },
    );

    return { success: true, data: testimonial };
  } catch (error: any) {
    console.error("Failed to create testimonial:", error);
    return {
      success: false,
      error: error.message || "Failed to create testimonial",
    };
  }
}

export async function deleteTestimonial(testimonialId: string) {
  try {
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_TESTIMONIALS_COLLECTION_ID!;

    if (!databaseId || !collectionId) {
      throw new Error("Database or collection ID not configured");
    }

    // Delete testimonial document
    await database.deleteDocument(databaseId, collectionId, testimonialId);

    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete testimonial:", error);
    return {
      success: false,
      error: error.message || "Failed to delete testimonial",
    };
  }
}
