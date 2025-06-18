"use server";

import { createAdminClient } from "../server/appwrite";

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
