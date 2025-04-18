"use client";
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { AddProductDialog } from "./AddProductDialog";
import type { Product } from "@/types/ComponentTypes";

export const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string, imageUrls: string[]) => {
    try {
      await fetch("/api/protected/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, imageUrls }),
      });
      fetchProducts();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-light mb-2">Product Management</h2>
          <p className="text-muted-foreground">
            {products.length} products in catalog
          </p>
        </div>
        <AddProductDialog onSuccess={fetchProducts} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? [1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 bg-secondary/30 rounded-lg animate-pulse"
              />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
              />
            ))}
      </div>
    </div>
  );
};
