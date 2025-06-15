"use server";
import { ID, Permission, Role } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";
import { MediaItem } from "@/types/MediaTypes";

const COLLECTION_ID = process.env.APPWRITE_HERO_MEDIA_COLLECTION_ID as string;
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID as string;
const BUCKET_ID = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID as string;
const MAX_FILE_SIZE_MB = 50; // 50MB max file size
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];

interface HeroMediaResult {
  success: boolean;
  mediaItems?: MediaItem[];
  mediaItem?: MediaItem & { id?: string };
  error?: string;
}

function mapToMediaItem(
  doc: Record<string, unknown>,
): MediaItem & { id?: string } {
  return {
    type: doc.type as "image" | "video",
    src: doc.src as string,
    alt: (doc.alt as string) || undefined,
    poster: (doc.poster as string) || undefined,
    preload: (doc.preload as boolean) || undefined,
    webmSrc: (doc.webmSrc as string) || undefined,
    lowResSrc: (doc.lowResSrc as string) || undefined,
    id: doc.$id as string,
  };
}

export async function getHeroMedia(): Promise<HeroMediaResult> {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);

    const mediaItems = response.documents.map(mapToMediaItem);

    return {
      success: true,
      mediaItems,
    };
  } catch (error: unknown) {
    console.error("Error fetching hero media:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch hero media";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

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

    // Basic URL validation
    try {
      new URL(media.src);
    } catch {
      return {
        success: false,
        error: "Invalid URL format",
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
      mediaItem: mapToMediaItem(newMedia),
    };
  } catch (error: unknown) {
    console.error("Error adding hero media via URL:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to add hero media";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

function validateFile(file: File, type: "image" | "video"): string | null {
  // Check file size
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `File size exceeds maximum allowed size of ${MAX_FILE_SIZE_MB}MB`;
  }

  // Check file type
  const allowedTypes =
    type === "image" ? ALLOWED_IMAGE_TYPES : ALLOWED_VIDEO_TYPES;
  if (!allowedTypes.includes(file.type)) {
    return `File type not allowed. Supported types: ${allowedTypes.join(", ")}`;
  }

  return null;
}

export async function uploadHeroMedia(
  file: File,
  type: "image" | "video",
  alt?: string,
): Promise<HeroMediaResult> {
  try {
    // Validate file
    const validationError = validateFile(file, type);
    if (validationError) {
      return {
        success: false,
        error: validationError,
      };
    }

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
      mediaItem: mapToMediaItem(newMedia),
    };
  } catch (error: unknown) {
    console.error("Error uploading hero media:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to upload hero media";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function deleteHeroMedia(id: string): Promise<HeroMediaResult> {
  try {
    if (!id || id === "undefined") {
      return {
        success: false,
        error: "Valid media ID is required for deletion",
      };
    }

    const { database, storage } = await createAdminClient();

    try {
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
          } catch (storageError) {
            console.warn(
              `File not found in storage (fileId: ${fileId}): ${
                storageError instanceof Error
                  ? storageError.message
                  : "Unknown error"
              }`,
            );
          }
        }
      }

      // Delete document
      await database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);

      return {
        success: true,
      };
    } catch (docError) {
      const errorMessage =
        docError instanceof Error ? docError.message : "Unknown error occurred";

      return {
        success: false,
        error: `Could not find or delete media item with ID: ${id}. Reason: ${errorMessage}`,
      };
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete hero media";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function getPublicHeroMedia(): Promise<HeroMediaResult> {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID);

    const mediaItems = response.documents.map((doc) => {
      const item = mapToMediaItem(doc);
      return item;
    });

    return {
      success: true,
      mediaItems,
    };
  } catch (error: unknown) {
    console.error("Error fetching public hero media:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch hero media";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
