/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MediaPreviewProps {
  mediaType: "image" | "video";
  previewUrl: string;
  onClear: () => void;
  onImageError: () => void;
}

export const MediaPreview = ({
  mediaType,
  previewUrl,
  onClear,
  onImageError,
}: MediaPreviewProps) => {
  return (
    <div className="p-4 bg-neutral-950/70 border border-[#352b1c] rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-[#A28B55] font-medium">Preview</h4>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-neutral-400 hover:text-neutral-200"
          onClick={onClear}
        >
          <X size={14} />
        </Button>
      </div>
      <div className="flex justify-center rounded-md overflow-hidden bg-black/60 border border-[#3C3120]/50">
        {mediaType === "image" ? (
          <div className="relative max-h-[300px] flex items-center justify-center p-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-[300px] object-contain"
              onError={onImageError}
            />
          </div>
        ) : (
          <div className="w-full max-h-[300px] flex items-center justify-center p-4">
            <video
              src={previewUrl}
              className="max-w-full max-h-[300px]"
              controls
              muted
            />
          </div>
        )}
      </div>
    </div>
  );
};
