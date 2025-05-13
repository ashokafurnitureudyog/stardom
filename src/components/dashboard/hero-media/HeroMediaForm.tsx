/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import {
  Image as ImageIcon,
  Film,
  Upload,
  Link,
  X,
  Check,
  Loader2,
  UploadCloud,
  ArrowRight,
} from "lucide-react";

interface HeroMediaFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const HeroMediaForm = ({ onSuccess, onCancel }: HeroMediaFormProps) => {
  const { toast } = useToast();
  const [addMethod, setAddMethod] = useState<"url" | "upload">("upload");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaAlt, setMediaAlt] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      if (addMethod === "url") {
        if (!mediaUrl) {
          toast({
            title: "Validation Error",
            description: "Please provide a URL for the media",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        formData.append("method", "url");
        formData.append(
          "data",
          JSON.stringify({
            type: mediaType,
            src: mediaUrl,
            alt: mediaAlt,
          }),
        );
      } else {
        if (!selectedFile) {
          toast({
            title: "Validation Error",
            description: "Please select a file to upload",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        formData.append("method", "upload");
        formData.append("file", selectedFile);
        formData.append("type", mediaType);
        if (mediaAlt) formData.append("alt", mediaAlt);
      }

      const res = await fetch("/api/protected/hero-media", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to add media");
      }

      toast({
        title: "Media Added",
        description: "Hero media has been added successfully.",
        variant: "default",
      });

      // Reset form
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add media",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    handleFile(file);
  };

  const handleFile = (file: File) => {
    // Validate file type
    if (mediaType === "image" && !file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (mediaType === "video" && !file.type.startsWith("video/")) {
      toast({
        title: "Invalid File",
        description: "Please select a video file.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);

    // Create preview
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Set alt text from filename if empty
      if (!mediaAlt && mediaType === "image") {
        const fileName = file.name.split(".")[0];
        setMediaAlt(fileName);
      }
    }
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

  // Reset preview and selection when changing media type
  useEffect(() => {
    if (previewUrl) {
      // Revoke object URL if it's a blob URL
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
    }

    setSelectedFile(null);
    setMediaUrl("");
    setMediaAlt("");
  }, [mediaType]);

  // Reset preview when changing method
  useEffect(() => {
    if (previewUrl) {
      // Revoke object URL if it's a blob URL
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
    }

    setSelectedFile(null);
    setMediaUrl("");
  }, [addMethod]);

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#A28B55]">
            Add Hero {mediaType === "image" ? "Image" : "Video"}
          </h2>
          <Separator className="mb-6 bg-[#3C3120]" />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Media Type Selection */}
            <div className="space-y-4">
              <Label className="text-neutral-400">Choose Media Type</Label>
              <RadioGroup
                defaultValue="image"
                value={mediaType}
                onValueChange={(value) =>
                  setMediaType(value as "image" | "video")
                }
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
                        <p className="text-xs text-neutral-500">
                          JPG, PNG, WebP, GIF
                        </p>
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

            <Separator className="my-6 bg-[#3C3120]" />

            {/* Preview Section (only shown when there's something to preview) */}
            {previewUrl && (
              <div className="p-4 bg-neutral-950/70 border border-[#352b1c] rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[#A28B55] font-medium">Preview</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-neutral-400 hover:text-neutral-200"
                    onClick={() => {
                      if (previewUrl && previewUrl.startsWith("blob:")) {
                        URL.revokeObjectURL(previewUrl);
                      }
                      setPreviewUrl(null);
                      if (addMethod === "upload") {
                        setSelectedFile(null);
                      }
                    }}
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
                        onError={() => {
                          toast({
                            title: "Error Loading Image",
                            description:
                              "Could not load the image from the provided URL.",
                            variant: "destructive",
                          });
                          setPreviewUrl(null);
                        }}
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
            )}

            {/* Upload Methods (only shown when no preview) */}
            {!previewUrl && (
              <Tabs
                defaultValue="upload"
                value={addMethod}
                onValueChange={(value) =>
                  setAddMethod(value as "url" | "upload")
                }
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
                      required={addMethod === "upload" && !selectedFile}
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
                          Click to upload{" "}
                          {mediaType === "image" ? "image" : "video"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                          {mediaType === "image"
                            ? "Support for JPG, PNG, WEBP or GIF (Max 10MB)"
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
            )}

            {/* Alt Text Field (only for images) */}
            {mediaType === "image" && (
              <div className="space-y-2 bg-neutral-950/70 p-4 rounded-lg border border-[#352b1c]">
                <div className="flex justify-between items-center">
                  <Label htmlFor="mediaAlt" className="text-neutral-400">
                    Alt Text
                  </Label>
                </div>
                <Input
                  id="mediaAlt"
                  value={mediaAlt}
                  onChange={(e) => setMediaAlt(e.target.value)}
                  placeholder="Descriptive text for accessibility"
                  className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
                />
                <p className="text-neutral-500 text-xs">
                  Provide a short description of the image for accessibility.
                </p>
              </div>
            )}

            <Separator className="my-6 bg-[#3C3120]" />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="bg-transparent border-[#3C3120] text-neutral-300 hover:bg-neutral-900 hover:border-[#A28B55]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  (addMethod === "upload" && !selectedFile) ||
                  (addMethod === "url" && !mediaUrl)
                }
                className="bg-[#A28B55] text-neutral-100 hover:bg-[#A28B55]/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size={16} className="mr-2" /> Save Media
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
