"use server";

import { createAdminClient } from "../server/appwrite";

/**
 * Get current storage usage statistics
 */
export async function getStorageUsage() {
  try {
    const { storage } = await createAdminClient();
    const bucketId = process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID;

    if (!bucketId) {
      console.error("Bucket ID not found in environment variables");
      return { totalSize: 0, error: "Bucket ID not configured" };
    }

    let totalSize = 0;
    const response = await storage.listFiles(bucketId);

    response.files.forEach((file) => {
      totalSize += file.sizeOriginal;
    });

    return { totalSize, error: null };
  } catch (error) {
    console.error("Error getting storage usage:", error);
    return { totalSize: 0, error: "Failed to fetch storage data" };
  }
}

/**
 * Delete files from storage by their URLs
 *
 * @param urls Array of file URLs to delete
 * @param bucketId Bucket ID (defaults to product images bucket)
 * @returns Object with success status and results
 */
export async function deleteFilesFromStorage(
  urls: string[],
  bucketId?: string,
): Promise<{
  success: boolean;
  deletedCount: number;
  skippedCount: number;
  errors: string[];
}> {
  if (!urls || urls.length === 0) {
    return { success: true, deletedCount: 0, skippedCount: 0, errors: [] };
  }

  try {
    const { storage } = await createAdminClient();
    const storageBucketId =
      bucketId || process.env.APPWRITE_PRODUCT_IMAGES_BUCKET_ID!;

    const results = {
      success: true,
      deletedCount: 0,
      skippedCount: 0,
      errors: [] as string[],
    };

    for (const url of urls) {
      try {
        // Only try to delete from storage if it's an Appwrite URL
        if (url.includes("appwrite.io") && url.includes("/files/")) {
          const fileId = url.split("/files/")[1]?.split("/view")[0];
          if (fileId) {
            await storage.deleteFile(storageBucketId, fileId);
            results.deletedCount++;
          } else {
            results.skippedCount++;
          }
        } else {
          // External URLs are skipped
          results.skippedCount++;
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        results.errors.push(`Failed to delete ${url}: ${errorMsg}`);
        console.error(`Error deleting file: ${errorMsg}`);
      }
    }

    // Consider operation successful if we have no errors, even if some were skipped
    results.success = results.errors.length === 0;
    return results;
  } catch (error) {
    console.error("Error in deleteFilesFromStorage:", error);
    return {
      success: false,
      deletedCount: 0,
      skippedCount: 0,
      errors: [error instanceof Error ? error.message : "Unknown error"],
    };
  }
}

/**
 * Extract file IDs from Appwrite URLs
 * Utility function to help with URL parsing
 *
 * Note: Must be async because it's in a server actions file
 */
export async function extractFileIdFromUrl(
  url: string,
): Promise<string | null> {
  if (!url || typeof url !== "string") return null;

  if (url.includes("appwrite.io") && url.includes("/files/")) {
    const fileId = url.split("/files/")[1]?.split("/view")[0];
    return fileId || null;
  }

  return null;
}
