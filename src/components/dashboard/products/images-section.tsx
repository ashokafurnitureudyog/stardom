import React, { useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Upload, Link, ImagePlus, X } from "lucide-react";

interface ImagesSectionProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  newImageUrl: string;
  setNewImageUrl: (url: string) => void;
  handleAddImageUrl: () => void;
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
    console.log("File input change detected");
    const fileList = e.target.files;

    if (fileList && fileList.length > 0) {
      // Create a copy of the files to avoid potential issues with the FileList object
      const newFiles = Array.from(fileList);

      setFiles((prevFiles: File[]) => {
        console.log(
          `Adding ${newFiles.length} files to existing ${prevFiles.length} files`,
        );
        return [...prevFiles, ...newFiles];
      });

      // Reset the input
      e.target.value = "";
    } else {
      console.log("No files selected");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Product Images</h3>

      <Tabs defaultValue="upload" className="w-full">
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
                Support for JPG, PNG, WEBP or GIF (Max 10MB each)
              </p>
            </label>
          </div>

          {files.length > 0 && fileUrls.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">
                Selected Files ({files.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {fileUrls.map(({ file, url }, index) => (
                  <div key={index} className="group relative">
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
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddImageUrl();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleAddImageUrl}
              className="shrink-0 whitespace-nowrap bg-[#A28B55] text-neutral-900 hover:bg-[#A28B55]/80 transition-all duration-300"
            >
              Add URL
            </Button>
          </div>

          {imageUrls.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">
                Image URLs ({imageUrls.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="group relative">
                    <div className="aspect-square bg-black/40 border border-[#3C3120]/50 rounded-md overflow-hidden">
                      <Image
                        src={url}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      onClick={() =>
                        setImageUrls(imageUrls.filter((_, i) => i !== index))
                      }
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
}
