"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Image as ImageIcon, Film } from "lucide-react";

interface MediaTypeSelectorProps {
  mediaType: "image" | "video";
  setMediaType: (type: "image" | "video") => void;
}

export const MediaTypeSelector = ({
  mediaType,
  setMediaType,
}: MediaTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-neutral-400">Choose Media Type</Label>
      <RadioGroup
        defaultValue="image"
        value={mediaType}
        onValueChange={(value) => setMediaType(value as "image" | "video")}
        className="flex gap-4"
      >
        <div className="flex-1">
          <label
            htmlFor="radio-image"
            className={`
              relative p-4 rounded-lg border cursor-pointer transition-all duration-300 block
              ${
                mediaType === "image"
                  ? "bg-[#A28B55]/10 border-[#A28B55] shadow-[0_0_10px_rgba(162,139,85,0.1)]"
                  : "bg-neutral-950/70 border-[#352b1c] hover:border-[#3C3120]"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`
                rounded-full p-3 
                ${mediaType === "image" ? "bg-[#A28B55]/20" : "bg-neutral-900"}
              `}
              >
                <ImageIcon
                  size={24}
                  className={
                    mediaType === "image"
                      ? "text-[#A28B55]"
                      : "text-neutral-500"
                  }
                />
              </div>
              <div>
                <h4
                  className={`font-medium ${mediaType === "image" ? "text-[#A28B55]" : "text-neutral-400"}`}
                >
                  Image
                </h4>
                <p className="text-xs text-neutral-500">JPG, PNG, WebP, GIF</p>
              </div>
            </div>
            <RadioGroupItem
              value="image"
              id="radio-image"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 border-[#3C3120] text-[#A28B55]"
            />
          </label>
        </div>

        <div className="flex-1">
          <label
            htmlFor="radio-video"
            className={`
              relative p-4 rounded-lg border cursor-pointer transition-all duration-300 block
              ${
                mediaType === "video"
                  ? "bg-[#A28B55]/10 border-[#A28B55] shadow-[0_0_10px_rgba(162,139,85,0.1)]"
                  : "bg-neutral-950/70 border-[#352b1c] hover:border-[#3C3120]"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`
                rounded-full p-3 
                ${mediaType === "video" ? "bg-[#A28B55]/20" : "bg-neutral-900"}
              `}
              >
                <Film
                  size={24}
                  className={
                    mediaType === "video"
                      ? "text-[#A28B55]"
                      : "text-neutral-500"
                  }
                />
              </div>
              <div>
                <h4
                  className={`font-medium ${mediaType === "video" ? "text-[#A28B55]" : "text-neutral-400"}`}
                >
                  Video
                </h4>
                <p className="text-xs text-neutral-500">MP4, WebM</p>
              </div>
            </div>
            <RadioGroupItem
              value="video"
              id="radio-video"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 border-[#3C3120] text-[#A28B55]"
            />
          </label>
        </div>
      </RadioGroup>
    </div>
  );
};
