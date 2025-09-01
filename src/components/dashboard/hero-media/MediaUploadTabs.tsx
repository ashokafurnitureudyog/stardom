"use client";
import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Link, UploadCloud, ArrowRight } from "lucide-react";

interface MediaUploadTabsProps {
  addMethod: "url" | "upload";
  setAddMethod: (method: "url" | "upload") => void;
  mediaType: "image" | "video";
  mediaUrl: string;
  setMediaUrl: (url: string) => void;
  setSelectedFile: (file: File | null) => void;
  setPreviewUrl: (url: string | null) => void;
  setMediaAlt: (alt: string) => void;
  onFileValidation: (file: File, type: "image" | "video") => boolean;
}

export const MediaUploadTabs = ({
  addMethod,
  setAddMethod,
  mediaType,
  mediaUrl,
  setMediaUrl,
  setSelectedFile,
  setPreviewUrl,
  setMediaAlt,
  onFileValidation,
}: MediaUploadTabsProps) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Validate file type
    if (!onFileValidation(file, mediaType)) {
      return;
    }

    setSelectedFile(file);

    // Create preview
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Set alt text from filename if empty
      if (mediaType === "image") {
        const fileName = file.name.split(".")[0];
        setMediaAlt(fileName);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    handleFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUrlPreview = () => {
    if (mediaUrl) {
      setPreviewUrl(mediaUrl);
    }
  };

  return (
    <Tabs
      defaultValue="upload"
      value={addMethod}
      onValueChange={(value) => setAddMethod(value as "url" | "upload")}
      className="w-full"
    >
      <TabsList className="grid grid-cols-2 mb-4 bg-neutral-900 p-0.5 rounded-md gap-2 border border-[#3C3120]">
        <TabsTrigger
          value="upload"
          className="flex items-center justify-center gap-2 data-[state=active]:bg-[#A28B55] data-[state=active]:text-neutral-900 data-[state=active]:shadow-md data-[state=inactive]:bg-[#3C3120] data-[state=inactive]:text-neutral-200 py-1 transition-all duration-200"
        >
          <Upload size={16} /> Upload File
        </TabsTrigger>
        <TabsTrigger
          value="url"
          className="flex items-center justify-center gap-2 data-[state=active]:bg-[#A28B55] data-[state=active]:text-neutral-900 data-[state=active]:shadow-md data-[state=inactive]:bg-[#3C3120] data-[state=inactive]:text-neutral-200 py-1 transition-all duration-200"
        >
          <Link size={16} /> Media URL
        </TabsTrigger>
      </TabsList>

      <TabsContent value="url" className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="mediaUrl" className="text-neutral-400">
              Media URL
            </Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-5 text-xs text-[#A28B55] hover:text-[#A28B55]/80 hover:bg-transparent p-0"
              onClick={handleUrlPreview}
              disabled={!mediaUrl}
            >
              Preview URL <ArrowRight size={12} className="ml-1" />
            </Button>
          </div>
          <div className="relative">
            <Input
              id="mediaUrl"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder={
                mediaType === "image"
                  ? "https://example.com/image.jpg"
                  : "https://example.com/video.mp4"
              }
              className="bg-neutral-950/70 pl-10 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
              required={addMethod === "url"}
            />
            <div className="absolute left-3 top-2.5 text-neutral-500">
              <Link size={16} />
            </div>
          </div>
          <p className="text-neutral-500 text-xs">
            Enter a direct URL to the {mediaType} file.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="upload" className="space-y-4">
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center transition-all
            ${
              dragActive
                ? "border-[#A28B55] bg-[#A28B55]/5 shadow-[0_0_15px_rgba(162,139,85,0.1)]"
                : "border-[#3C3120]/50 hover:border-[#A28B55]/50 hover:bg-[#A28B55]/5"
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Input
            id="fileUpload"
            type="file"
            accept={mediaType === "image" ? "image/*" : "video/*"}
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            required={addMethod === "upload"}
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-3 text-neutral-400">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <UploadCloud className="h-8 w-8 text-[#A28B55]" />
              </div>
              <p className="text-base font-medium">
                Click to upload {mediaType === "image" ? "image" : "video"}
              </p>
              <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                {mediaType === "image"
                  ? "Support for JPG, PNG, WEBP or GIF (Max 50MB)" // Updated to 50MB
                  : "Support for MP4, WEBM (Max 50MB)"}
              </p>
              <p className="text-neutral-500 text-sm mt-1">
                or drop files here
              </p>
            </div>
          </label>
        </div>
      </TabsContent>
    </Tabs>
  );
};
