"use server";
import { ID, Permission, Role } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { PortfolioProject } from "@/types/ComponentTypes";
import { deleteFilesFromStorage } from "@/lib/actions/storage-actions";

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
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_PORTFOLIO_COLLECTION_ID!;
    const bucketId = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!;

    if (imageUrls && imageUrls.length > 0) {
      // Use our centralized deletion utility
      await deleteFilesFromStorage(imageUrls, bucketId);
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

    // Get existing document
    const existingDoc = await database.getDocument(
      databaseId,
      collectionId,
      projectId,
    );

    // Handle removing gallery images from storage
    if (removedGalleryUrls && removedGalleryUrls.length > 0) {
      const result = await deleteFilesFromStorage(removedGalleryUrls, bucketId);
      if (result.errors.length > 0) {
        console.error("Errors during gallery cleanup:", result.errors);
      }
    }

    let thumbnail = projectData.thumbnail || "";
    const oldThumbnail = existingDoc.thumbnail || "";

    // Handle thumbnail
    if (thumbnailRemoved) {
      // Delete old thumbnail from storage if it's an Appwrite URL
      if (oldThumbnail) {
        await deleteFilesFromStorage([oldThumbnail], bucketId);
      }
      thumbnail = "";
    } else if (thumbnailFile) {
      // Upload new thumbnail and delete old one if it exists
      try {
        const fileId = ID.unique();
        await storage.createFile(bucketId, fileId, thumbnailFile, [
          Permission.read(Role.any()),
        ]);

        thumbnail = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT}`;

        // If there was an old thumbnail that's being replaced, delete it
        if (oldThumbnail && oldThumbnail !== thumbnail) {
          await deleteFilesFromStorage([oldThumbnail], bucketId);
        }
      } catch (uploadError: unknown) {
        console.error(
          "Thumbnail upload error:",
          uploadError instanceof Error ? uploadError.message : "Unknown error",
        );
      }
    }

    // Upload new gallery images if any
    const uploadedUrls: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        try {
          const fileId = ID.unique();
          await storage.createFile(bucketId, fileId, file, [
            Permission.read(Role.any()),
          ]);
          const newUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT}`;
          uploadedUrls.push(newUrl);
        } catch (fileError: unknown) {
          console.error(
            "Gallery file upload error:",
            fileError instanceof Error ? fileError.message : "Unknown error",
          );
        }
      }
    }

    // Handle gallery - add newly uploaded images to current gallery
    const gallery = [...projectData.gallery, ...uploadedUrls];

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

    // Update the document
    const dbDocument = await database.updateDocument(
      databaseId,
      collectionId,
      projectId,
      updatePayload,
    );

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
