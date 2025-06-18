"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link, ImagePlus, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useState } from "react";

interface ThumbnailUploaderProps {
  thumbnailUrl: string;
  thumbnailFile?: File;
  onChange: (file?: File, url?: string) => void;
}

export const ThumbnailUploader = ({
  thumbnailUrl,
  thumbnailFile,
  onChange,
}: ThumbnailUploaderProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>(
    thumbnailFile ? "upload" : thumbnailUrl ? "url" : "upload",
  );
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(
    !!thumbnailUrl && !thumbnailFile,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description:
            "Please select an image file (JPG, PNG, WEBP, GIF, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image size should be less than 10MB",
          variant: "destructive",
        });
        return;
      }

      onChange(file);
      setActiveTab("upload");
      setShowPreview(false); // Reset URL preview when uploading a file
    }
  };

  const handleUrlChange = (url: string) => {
    // Make sure URL isn't longer than 512 chars
    if (url.length > 512) {
      toast({
        title: "URL too long",
        description: "The URL cannot be longer than 512 characters",
        variant: "destructive",
      });
      return;
    }

    onChange(undefined, url);
    // Only show the preview when a test is explicitly run
    setShowPreview(false);
  };

  const handleClearImage = () => {
    onChange(undefined, "");
    setShowPreview(false);
  };

  // Function to handle image load errors
  const handleImageError = () => {
    toast({
      title: "Image Error",
      description:
        "Could not load image from the provided URL. Please check the URL or try another image.",
      variant: "destructive",
    });
    // Clear the invalid URL
    onChange(undefined, "");
    setShowPreview(false);
    setIsImageLoading(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  // Test the URL when a user explicitly clicks the test button
  const testImageUrl = async (url: string) => {
    if (!url) return;

    // Validate URL length
    if (url.length > 512) {
      toast({
        title: "URL too long",
        description: "The URL cannot be longer than 512 characters",
        variant: "destructive",
      });
      return;
    }

    setIsImageLoading(true);

    try {
      // Create a dummy image element to test if the URL loads properly
      const testPromise = new Promise<void>((resolve, reject) => {
        const testImg = document.createElement("img");
        testImg.onload = () => resolve();
        testImg.onerror = () => reject(new Error("Failed to load image"));
        testImg.src = url;
      });

      // Set a timeout in case the image takes too long to load
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Image loading timed out")), 8000);
      });

      // Race the image loading against the timeout
      await Promise.race([testPromise, timeoutPromise]);

      setIsImageLoading(false);
      setShowPreview(true);
      toast({
        title: "Image verified",
        description: "The image has been loaded successfully.",
      });
    } catch (error: unknown) {
      setIsImageLoading(false);
      toast({
        title: "Invalid Image URL",
        description:
          error instanceof Error
            ? `Error: ${error.message}`
            : "The URL does not point to a valid image. Please check the URL or try another one.",
        variant: "destructive",
      });
      setShowPreview(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#A28B55]">Thumbnail Image</h3>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 bg-neutral-900 p-0.5 rounded-md gap-2 border border-[#3C3120]">
          <TabsTrigger
            value="upload"
            className="flex items-center justify-center gap-2 data-[state=active]:bg-[#A28B55] data-[state=active]:text-neutral-900 data-[state=active]:shadow-md data-[state=inactive]:bg-[#3C3120] data-[state=inactive]:text-neutral-200 py-1 transition-all duration-200"
          >
            <Upload size={16} /> Upload Image
          </TabsTrigger>
          <TabsTrigger
            value="url"
            className="flex items-center justify-center gap-2 data-[state=active]:bg-[#A28B55] data-[state=active]:text-neutral-900 data-[state=active]:shadow-md data-[state=inactive]:bg-[#3C3120] data-[state=inactive]:text-neutral-200 py-1 transition-all duration-200"
          >
            <Link size={16} /> Image URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div className="border-2 border-dashed border-[#3C3120]/50 rounded-lg p-6 text-center hover:border-[#A28B55]/70 transition-colors">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="thumbnail-upload"
            />
            <label
              htmlFor="thumbnail-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <ImagePlus className="h-6 w-6 text-primary" />
              </div>
              <p className="text-base font-medium">Click to upload thumbnail</p>
              <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                Support for JPG, PNG, WEBP or GIF (Max 10MB)
              </p>
            </label>
          </div>

          {thumbnailFile && (
            <div className="mt-6">
              <div className="aspect-square w-40 mx-auto relative">
                <Image
                  src={thumbnailUrl}
                  alt="Thumbnail preview"
                  fill
                  className="object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 shadow-md"
                  onClick={handleClearImage}
                >
                  <X size={12} />
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={thumbnailUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="Enter URL for main project image"
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => testImageUrl(thumbnailUrl)}
              disabled={isImageLoading || !thumbnailUrl}
              className="bg-[#A28B55] text-neutral-900 hover:bg-[#A28B55]/80"
            >
              {isImageLoading ? (
                <>
                  <Loader2 size={16} className="mr-1 animate-spin" /> Testing
                </>
              ) : (
                "Add URL"
              )}
            </Button>
          </div>

          {thumbnailUrl && thumbnailUrl.length > 512 && (
            <div className="text-red-400 text-sm mt-1">
              URL is too long ({thumbnailUrl.length}/512 characters)
            </div>
          )}

          {showPreview && thumbnailUrl && !thumbnailFile && !isImageLoading && (
            <div className="mt-4 border border-[#3C3120] rounded-md p-4 bg-neutral-950/30">
              <div className="relative aspect-square w-40 h-40 rounded-md overflow-hidden mx-auto">
                <Image
                  src={thumbnailUrl}
                  alt="Thumbnail preview"
                  fill
                  className="object-cover"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  unoptimized // Use unoptimized for external URLs
                  sizes="160px"
                />
              </div>
            </div>
          )}

          {isImageLoading && (
            <div className="mt-4 flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#A28B55] border-r-2"></div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
