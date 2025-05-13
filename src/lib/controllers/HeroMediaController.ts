/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { ID, Permission, Role } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { MediaItem } from "@/types/MediaTypes";

const COLLECTION_ID = process.env.APPWRITE_HERO_MEDIA_COLLECTION_ID as string;
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID as string;
const BUCKET_ID = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID as string;

interface HeroMediaResult {
  success: boolean;
  mediaItems?: MediaItem[];
  mediaItem?: MediaItem & { id?: string };
  error?: string;
}

/**
 * Fetch all hero media items (for admin dashboard)
 */
export async function getHeroMedia(): Promise<HeroMediaResult> {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);

    const mediaItems = response.documents.map((doc) => ({
      type: doc.type as "image" | "video",
      src: doc.src,
      alt: doc.alt || undefined,
      poster: doc.poster || undefined,
      preload: doc.preload || undefined,
      webmSrc: doc.webmSrc || undefined,
      lowResSrc: doc.lowResSrc || undefined,
      id: doc.$id, // Adding ID for management operations
    }));

    return {
      success: true,
      mediaItems,
    };
  } catch (error: any) {
    console.error("Error fetching hero media:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch hero media",
    };
  }
}

/**
 * Add hero media via URL
 */
export async function addHeroMediaUrl(
  media: Partial<MediaItem>,
): Promise<HeroMediaResult> {
  try {
    const { database } = await createAdminClient();

    if (!media.type || !media.src) {
      return {
        success: false,
        error: "Media type and source are required",
      };
    }

    const newMedia = await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        type: media.type,
        src: media.src,
        alt: media.alt || "",
        poster: media.poster || "",
        preload: media.preload || false,
        webmSrc: media.webmSrc || "",
        lowResSrc: media.lowResSrc || "",
      },
    );

    return {
      success: true,
      mediaItem: {
        type: newMedia.type,
        src: newMedia.src,
        alt: newMedia.alt || undefined,
        poster: newMedia.poster || undefined,
        preload: newMedia.preload || undefined,
        webmSrc: newMedia.webmSrc || undefined,
        lowResSrc: newMedia.lowResSrc || undefined,
        id: newMedia.$id,
      },
    };
  } catch (error: any) {
    console.error("Error adding hero media via URL:", error);
    return {
      success: false,
      error: error.message || "Failed to add hero media",
    };
  }
}

/**
 * Upload and add hero media file
 */
export async function uploadHeroMedia(
  file: File,
  type: "image" | "video",
  alt?: string,
): Promise<HeroMediaResult> {
  try {
    const { database, storage } = await createAdminClient();

    // Generate a unique ID for the file
    const fileId = ID.unique();

    // Upload file to storage
    await storage.createFile(BUCKET_ID, fileId, file, [
      Permission.read(Role.any()),
    ]);

    // Generate the file URL using Appwrite's format
    const fileUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT}`;

    // Create document in database
    const newMedia = await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        type,
        src: fileUrl,
        alt: alt || "",
        poster: "",
        preload: false,
        webmSrc: "",
        lowResSrc: "",
      },
    );

    return {
      success: true,
      mediaItem: {
        type: newMedia.type,
        src: newMedia.src,
        alt: newMedia.alt || undefined,
        id: newMedia.$id,
      },
    };
  } catch (error: any) {
    console.error("Error uploading hero media:", error);
    return {
      success: false,
      error: error.message || "Failed to upload hero media",
    };
  }
}

/**
 * Delete hero media item
 */
export async function deleteHeroMedia(id: string): Promise<HeroMediaResult> {
  try {
    const { database, storage } = await createAdminClient();

    // Get the media item to check if it's an uploaded file
    const media = await database.getDocument(DATABASE_ID, COLLECTION_ID, id);

    // If it's an uploaded file (not an external URL), delete from storage
    if (
      media.src &&
      media.src.includes(`/storage/buckets/${BUCKET_ID}/files/`)
    ) {
      // Extract file ID from URL
      const fileId = media.src.split("/files/")[1]?.split("/view")[0];

      if (fileId) {
        try {
          await storage.deleteFile(BUCKET_ID, fileId);
        } catch (e) {
          console.warn("File not found in storage, continuing deletion");
        }
      }
    }

    // Delete document
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("Error deleting hero media:", error);
    return {
      success: false,
      error: error.message || "Failed to delete hero media",
    };
  }
}

/**
 * Public API to get hero media (without login)
 */
export async function getPublicHeroMedia(): Promise<HeroMediaResult> {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);

    const mediaItems = response.documents.map((doc) => ({
      type: doc.type as "image" | "video",
      src: doc.src,
      alt: doc.alt || undefined,
      poster: doc.poster || undefined,
      preload: doc.preload || undefined,
      webmSrc: doc.webmSrc || undefined,
      lowResSrc: doc.lowResSrc || undefined,
    }));

    return {
      success: true,
      mediaItems,
    };
  } catch (error: any) {
    console.error("Error fetching public hero media:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch hero media",
    };
  }
}
