"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Loader2 } from "lucide-react";
import { MediaTypeSelector } from "./MediaTypeSelector";
import { MediaUploadTabs } from "./MediaUploadTabs";
import { MediaPreview } from "./MediaPreview";
import { useFileUpload } from "@/hooks/useFileUpload"; // Import the existing hook
import { Progress } from "@/components/ui/progress"; // Make sure this component exists

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

  // Use the file upload hook
  const { uploadFile, uploadStatus } = useFileUpload();

  // Use ref to track the current previewUrl for cleanup without causing re-renders
  const previewUrlRef = useRef<string | null>(null);

  // Keep the ref in sync with state
  useEffect(() => {
    previewUrlRef.current = previewUrl;
  }, [previewUrl]);

  // Clean up object URLs on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrlRef.current && previewUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  // Function to safely clean up object URL if it exists
  const cleanupObjectUrl = () => {
    if (previewUrlRef.current && previewUrlRef.current.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
  };

  // Reset state when media type changes
  useEffect(() => {
    cleanupObjectUrl();
    setPreviewUrl(null);
    setSelectedFile(null);
    setMediaUrl("");
    setMediaAlt("");
  }, [mediaType]);

  // Reset state when method changes
  useEffect(() => {
    cleanupObjectUrl();
    setPreviewUrl(null);
    setSelectedFile(null);
    setMediaUrl("");
  }, [addMethod]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate inputs
      if (addMethod === "url" && !mediaUrl) {
        toast({
          title: "Validation Error",
          description: "Please provide a URL for the media",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (addMethod === "upload" && !selectedFile) {
        toast({
          title: "Validation Error",
          description: "Please select a file to upload",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      let finalMediaUrl = mediaUrl;

      // If upload method, upload the file directly to Appwrite
      if (addMethod === "upload" && selectedFile) {
        try {
          const uploadResult = await uploadFile(
            selectedFile,
            process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_IMAGES_BUCKET_ID!,
          );

          if (!uploadResult) {
            throw new Error("Failed to upload media file");
          }

          finalMediaUrl = uploadResult;
        } catch (error) {
          throw new Error(
            `File upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
        }
      }

      // Create the JSON payload
      const mediaData = {
        type: mediaType,
        src: finalMediaUrl,
        alt: mediaAlt || "",
        // These fields are optional and can be expanded as needed
        poster: "",
        preload: false,
        webmSrc: "",
        lowResSrc: "",
      };

      // Send the JSON data to the API
      const res = await fetch("/api/protected/hero-media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mediaData),
        credentials: "include",
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

      onSuccess();
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add media";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageError = () => {
    toast({
      title: "Error Loading Image",
      description: "Could not load the image from the provided URL.",
      variant: "destructive",
    });
    clearPreview();
  };

  const clearPreview = () => {
    cleanupObjectUrl();
    setPreviewUrl(null);
    if (addMethod === "upload") {
      setSelectedFile(null);
    }
  };

  const handleFileValidation = (
    file: File,
    type: "image" | "video",
  ): boolean => {
    if (type === "image" && !file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return false;
    }

    if (type === "video" && !file.type.startsWith("video/")) {
      toast({
        title: "Invalid File",
        description: "Please select a video file.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#A28B55]">
            Add Hero {mediaType === "image" ? "Image" : "Video"}
          </h2>
          <Separator className="mb-6 bg-[#3C3120]" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <MediaTypeSelector
              mediaType={mediaType}
              setMediaType={setMediaType}
            />

            <Separator className="my-6 bg-[#3C3120]" />

            {previewUrl ? (
              <MediaPreview
                mediaType={mediaType}
                previewUrl={previewUrl}
                onClear={clearPreview}
                onImageError={handleImageError}
              />
            ) : (
              <MediaUploadTabs
                addMethod={addMethod}
                setAddMethod={setAddMethod}
                mediaType={mediaType}
                mediaUrl={mediaUrl}
                setMediaUrl={setMediaUrl}
                setSelectedFile={setSelectedFile}
                setPreviewUrl={setPreviewUrl}
                setMediaAlt={setMediaAlt}
                onFileValidation={handleFileValidation}
              />
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

            {/* Upload Progress Indicator */}
            {uploadStatus.uploading && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-400">
                    Uploading media...
                  </span>
                  <span className="text-sm text-neutral-400">
                    {uploadStatus.progress}%
                  </span>
                </div>
                <Progress value={uploadStatus.progress} className="h-2" />
              </div>
            )}

            <Separator className="my-6 bg-[#3C3120]" />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting || uploadStatus.uploading}
                className="bg-transparent border-[#3C3120] text-neutral-300 hover:bg-neutral-900 hover:border-[#A28B55]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  uploadStatus.uploading ||
                  (addMethod === "upload" && !selectedFile) ||
                  (addMethod === "url" && !mediaUrl)
                }
                className="bg-[#A28B55] text-neutral-100 hover:bg-[#A28B55]/90"
              >
                {isSubmitting || uploadStatus.uploading ? (
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
