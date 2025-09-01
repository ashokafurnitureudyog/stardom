"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ImagesSection } from "./images-section";
import { FeaturesSection } from "./features-section";
import { ColorsSection } from "./colors-section";
import type { Product } from "@/types/ComponentTypes";
import { useToast } from "@/hooks/use-toast";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Progress } from "@/components/ui/progress"; // Ensure you have this component

interface ProductFormProps {
  onSuccess: () => void;
  initialData?: Product;
  isEditing?: boolean;
}

export const ProductForm = ({
  onSuccess,
  initialData,
  isEditing = false,
}: ProductFormProps) => {
  // Form state
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [category, setCategory] = useState(initialData?.category || "");
  const [collection, setCollection] = useState(
    initialData?.product_collection || "",
  );
  const [features, setFeatures] = useState<string[]>(
    initialData?.features || [],
  );
  const [colors, setColors] = useState<string[]>(initialData?.colors || []);

  // Image handling
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData?.images || [],
  );
  const [initialImageUrls, setInitialImageUrls] = useState<string[]>(
    initialData?.images || [],
  );
  const [newImageUrl, setNewImageUrl] = useState("");

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();
  const { uploadMultipleFiles, uploadStatus } = useFileUpload();

  // Track initial image URLs for comparison during updates
  useEffect(() => {
    if (initialData?.images) {
      setInitialImageUrls([...initialData.images]);
    }
  }, [initialData]);

  // Handlers
  const handleAddImageUrl = () => {
    if (newImageUrl.trim() && !imageUrls.includes(newImageUrl.trim())) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. First upload any files directly to Appwrite
      let uploadedUrls: string[] = [];
      if (files.length > 0) {
        uploadedUrls = await uploadMultipleFiles(
          files,
          process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_IMAGES_BUCKET_ID!,
        );

        if (uploadedUrls.length !== files.length) {
          throw new Error("Some files failed to upload. Please try again.");
        }
      }

      // 2. Prepare the data for API request (JSON format)
      const productData = {
        name,
        description,
        category,
        collection,
        features,
        colors,
        // Combine existing URLs with newly uploaded ones
        images: [...imageUrls, ...uploadedUrls],
      };

      // 3. For editing, track removed images
      let removedImages: string[] = [];
      if (isEditing && initialData) {
        removedImages = initialImageUrls.filter(
          (url) => !imageUrls.includes(url),
        );
      }

      // 4. Send the product data to the API
      const response = await fetch("/api/protected/products", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productData,
          id:
            isEditing && initialData
              ? initialData.id || initialData.$id
              : undefined,
          removedImages: removedImages.length > 0 ? removedImages : undefined,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const text = await response.text();
        let error = "An error occurred";
        try {
          if (text) {
            const data = JSON.parse(text);
            error = data.error || error;
          }
        } catch {
          error = `Server error: ${response.status}`;
        }
        throw new Error(error);
      }

      onSuccess();
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to save product",
      );

      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h2>
        <Separator className="mb-6" />

        {errorMessage && (
          <div className="bg-destructive/10 text-destructive p-3 mb-4 rounded border border-destructive">
            {errorMessage}
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="text-sm font-medium block mb-1">
              Product Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              required
              className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium block mb-1"
            >
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="resize-none min-h-[100px] bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="text-sm font-medium block mb-1"
              >
                Category
              </label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                required
                className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
              />
            </div>
            <div>
              <label
                htmlFor="collection"
                className="text-sm font-medium block mb-1"
              >
                Collection
              </label>
              <Input
                id="collection"
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                placeholder="Collection"
                required
                className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
              />
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Features and Colors side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Features */}
          <FeaturesSection features={features} setFeatures={setFeatures} />

          {/* Colors */}
          <ColorsSection colors={colors} setColors={setColors} />
        </div>

        <Separator className="my-6" />

        {/* Product Images */}
        <ImagesSection
          files={files}
          setFiles={setFiles}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          newImageUrl={newImageUrl}
          setNewImageUrl={setNewImageUrl}
          handleAddImageUrl={handleAddImageUrl}
          isEditing={isEditing}
        />

        {/* Upload Progress Indicator */}
        {uploadStatus.uploading && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-400">
                Uploading files...
              </span>
              <span className="text-sm text-neutral-400">
                {uploadStatus.progress}%
              </span>
            </div>
            <Progress value={uploadStatus.progress} className="h-2" />
          </div>
        )}

        <Separator className="my-6" />

        <Button
          type="submit"
          className="w-full py-6 text-base"
          disabled={isSubmitting || uploadStatus.uploading}
        >
          {isSubmitting || uploadStatus.uploading
            ? isEditing
              ? "Updating..."
              : "Saving..."
            : isEditing
              ? "Update Product"
              : "Add Product"}
        </Button>
      </div>
    </form>
  );
};
