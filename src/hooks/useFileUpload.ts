"use client";

import { useCallback, useState } from "react";
import { uploadFileToStorage, uploadMultipleFilesToStorage } from "@/lib/client/appwrite-upload";

interface UploadStatus {
  uploading: boolean;
  progress: number;
  error: string | null;
}

interface UploadOptions {
  allowedTypes?: string[];
  maxSizeInMB?: number;
}

const IDLE: UploadStatus = { uploading: false, progress: 0, error: null };

/**
 * Uploads to Appwrite storage with real byte progress reported by the SDK.
 */
export function useFileUpload() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(IDLE);

  const run = useCallback(
    async <T>(work: (onProgress: (percent: number) => void) => Promise<T>, empty: T) => {
      setUploadStatus({ uploading: true, progress: 0, error: null });
      try {
        const result = await work((progress) =>
          setUploadStatus((status) => ({ ...status, progress })),
        );
        setUploadStatus({ uploading: false, progress: 100, error: null });
        return result;
      } catch (error) {
        setUploadStatus({
          uploading: false,
          progress: 0,
          error: error instanceof Error ? error.message : "Upload failed",
        });
        return empty;
      }
    },
    [],
  );

  const uploadFile = useCallback(
    (file: File, bucketId: string, options?: UploadOptions) =>
      run<string | null>(
        (onProgress) => uploadFileToStorage(file, bucketId, { ...options, onProgress }),
        null,
      ),
    [run],
  );

  const uploadMultipleFiles = useCallback(
    (files: File[], bucketId: string, options?: UploadOptions) =>
      files.length === 0
        ? Promise.resolve([])
        : run<string[]>(
            (onProgress) =>
              uploadMultipleFilesToStorage(files, bucketId, { ...options, onProgress }),
            [],
          ),
    [run],
  );

  return { uploadFile, uploadMultipleFiles, uploadStatus };
}
