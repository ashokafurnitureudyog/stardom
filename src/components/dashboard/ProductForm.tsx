/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const ProductForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [currentFeature, setCurrentFeature] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleAddFeature = () => {
    if (currentFeature.trim() && !features.includes(currentFeature.trim())) {
      setFeatures([...features, currentFeature.trim()]);
      setCurrentFeature("");
    }
  };

  const handleAddColor = () => {
    if (currentColor.trim() && !colors.includes(currentColor.trim())) {
      setColors([...colors, currentColor.trim()]);
      setCurrentColor("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("collection", collection);
    formData.append("features", JSON.stringify(features));
    formData.append("colors", JSON.stringify(colors));
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/protected/products", {
        method: "POST",
        body: formData,
        credentials: "include", // Add this line
      });

      if (!response.ok) throw new Error("Failed to add product");

      // Refresh product list and reset form
      await fetchProducts();
      setName("");
      setDescription("");
      setCategory("");
      setCollection("");
      setFeatures([]);
      setColors([]);
      setFiles([]);
      onSuccess();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to add product. Please check the console.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card rounded-lg">
      <div className="space-y-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <Input
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          placeholder="Collection"
          required
        />

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={currentFeature}
              onChange={(e) => setCurrentFeature(e.target.value)}
              placeholder="Add feature"
            />
            <Button type="button" onClick={handleAddFeature}>
              Add Feature
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((feature) => (
              <Badge key={feature} variant="secondary">
                {feature}
                <button
                  type="button"
                  onClick={() =>
                    setFeatures(features.filter((f) => f !== feature))
                  }
                  className="ml-2 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
              placeholder="Add color"
            />
            <Button type="button" onClick={handleAddColor}>
              Add Color
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Badge key={color} variant="secondary">
                {color}
                <button
                  type="button"
                  onClick={() => setColors(colors.filter((c) => c !== color))}
                  className="ml-2 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Product Images</label>
          <Input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
          {files.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {files.length} file(s) selected
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Add Product
        </Button>
      </div>
    </form>
  );
};
