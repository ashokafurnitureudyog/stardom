"use client";

import { useState, useEffect } from "react";
import { Server } from "lucide-react";
import { getStorageUsage } from "@/lib/actions/storage-actions";

export function StorageUsage() {
  const [usedStorage, setUsedStorage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Total storage limit in bytes (5GB)
  const totalStorage = 5 * 1024 * 1024 * 1024;

  useEffect(() => {
    async function fetchStorageUsage() {
      try {
        setIsLoading(true);
        const { totalSize, error } = await getStorageUsage();

        if (error) {
          setError(error);
        } else {
          setUsedStorage(totalSize);
        }
      } catch (err) {
        setError("Failed to load storage information");
        console.error("Storage fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStorageUsage();
  }, []);

  // Format bytes to human-readable format
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Calculate percentage used
  const percentageUsed = Math.min(
    100,
    Math.round((usedStorage / totalStorage) * 100),
  );

  return (
    <div className="px-4 py-4 border-b border-[#3C3120]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-[#A28B55]" />
          <span className="text-sm font-medium text-neutral-300">Storage</span>
        </div>
        <span className="text-xs text-neutral-400">
          {isLoading
            ? "Loading..."
            : error
              ? "Error loading data"
              : `${formatBytes(usedStorage)} of ${formatBytes(totalStorage)}`}
        </span>
      </div>
      <div className="h-2 bg-neutral-950/60 border border-[#3C3120] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#A28B55] transition-all duration-500"
          style={{ width: `${percentageUsed}%` }}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-2">Could not load storage data</p>
      )}
    </div>
  );
}
