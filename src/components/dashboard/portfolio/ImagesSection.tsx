"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link, ImagePlus, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useState } from "react";

interface ImagesSectionProps {
  files: File[];
  setFiles: (files: File[]) => void;
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
  newImageUrl: string;
  setNewImageUrl: (url: string) => void;
  handleAddImageUrl?: () => void;
}

export const ImagesSection = ({
  files,
  setFiles,
  imageUrls,
  setImageUrls,
  newImageUrl,
  setNewImageUrl,
}: ImagesSectionProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      // Validate file types
      const invalidFiles = newFiles.filter(
        (file) => !file.type.startsWith("image/"),
      );
      if (invalidFiles.length > 0) {
        toast({
          title: "Invalid file type",
          description:
            "Please select only image files (JPG, PNG, WEBP, GIF, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Validate file sizes (max 10MB each)
      const largeFiles = newFiles.filter(
        (file) => file.size > 10 * 1024 * 1024,
      );
      if (largeFiles.length > 0) {
        toast({
          title: "File too large",
          description: `${largeFiles.length} image(s) exceed the maximum size of 10MB`,
          variant: "destructive",
        });
        return;
      }

      setFiles([...files, ...newFiles]);
      setActiveTab("upload");
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;

    // Check URL length
    if (url.length > 512) {
      toast({
        title: "URL too long",
        description: "The URL cannot be longer than 512 characters",
        variant: "destructive",
      });
      return;
    }

    setNewImageUrl(url);
  };

  const handleRemoveImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  // Test the URL when a user enters it
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

      // URL is valid, add it to the list
      if (url.trim() && !imageUrls.includes(url.trim())) {
        setImageUrls([...imageUrls, url.trim()]);
        setNewImageUrl("");
        toast({
          title: "Image added",
          description: "The image URL was verified and added to the gallery",
        });
      } else if (imageUrls.includes(url.trim())) {
        toast({
          title: "Duplicate URL",
          description: "This image URL is already in your gallery",
          variant: "destructive",
        });
      }

      setIsImageLoading(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to validate image URL";

      setIsImageLoading(false);
      toast({
        title: "Invalid Image URL",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#A28B55]">Product Images</h3>

      <Tabs
        defaultValue="upload"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-4 bg-neutral-900 p-0.5 rounded-md gap-2 border border-[#3C3120]">
          <TabsTrigger
            value="upload"
            className="flex items-center justify-center gap-2 data-[state=active]:bg-[#A28B55] data-[state=active]:text-neutral-900 data-[state=active]:shadow-md data-[state=inactive]:bg-[#3C3120] data-[state=inactive]:text-neutral-200 py-1 transition-all duration-200"
          >
            <Upload size={16} /> Upload Images
          </TabsTrigger>
          <TabsTrigger
            value="url"
            className="flex items-center justify-center gap-2 data-[state=active]:bg-[#A28B55] data-[state=active]:text-neutral-900 data-[state=active]:shadow-md data-[state=inactive]:bg-[#3C3120] data-[state=inactive]:text-neutral-200 py-1 transition-all duration-200"
          >
            <Link size={16} /> Add Image URLs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="border-2 border-dashed border-[#3C3120]/50 rounded-lg p-6 text-center hover:border-[#A28B55]/70 transition-colors">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="gallery-upload"
            />
            <label
              htmlFor="gallery-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <ImagePlus className="h-6 w-6 text-primary" />
              </div>
              <p className="text-base font-medium">Click to upload images</p>
              <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                Support for JPG, PNG, WEBP or GIF (Max 10MB each)
              </p>
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-4">
              <Label className="text-neutral-400">Selected Images</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {files.map((file, index) => (
                  <div
                    key={`file-${index}`}
                    className="aspect-square relative rounded-md overflow-hidden border border-[#3C3120] bg-neutral-950/50"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 shadow-md"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="url" className="space-y-6">
          <div className="flex gap-2">
            <Input
              value={newImageUrl}
              onChange={handleUrlChange}
              placeholder="Enter URL of the image"
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => testImageUrl(newImageUrl)}
              disabled={isImageLoading || !newImageUrl}
              className="bg-[#A28B55] text-neutral-900 hover:bg-[#A28B55]/80 whitespace-nowrap"
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

          {newImageUrl && newImageUrl.length > 512 && (
            <div className="text-red-400 text-sm mt-1">
              URL is too long ({newImageUrl.length}/512 characters)
            </div>
          )}

          {imageUrls.length > 0 && (
            <div className="mt-6 space-y-4">
              <Label className="text-neutral-400">Image URLs</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {imageUrls.map((url, index) => (
                  <div
                    key={`url-${index}`}
                    className="aspect-square relative rounded-md overflow-hidden border border-[#3C3120] bg-neutral-950/50"
                  >
                    <Image
                      src={url}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      onError={() => {
                        // For stale URLs that later become invalid
                        toast({
                          title: "Image Error",
                          description:
                            "An image URL is no longer valid and was removed",
                          variant: "destructive",
                        });
                        handleRemoveImageUrl(index);
                      }}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 shadow-md"
                      onClick={() => handleRemoveImageUrl(index)}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
