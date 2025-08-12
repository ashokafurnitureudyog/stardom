"use server";
import { createAdminClient } from "@/lib/server/appwrite";
import { ID } from "node-appwrite";

interface TestimonialResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

export async function getTestimonials(): Promise<TestimonialResponse> {
  try {
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_TESTIMONIALS_COLLECTION_ID!;

    const response = await database.listDocuments(databaseId, collectionId);
    return { success: true, data: response.documents };
  } catch (error: unknown) {
    console.error("Failed to fetch testimonials:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch testimonials";
    return { success: false, error: errorMessage };
  }
}

// Modify just this function in the controller file
export async function createTestimonial(
  formData: FormData,
): Promise<TestimonialResponse> {
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
  } catch (error: unknown) {
    console.error("Failed to create testimonial:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create testimonial";
    return { success: false, error: errorMessage };
  }
}

export async function deleteTestimonial(
  testimonialId: string,
): Promise<TestimonialResponse> {
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
  } catch (error: unknown) {
    console.error("Failed to delete testimonial:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete testimonial";
    return { success: false, error: errorMessage };
  }
}

export async function updateTestimonial(
  formData: FormData,
): Promise<TestimonialResponse> {
  try {
    const { database } = await createAdminClient();

    // Get the ID of the testimonial to update
    const id = formData.get("id") as string;
    if (!id) {
      throw new Error("Testimonial ID is required for update");
    }

    // Get basic fields
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const context = formData.get("context") as string;
    const purchaseDate = formData.get("purchaseDate") as string;
    const quote = formData.get("quote") as string;

    // Get image URL
    let img = formData.get("img") as string;
    const imageRemoved = formData.get("imageRemoved") === "true";

    // If image was explicitly removed, set img to empty string
    if (imageRemoved) {
      img = "";
    }

    // Database details
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_TESTIMONIALS_COLLECTION_ID!;

    if (!databaseId || !collectionId) {
      throw new Error("Database or collection ID not configured");
    }

    // Update testimonial document
    const testimonial = await database.updateDocument(
      databaseId,
      collectionId,
      id,
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
  } catch (error: unknown) {
    console.error("Failed to update testimonial:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update testimonial";
    return { success: false, error: errorMessage };
  }
}
