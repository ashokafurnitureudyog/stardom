"use client";

import { useState } from "react";
import {
  uploadFileToStorage,
  uploadMultipleFilesToStorage,
} from "@/lib/client/appwrite-upload";

interface UploadProgress {
  uploading: boolean;
  progress: number;
  error: string | null;
}

export function useFileUpload() {
  const [uploadStatus, setUploadStatus] = useState<UploadProgress>({
    uploading: false,
    progress: 0,
    error: null,
  });

  /**
   * Upload a single file to Appwrite storage
   */
  const uploadFile = async (
    file: File,
    bucketId: string,
  ): Promise<string | null> => {
    try {
      setUploadStatus({
        uploading: true,
        progress: 0,
        error: null,
      });

      // Simple progress simulation
      const progressInterval = setInterval(() => {
        setUploadStatus((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90), // Cap at 90% until complete
        }));
      }, 300);

      const fileUrl = await uploadFileToStorage(file, bucketId);

      clearInterval(progressInterval);
      setUploadStatus({
        uploading: false,
        progress: 100,
        error: null,
      });

      return fileUrl;
    } catch (error) {
      setUploadStatus({
        uploading: false,
        progress: 0,
        error: error instanceof Error ? error.message : "Upload failed",
      });
      return null;
    }
  };

  /**
   * Upload multiple files to Appwrite storage
   */
  const uploadMultipleFiles = async (
    files: File[],
    bucketId: string,
  ): Promise<string[]> => {
    try {
      if (files.length === 0) return [];

      setUploadStatus({
        uploading: true,
        progress: 0,
        error: null,
      });

      // Simple progress simulation
      const progressInterval = setInterval(() => {
        setUploadStatus((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 5, 90), // Cap at 90% until complete
        }));
      }, 200);

      const fileUrls = await uploadMultipleFilesToStorage(files, bucketId);

      clearInterval(progressInterval);
      setUploadStatus({
        uploading: false,
        progress: 100,
        error: null,
      });

      return fileUrls;
    } catch (error) {
      setUploadStatus({
        uploading: false,
        progress: 0,
        error: error instanceof Error ? error.message : "Upload failed",
      });
      return [];
    }
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    uploadStatus,
  };
}
