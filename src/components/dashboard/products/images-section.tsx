"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Upload, Link, ImagePlus, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImagesSectionProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  newImageUrl: string;
  setNewImageUrl: (url: string) => void;
  handleAddImageUrl?: () => void;
  isEditing?: boolean;
}

export function ImagesSection({
  files,
  setFiles,
  imageUrls,
  setImageUrls,
  newImageUrl,
  setNewImageUrl,
  handleAddImageUrl,
}: ImagesSectionProps) {
  const { toast } = useToast();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  // This will ensure we have URLs for all files immediately for rendering
  // Using useMemo to only recalculate when files change
  const fileUrls = useMemo(() => {
    // Create a mapping of files to their Object URLs
    return files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  }, [files]);

  // Clean up object URLs when component unmounts or files change
  useEffect(() => {
    return () => {
      fileUrls.forEach(({ url }) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [fileUrls]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList && fileList.length > 0) {
      // Create a copy of the files to avoid potential issues with the FileList object
      const newFiles = Array.from(fileList);

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
        e.target.value = "";
        return;
      }

      // Validate file sizes (max 50MB each - we're now using direct Appwrite upload)
      // This is a client-side check for better UX, the actual limit is handled by Appwrite
      const largeFiles = newFiles.filter(
        (file) => file.size > 50 * 1024 * 1024,
      );
      if (largeFiles.length > 0) {
        toast({
          title: "File too large",
          description: `${largeFiles.length} file(s) exceed the maximum size of 50MB`,
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }

      setFiles((prevFiles: File[]) => {
        return [...prevFiles, ...newFiles];
      });

      // Provide success feedback
      toast({
        title: "Images added",
        description: `${newFiles.length} image${newFiles.length > 1 ? "s" : ""} successfully added`,
      });

      // Reset the input
      e.target.value = "";
      setActiveTab("upload");
    }
  };

  // Custom URL validation and handling
  const validateImageUrl = (url: string) => {
    if (!url.trim()) {
      toast({
        title: "Empty URL",
        description: "Please enter a valid image URL",
        variant: "destructive",
      });
      return false;
    }

    // Check URL length
    if (url.length > 512) {
      toast({
        title: "URL too long",
        description: "The URL cannot be longer than 512 characters",
        variant: "destructive",
      });
      return false;
    }

    // Check if URL is already in the list
    if (imageUrls.includes(url.trim())) {
      toast({
        title: "Duplicate URL",
        description: "This image URL is already in your gallery",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // Test the URL when a user enters it
  const testImageUrl = async (url: string) => {
    if (!validateImageUrl(url)) return;

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
      setImageUrls([...imageUrls, url.trim()]);
      setNewImageUrl("");
      toast({
        title: "Image added",
        description: "The image URL was verified and added to your gallery",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to validate image URL";

      toast({
        title: "Invalid Image URL",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsImageLoading(false);
    }
  };

  // Handle custom add URL button click
  const handleAddUrlClick = () => {
    if (handleAddImageUrl) {
      // If external handler provided (for backward compatibility)
      handleAddImageUrl();
    } else {
      // Use our improved handler
      testImageUrl(newImageUrl);
    }
  };

  // Handle image error for already added URLs
  const handleImageError = (index: number) => {
    toast({
      title: "Image Error",
      description: "An image URL is no longer valid and was removed",
      variant: "destructive",
    });
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  // Simplified image removal function - just removes from the array
  const handleImageRemove = (index: number) => {
    // Create a new array without the image at the specified index
    const newUrls = [...imageUrls];
    newUrls.splice(index, 1);
    setImageUrls(newUrls);

    toast({
      title: "Image removed",
      description: "The image has been removed from the product",
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Product Images</h3>

      {/* Current Images Display - always visible */}
      {imageUrls.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3">
            Current Images ({imageUrls.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageUrls.map((url, index) => (
              <div key={`img-${index}`} className="group relative">
                <div className="aspect-square bg-black/40 border border-[#3C3120]/50 rounded-md overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Product image ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => handleImageError(index)}
                  />
                </div>

                {/* Delete button */}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  onClick={() => handleImageRemove(index)}
                >
                  <X size={12} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

        <TabsContent value="upload" className="space-y-4">
          <div className="border-2 border-dashed border-[#3C3120]/50 rounded-lg p-6 text-center hover:border-[#A28B55]/70 transition-colors">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <ImagePlus className="h-6 w-6 text-primary" />
              </div>
              <p className="text-base font-medium">Click to upload images</p>
              <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                Support for JPG, PNG, WEBP or GIF (Up to 50MB each)
              </p>
            </label>
          </div>

          {files.length > 0 && fileUrls.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">
                New Files ({files.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {fileUrls.map(({ file, url }, index) => (
                  <div key={`file-${index}`} className="group relative">
                    <div className="aspect-square bg-black/40 border border-[#3C3120]/50 rounded-md overflow-hidden">
                      <Image
                        src={url}
                        alt={file.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      onClick={() => {
                        setFiles(files.filter((_, i) => i !== index));
                      }}
                    >
                      <X size={12} />
                    </Button>
                    <p className="text-xs truncate mt-1 text-center">
                      {file.name.length > 20
                        ? file.name.substring(0, 17) + "..."
                        : file.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newImageUrl}
              onChange={(e) => {
                const url = e.target.value;
                // Handle max URL length
                if (url.length > 512) {
                  toast({
                    title: "URL too long",
                    description: "The URL cannot be longer than 512 characters",
                    variant: "destructive",
                  });
                  return;
                }
                setNewImageUrl(url);
              }}
              placeholder="https://example.com/image.jpg"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddUrlClick();
                }
              }}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleAddUrlClick}
              disabled={isImageLoading || !newImageUrl.trim()}
              className="shrink-0 whitespace-nowrap bg-[#A28B55] text-neutral-900 hover:bg-[#A28B55]/80 transition-all duration-300"
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

          {isImageLoading && (
            <div className="mt-4 flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#A28B55] border-r-2"></div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
