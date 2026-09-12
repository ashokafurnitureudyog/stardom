"use server";

import { Query } from "node-appwrite";
import { appwriteIds, createAdminClient } from "../server/appwrite";

const PAGE_SIZE = 100;

/**
 * Total bytes stored in the media bucket. Appwrite pages at 100 files, so this
 * walks every page rather than reporting only the first one.
 */
export async function getStorageUsage() {
  try {
    const { storage } = await createAdminClient();
    const bucketId = appwriteIds().productImages;

    let totalSize = 0;
    let cursor: string | undefined;

    for (;;) {
      const queries = [Query.limit(PAGE_SIZE)];
      if (cursor) queries.push(Query.cursorAfter(cursor));

      const page = await storage.listFiles({ bucketId, queries });
      for (const file of page.files) totalSize += file.sizeOriginal;

      if (page.files.length < PAGE_SIZE) break;
      cursor = page.files[page.files.length - 1].$id;
    }

    return { totalSize, error: null };
  } catch (error) {
    console.error("Error getting storage usage:", error);
    return { totalSize: 0, error: "Failed to fetch storage data" };
  }
}

/**
 * Extracts the Appwrite file id from a stored URL, or null when the URL points
 * somewhere else. Matches on the bucket path rather than the hostname, so a
 * self-hosted endpoint works the same as Appwrite Cloud.
 */
function fileIdFromUrl(url: string): string | null {
  const match = /\/storage\/buckets\/[^/]+\/files\/([^/?]+)/.exec(url);
  return match?.[1] ?? null;
}

export interface DeletionResult {
  success: boolean;
  deletedCount: number;
  skippedCount: number;
  errors: string[];
}

/**
 * Deletes stored files by URL. Deletions run together instead of one after
 * another, and one failure does not abandon the rest.
 */
export async function deleteFilesFromStorage(
  urls: string[],
  bucketId?: string,
): Promise<DeletionResult> {
  if (!urls?.length) {
    return { success: true, deletedCount: 0, skippedCount: 0, errors: [] };
  }

  try {
    const { storage } = await createAdminClient();
    const targetBucket = bucketId || appwriteIds().productImages;

    const ids = urls.map(fileIdFromUrl);
    const skippedCount = ids.filter((id) => !id).length;

    const outcomes = await Promise.allSettled(
      ids
        .filter((id): id is string => Boolean(id))
        .map((fileId) => storage.deleteFile({ bucketId: targetBucket, fileId })),
    );

    const errors = outcomes
      .filter((outcome) => outcome.status === "rejected")
      .map((outcome) => String((outcome as PromiseRejectedResult).reason));

    for (const message of errors) console.error("Error deleting file:", message);

    return {
      success: errors.length === 0,
      deletedCount: outcomes.length - errors.length,
      skippedCount,
      errors,
    };
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
