/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { MediaItem } from "@/types/MediaTypes";
import { DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";

type MediaItemWithId = MediaItem & { id: string };

interface HeroMediaDetailsProps {
  item: MediaItemWithId;
}

export const HeroMediaDetails = ({ item }: HeroMediaDetailsProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex items-center justify-center h-full bg-black/90 relative overflow-auto">
      <DialogClose className="absolute top-4 right-4 z-10 h-8 w-8 p-0 flex items-center justify-center rounded-full transition-all duration-200 text-white transform scale-100 hover:scale-110 hover:text-[#A28B55]">
        <X size={20} />
        <span className="sr-only">Close</span>
      </DialogClose>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-5">
          <div className="h-8 w-8 rounded-full border-2 border-[#A28B55] border-t-transparent animate-spin"></div>
        </div>
      )}

      <div className="w-[70%] max-h-full p-8 flex items-center justify-center overflow-auto">
        {item.type === "image" ? (
          <img
            src={item.src}
            alt={item.alt || "Hero image"}
            className="max-w-full object-contain"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        ) : (
          <video
            src={item.src}
            className="max-w-full"
            controls
            autoPlay
            onLoadedData={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        )}
      </div>
    </div>
  );
};
