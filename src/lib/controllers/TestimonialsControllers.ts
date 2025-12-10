"use server";
import { createAdminClient, getLoggedInUser } from "@/lib/server/appwrite";
import { ID } from "node-appwrite";
import { testimonialSchema } from "@/lib/validations/cms";

interface TestimonialResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

export async function getTestimonials(): Promise<TestimonialResponse> {
  // Public read is fine
  try {
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_TESTIMONIALS_COLLECTION_ID!;

    const response = await database.listDocuments(databaseId, collectionId);
    return { success: true, data: response.documents };
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch testimonials";
    return { success: false, error: errorMessage };
  }
}

export async function createTestimonial(
  formData: FormData,
): Promise<TestimonialResponse> {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    const rawData = Object.fromEntries(formData);
    const validatedData = testimonialSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.issues[0].message,
      };
    }

    const { name, title, location, context, purchaseDate, quote, img } =
      validatedData.data;

    const { database } = await createAdminClient();
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
  } catch (error) {
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
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_TESTIMONIALS_COLLECTION_ID!;

    if (!databaseId || !collectionId) {
      throw new Error("Database or collection ID not configured");
    }

    // Delete testimonial document
    await database.deleteDocument(databaseId, collectionId, testimonialId);

    return { success: true };
  } catch (error) {
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
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    const rawData = Object.fromEntries(formData);
    // Validate with Zod
    const validatedData = testimonialSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.issues[0].message,
      };
    }

    const {
      name,
      title,
      location,
      context,
      purchaseDate,
      quote,
      img: validatedImg,
      id,
      imageRemoved: imageRemovedStr,
    } = validatedData.data;

    if (!id) {
      throw new Error("Testimonial ID is required for update");
    }

    const { database } = await createAdminClient();

    let img = validatedImg || "";
    const imageRemoved = imageRemovedStr === "true";

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
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update testimonial";
    return { success: false, error: errorMessage };
  }
}
