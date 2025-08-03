"use server";
import { ID, Permission, Role } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { PortfolioProject } from "@/types/ComponentTypes";

// Define interface for portfolio responses
interface PortfolioResponse {
  success: boolean;
  data?: PortfolioProject | PortfolioProject[] | Record<string, unknown>;
  error?: string;
}

// Define interface for database document response
interface PortfolioDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
  title: string;
  tags: string[];
  thumbnail: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  testimonial_quote: string;
  testimonial_author: string;
  testimonial_position: string;
  gallery: string[];
  [key: string]: unknown;
}

/**
 * Maps database document to PortfolioProject type
 */
function mapToPortfolioProject(doc: PortfolioDocument): PortfolioProject {
  return {
    id: doc.$id,
    title: doc.title,
    tags: doc.tags,
    thumbnail: doc.thumbnail,
    description: doc.description,
    challenge: doc.challenge,
    solution: doc.solution,
    impact: doc.impact,
    testimonial: {
      quote: doc.testimonial_quote || "",
      author: doc.testimonial_author || "",
      position: doc.testimonial_position || "",
    },
    gallery: doc.gallery,
  };
}

export async function getPortfolioProjects(): Promise<PortfolioResponse> {
  try {
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_PORTFOLIO_COLLECTION_ID!;

    const response = await database.listDocuments(databaseId, collectionId);

    // Map the documents to our PortfolioProject type
    const projects = response.documents.map((doc) =>
      mapToPortfolioProject(doc as PortfolioDocument),
    );

    return { success: true, data: projects };
  } catch (error: unknown) {
    console.error("Failed to fetch portfolio projects:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to fetch portfolio projects";
    return { success: false, error: errorMessage };
  }
}

// Project data input interface - what's accepted by the function
interface ProjectInput {
  title: string;
  tags: string[];
  thumbnail?: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  testimonial_quote?: string;
  testimonial_author?: string;
  testimonial_position?: string;
  gallery: string[];
}

export async function createPortfolioProject(
  projectData: ProjectInput,
  files?: File[],
  thumbnailFile?: File,
): Promise<PortfolioResponse> {
  try {
    const { database, storage } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_PORTFOLIO_COLLECTION_ID!;
    const bucketId = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!;

    let thumbnail = projectData.thumbnail || "";

    if (thumbnailFile) {
      try {
        const fileId = ID.unique();
        await storage.createFile(bucketId, fileId, thumbnailFile, [
          Permission.read(Role.any()),
        ]);

        thumbnail = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT}`;
      } catch (uploadError: unknown) {
        console.error(
          "Thumbnail upload error:",
          uploadError instanceof Error ? uploadError.message : "Unknown error",
        );
      }
    }

    const uploadedUrls: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        try {
          const fileId = ID.unique();
          await storage.createFile(bucketId, fileId, file, [
            Permission.read(Role.any()),
          ]);
          uploadedUrls.push(
            `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT}`,
          );
        } catch (fileError: unknown) {
          console.error(
            "Gallery file upload error:",
            fileError instanceof Error ? fileError.message : "Unknown error",
          );
        }
      }
    }

    const gallery = [...projectData.gallery, ...uploadedUrls];

    const dbDocument = await database.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        title: projectData.title,
        tags: projectData.tags,
        thumbnail: thumbnail,
        description: projectData.description,
        challenge: projectData.challenge,
        solution: projectData.solution,
        impact: projectData.impact,
        testimonial_quote: projectData.testimonial_quote || "",
        testimonial_author: projectData.testimonial_author || "",
        testimonial_position: projectData.testimonial_position || "",
        gallery: gallery,
      },
    );

    // Map to our PortfolioProject type
    const project = mapToPortfolioProject(
      dbDocument as unknown as PortfolioDocument,
    );

    return { success: true, data: project };
  } catch (error: unknown) {
    console.error("Failed to create portfolio project:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to create portfolio project";
    return { success: false, error: errorMessage };
  }
}

export async function deletePortfolioProject(
  projectId: string,
  imageUrls: string[] = [],
): Promise<PortfolioResponse> {
  try {
    const { database, storage } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_PORTFOLIO_COLLECTION_ID!;
    const bucketId = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!;

    if (imageUrls && imageUrls.length > 0) {
      for (const url of imageUrls) {
        try {
          // Only try to delete from storage if it's an Appwrite URL
          if (url.includes("appwrite.io") && url.includes("/files/")) {
            const fileId = url.split("/files/")[1]?.split("/view")[0];
            if (fileId) {
              console.log("Deleting file from storage:", fileId);
              await storage.deleteFile(bucketId, fileId);
            }
          }
        } catch (deleteError: unknown) {
          console.error(
            "Failed to delete image from storage:",
            deleteError instanceof Error
              ? deleteError.message
              : "Unknown error",
          );
          // Continue with other deletions even if one fails
        }
      }
    }

    // Delete the project document
    await database.deleteDocument(databaseId, collectionId, projectId);

    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to delete portfolio project:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to delete portfolio project";
    return { success: false, error: errorMessage };
  }
}
export async function updatePortfolioProject(
  projectId: string,
  projectData: ProjectInput,
  files?: File[],
  thumbnailFile?: File,
  thumbnailRemoved: boolean = false,
  removedGalleryUrls: string[] = [],
): Promise<PortfolioResponse> {
  try {
    const { database, storage } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_PORTFOLIO_COLLECTION_ID!;
    const bucketId = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!;

    // Get existing document first to properly handle images
    try {
      const existingDoc = await database.getDocument(
        databaseId,
        collectionId,
        projectId,
      );
      console.log("Existing document:", existingDoc);
    } catch (err) {
      console.error("Error fetching existing document:", err);
    }

    // Log incoming data for debugging
    console.log("Updating project:", projectId);
    console.log("Thumbnail removed:", thumbnailRemoved);
    console.log("Removed gallery URLs:", removedGalleryUrls);
    console.log("New gallery from form:", projectData.gallery);

    let thumbnail = projectData.thumbnail || "";

    // Handle thumbnail
    if (thumbnailRemoved) {
      console.log("Clearing thumbnail as it was explicitly removed");
      // Clear thumbnail if explicitly removed
      thumbnail = "";
    } else if (thumbnailFile) {
      // Upload new thumbnail if provided
      try {
        console.log("Uploading new thumbnail file");
        const fileId = ID.unique();
        await storage.createFile(bucketId, fileId, thumbnailFile, [
          Permission.read(Role.any()),
        ]);

        thumbnail = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT}`;
        console.log("New thumbnail URL:", thumbnail);
      } catch (uploadError: unknown) {
        console.error(
          "Thumbnail upload error:",
          uploadError instanceof Error ? uploadError.message : "Unknown error",
        );
      }
    } else if (thumbnail) {
      console.log("Using existing thumbnail URL:", thumbnail);
    }

    // Upload new gallery images if any
    const uploadedUrls: string[] = [];
    if (files && files.length > 0) {
      console.log(`Uploading ${files.length} new gallery images`);
      for (const file of files) {
        try {
          const fileId = ID.unique();
          await storage.createFile(bucketId, fileId, file, [
            Permission.read(Role.any()),
          ]);
          const newUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT}`;
          uploadedUrls.push(newUrl);
          console.log("Uploaded new gallery image:", newUrl);
        } catch (fileError: unknown) {
          console.error(
            "Gallery file upload error:",
            fileError instanceof Error ? fileError.message : "Unknown error",
          );
        }
      }
    }

    // Handle gallery - filter out any removed URLs
    console.log("Processing gallery images");
    console.log("- Current gallery from form:", projectData.gallery);
    console.log("- Newly uploaded URLs:", uploadedUrls);
    console.log("- URLs to remove:", removedGalleryUrls);

    // Start with the current gallery plus any newly uploaded images
    let gallery = [...projectData.gallery, ...uploadedUrls];

    // Remove any URLs that were explicitly removed
    if (removedGalleryUrls && removedGalleryUrls.length > 0) {
      gallery = gallery.filter((url) => {
        const shouldKeep = !removedGalleryUrls.includes(url);
        if (!shouldKeep) {
          console.log("Removing gallery URL:", url);
        }
        return shouldKeep;
      });
    }

    console.log("Final gallery URLs for update:", gallery);

    // Create the update payload
    const updatePayload = {
      title: projectData.title,
      tags: projectData.tags,
      thumbnail: thumbnail,
      description: projectData.description,
      challenge: projectData.challenge,
      solution: projectData.solution,
      impact: projectData.impact,
      testimonial_quote: projectData.testimonial_quote || "",
      testimonial_author: projectData.testimonial_author || "",
      testimonial_position: projectData.testimonial_position || "",
      gallery: gallery,
    };

    console.log("Update payload:", updatePayload);

    // Update the document
    const dbDocument = await database.updateDocument(
      databaseId,
      collectionId,
      projectId,
      updatePayload,
    );

    console.log("Document updated successfully");

    // Map to our PortfolioProject type
    const project = mapToPortfolioProject(
      dbDocument as unknown as PortfolioDocument,
    );

    return { success: true, data: project };
  } catch (error: unknown) {
    console.error("Failed to update portfolio project:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to update portfolio project";
    return { success: false, error: errorMessage };
  }
}
