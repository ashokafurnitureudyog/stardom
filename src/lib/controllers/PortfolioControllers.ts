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
