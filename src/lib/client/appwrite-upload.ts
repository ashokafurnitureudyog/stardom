"use client";

import { Client, Storage, ID, Permission, Role } from "appwrite";

// Initialize the Appwrite client for uploads only
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

// Create a storage service instance
const storage = new Storage(client);

/**
 * Client-side file upload to Appwrite storage
 * Use this ONLY for direct file uploads to bypass Next.js API size limits
 */
export async function uploadFileToStorage(
  file: File,
  bucketId: string,
): Promise<string> {
  try {
    // Generate a unique file ID
    const fileId = ID.unique();

    // Upload the file to Appwrite storage with public read permission
    await storage.createFile(bucketId, fileId, file, [
      Permission.read(Role.any()),
    ]);

    // Return the file URL in the same format used by server-side code
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
  } catch (error) {
    console.error("Error uploading file to Appwrite:", error);
    throw error;
  }
}

/**
 * Upload multiple files and return array of URLs
 */
export async function uploadMultipleFilesToStorage(
  files: File[],
  bucketId: string,
): Promise<string[]> {
  try {
    const uploadPromises = files.map((file) =>
      uploadFileToStorage(file, bucketId),
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading multiple files:", error);
    throw error;
  }
}
