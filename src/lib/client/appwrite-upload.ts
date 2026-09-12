"use client";

import { Client, ID, Permission, Role, Storage } from "appwrite";
import { createUploadCredentials, type UploadCredentials } from "@/lib/actions/upload-actions";

interface UploadOptions {
  allowedTypes?: string[];
  maxSizeInMB?: number;
  onProgress?: (percent: number) => void;
}

const DEFAULT_ALLOWED_TYPES = ["image/*", "video/*"];
const DEFAULT_MAX_SIZE_MB = 50;

/** Appwrite cannot transcode these, and browsers cannot play them back. */
const EXCLUDED_TYPES = [
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "video/hevc",
  "video/x-hevc",
];

let cached: UploadCredentials | null = null;

/**
 * The browser uploads with the admin's own short-lived JWT, so the storage
 * bucket does not have to accept writes from anonymous visitors. The token is
 * reused until it is close to expiry, since a multi-file upload would otherwise
 * mint one per file.
 */
async function authenticatedStorage(): Promise<Storage> {
  if (!cached || cached.expiresAt <= Date.now()) {
    cached = await createUploadCredentials();
  }

  const client = new Client()
    .setEndpoint(cached.endpoint)
    .setProject(cached.project)
    .setJWT(cached.jwt);

  return new Storage(client);
}

function assertUploadable(file: File, options: UploadOptions) {
  const maxSizeMb = options.maxSizeInMB ?? DEFAULT_MAX_SIZE_MB;
  if (file.size > maxSizeMb * 1024 * 1024) {
    throw new Error(`${file.name} is larger than the ${maxSizeMb}MB limit`);
  }

  if (EXCLUDED_TYPES.includes(file.type)) {
    throw new Error("HEIC and HEVC files are not supported. Export as JPEG or MP4 first.");
  }

  const allowed = options.allowedTypes ?? DEFAULT_ALLOWED_TYPES;
  const isAllowed = allowed.some((type) =>
    type.endsWith("/*") ? file.type.startsWith(`${type.slice(0, -1)}`) : type === file.type,
  );

  if (!isAllowed) {
    throw new Error(`${file.type || "This file type"} is not allowed`);
  }
}

/**
 * Uploads one file directly to Appwrite storage and returns its public URL.
 * Files over 5MB are sent in chunks by the SDK, and `onProgress` reports the
 * real byte count rather than a timer.
 */
export async function uploadFileToStorage(
  file: File,
  bucketId: string,
  options: UploadOptions = {},
): Promise<string> {
  assertUploadable(file, options);

  const storage = await authenticatedStorage();
  const fileId = ID.unique();

  await storage.createFile({
    bucketId,
    fileId,
    file,
    permissions: [Permission.read(Role.any())],
    onProgress: options.onProgress
      ? (progress) => options.onProgress?.(Math.round(progress.progress))
      : undefined,
  });

  const endpoint = cached?.endpoint ?? process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const project = cached?.project ?? process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${project}`;
}

/**
 * Uploads several files, two at a time. Full parallelism on a slow connection
 * starves every upload at once and makes per-file progress meaningless.
 */
export async function uploadMultipleFilesToStorage(
  files: File[],
  bucketId: string,
  options: UploadOptions = {},
): Promise<string[]> {
  const CONCURRENCY = 2;
  const urls: string[] = new Array(files.length);
  let cursor = 0;
  let completed = 0;

  async function worker() {
    while (cursor < files.length) {
      const index = cursor++;
      urls[index] = await uploadFileToStorage(files[index], bucketId, {
        ...options,
        onProgress: options.onProgress
          ? (percent) =>
              options.onProgress?.(Math.round(((completed + percent / 100) / files.length) * 100))
          : undefined,
      });
      completed++;
      options.onProgress?.(Math.round((completed / files.length) * 100));
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));
  return urls;
}
