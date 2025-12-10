"use client";

import { Client, Storage, ID, Permission, Role } from "appwrite";

// Initialize the Appwrite client for uploads only
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

// Create a storage service instance
const storage = new Storage(client);

interface UploadOptions {
  allowedTypes?: string[];
  maxSizeInMB?: number;
}

const DEFAULT_OPTIONS: UploadOptions = {
  allowedTypes: ["image/*", "video/*"],
  maxSizeInMB: 100,
};

const EXCLUDED_TYPES = [
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "video/hevc",
  "video/x-hevc",
];

/**
 * Client-side file upload to Appwrite storage
 * Use this ONLY for direct file uploads to bypass Next.js API size limits
 */
export async function uploadFileToStorage(
  file: File,
  bucketId: string,
  options: UploadOptions = DEFAULT_OPTIONS,
): Promise<string> {
  try {
    // 1. Validate File Size
    const maxSize = (options.maxSizeInMB || 100) * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error(
        `File size exceeds the limit of ${options.maxSizeInMB || 100}MB`,
      );
    }

    // 2. Validate File Type
    // Check for explicitly excluded types (HEIC/HEVC)
    if (EXCLUDED_TYPES.includes(file.type)) {
      throw new Error("HEIC and HEVC file formats are not supported.");
    }

    const allowedTypes = options.allowedTypes || DEFAULT_OPTIONS.allowedTypes!;

    // Check if file type matches any of the allowed types (handling wildcards)
    const isAllowed = allowedTypes.some((type) => {
      if (type.endsWith("/*")) {
        const prefix = type.split("/")[0];
        return file.type.startsWith(`${prefix}/`);
      }
      return type === file.type;
    });

    if (!isAllowed) {
      throw new Error(
        `Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(", ")}`,
      );
    }

    // Generate a unique file ID
    const fileId = ID.unique();

    // Upload the file to Appwrite storage with public read permission
    // Note: We use Permission.read(Role.any()) assuming these are public assets (images).
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
  options: UploadOptions = DEFAULT_OPTIONS,
): Promise<string[]> {
  try {
    const uploadPromises = files.map((file) =>
      uploadFileToStorage(file, bucketId, options),
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading multiple files:", error);
    throw error;
  }
}
