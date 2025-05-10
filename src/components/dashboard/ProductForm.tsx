/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ImagesSection } from "./form-sections/images-section";
import { FeaturesSection } from "./form-sections/features-section";
import { ColorsSection } from "./form-sections/colors-section";
import type { Product } from "@/types/ComponentTypes";

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
  const [newImageUrl, setNewImageUrl] = useState("");

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      const formData = new FormData();

      // Basic product details
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("collection", collection);
      formData.append("features", JSON.stringify(features));
      formData.append("colors", JSON.stringify(colors));

      // Important: Make sure we're sending all imageUrls
      formData.append("imageUrls", JSON.stringify(imageUrls));

      // If editing, include product ID
      if (isEditing && initialData) {
        formData.append("id", initialData.id || initialData.$id || "");
      }

      // Add files
      files.forEach((file) => formData.append("files", file));

      const response = await fetch("/api/protected/products", {
        method: isEditing ? "PUT" : "POST",
        body: formData,
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
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
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
        />

        <Separator className="my-6" />

        <Button
          type="submit"
          className="w-full py-6 text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Add Product"}
        </Button>
      </div>
    </form>
  );
};
