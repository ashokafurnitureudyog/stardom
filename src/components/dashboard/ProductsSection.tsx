"use client";
import { useEffect, useState, useCallback } from "react";
import { ProductCard } from "./products/ProductCard";
import { AddProductDialog } from "./products/AddProductDialog";
import type { Product } from "@/types/ComponentTypes";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductsSection = () => {
  const [featuredProductIds, setFeaturedProductIds] = useState<Set<string>>(
    new Set(),
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string>("");

  const fetchFeaturedIds = useCallback(async () => {
    try {
      const res = await fetch("/api/featured", {
        cache: "no-store",
      });

      if (!res.ok) return;

      const data = await res.json();
      const ids = new Set<string>(
        data.map((product: Product) =>
          (product.id || product.$id || "").toString(),
        ),
      );
      setFeaturedProductIds(ids);
    } catch (error: unknown) {
      console.error("Failed to fetch featured products:", error);
    }
  }, []);

  // Filtered products
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (product.product_collection || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/products", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data);
    } catch (error: unknown) {
      console.error("Failed to fetch products:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load products";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (productId: string, imageUrls: string[]) => {
    try {
      // Optimistically update UI
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product.id !== productId && product.$id !== productId,
        ),
      );

      const response = await fetch("/api/protected/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, imageUrls }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // If successful, product is already removed from state
    } catch (error: unknown) {
      console.error("Delete failed:", error);
      // If deletion fails, refresh the product list
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFeaturedIds();
  }, [fetchProducts, fetchFeaturedIds]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-semibold mb-2 text-[#A28B55]">
            Product Management
          </h2>
          <p className="text-muted-foreground">
            {products.length} products in catalog
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto lg:w-auto justify-center">
            <Button
              variant="outline"
              size="default"
              className="flex items-center gap-2 h-10 hover:bg-secondary"
              onClick={fetchProducts}
            >
              <RefreshCw size={16} />{" "}
              <span className="hidden lg:inline">Refresh</span>
            </Button>

            <AddProductDialog onSuccess={fetchProducts} />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {error && (
        <div className="bg-red-500/10 text-red-400 p-4 mb-6 rounded border border-red-900/50">
          <p>{error}</p>
          <Button
            variant="outline"
            className="mt-2 bg-transparent border-[#3C3120] text-[#A28B55] hover:bg-neutral-800 hover:border-[#A28B55]"
            onClick={fetchProducts}
          >
            Try Again
          </Button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="aspect-[4/5] bg-black/40 border border-[#3C3120]/50 rounded-md animate-pulse"
            />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id || product.$id || `${product.name}-${index}`}
              product={product}
              onDelete={handleDelete}
              onUpdate={fetchProducts}
              isFeatured={featuredProductIds.has(
                product.id || product.$id || "",
              )}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-black/40 border border-[#3C3120] rounded-md">
          <PackageOpen className="mx-auto h-12 w-12 text-[#A28B55] opacity-70 mb-4" />
          {searchQuery ? (
            <>
              <h3 className="text-xl font-medium mb-3 text-[#A28B55]">
                No Products Found
              </h3>
              <p className="text-neutral-500 mb-6">
                No products match your search query
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-medium mb-3 text-[#A28B55]">
                No Products Yet
              </h3>
              <p className="text-neutral-500 mb-6">
                Get started by adding your first product
              </p>
              <div className="flex justify-center">
                <AddProductDialog onSuccess={fetchProducts} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
