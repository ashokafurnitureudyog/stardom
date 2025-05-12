/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { ID, Permission, Role } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";

export async function getPortfolioProjects() {
  try {
    const { database } = await createAdminClient();
    const databaseId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_PORTFOLIO_COLLECTION_ID!;

    const response = await database.listDocuments(databaseId, collectionId);

    // Transform the documents to include the testimonial object structure
    const transformedProjects = response.documents.map((doc) => ({
      ...doc,
      testimonial: {
        quote: doc.testimonial_quote || "",
        author: doc.testimonial_author || "",
        position: doc.testimonial_position || "",
      },
    }));

    return { success: true, data: transformedProjects };
  } catch (error) {
    console.error("Failed to fetch portfolio projects:", error);
    return { success: false, error: "Failed to fetch portfolio projects" };
  }
}

export async function createPortfolioProject(
  projectData: any,
  files?: File[],
  thumbnailFile?: File,
) {
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
      } catch (error) {
        console.error("Thumbnail upload error:", error);
      }
    }

    const uploadedUrls = [];
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
        } catch (error) {
          console.error("Gallery file upload error:", error);
        }
      }
    }

    const gallery = [...projectData.gallery, ...uploadedUrls];

    const project = await database.createDocument(
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
        testimonial_quote: projectData.testimonial_quote,
        testimonial_author: projectData.testimonial_author,
        testimonial_position: projectData.testimonial_position,
        gallery: gallery,
      },
    );

    const responseProject = {
      ...project,
      testimonial: {
        quote: project.testimonial_quote || "",
        author: project.testimonial_author || "",
        position: project.testimonial_position || "",
      },
    };

    return { success: true, data: responseProject };
  } catch (error: any) {
    console.error("Failed to create portfolio project:", error);
    return {
      success: false,
      error: error.message || "Failed to create portfolio project",
    };
  }
}

export async function deletePortfolioProject(
  projectId: string,
  imageUrls: string[] = [],
) {
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
        } catch (error) {
          console.error("Failed to delete image from storage:", error);
          // Continue with other deletions even if one fails
        }
      }
    }

    // Delete the project document
    await database.deleteDocument(databaseId, collectionId, projectId);

    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete portfolio project:", error);
    return {
      success: false,
      error: error.message || "Failed to delete portfolio project",
    };
  }
}
