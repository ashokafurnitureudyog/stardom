import { useState, useOptimistic, useTransition } from "react";
import { ProductCard } from "./products/ProductCard";
import { AddProductDialog } from "./products/AddProductDialog";
import type { Product } from "@/types/ComponentTypes";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const ProductsSection = () => {
  const {
    products,
    isLoading: loading,
    error: queryError,
    deleteProduct,
    featuredProducts,
  } = useProducts();

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const featuredProductIds = new Set(
    featuredProducts.map((p) => p.id || p.$id || ""),
  );

  const [optimisticProducts, addOptimisticProduct] = useOptimistic(
    products,
    (state: Product[], deletedId: string) =>
      state.filter((p) => p.id !== deletedId && p.$id !== deletedId),
  );

  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };

  // Filtered products
  const filteredProducts = optimisticProducts.filter(
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

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
    queryClient.invalidateQueries({ queryKey: ["featuredProducts"] });
  };

  const handleDelete = async (productId: string, imageUrls: string[]) => {
    startTransition(async () => {
      addOptimisticProduct(productId);
      try {
        await deleteProduct({ productId, imageUrls });
      } catch (error) {
        console.error("Delete failed:", error);
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive",
        });
        // React Query will automatically refetch/revert if mutation fails
      }
    });
  };

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

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64">
            {isPending ? (
              <div className="absolute left-2.5 top-2.5 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={inputValue}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto justify-center">
            <Button
              variant="outline"
              size="default"
              className="flex items-center gap-2 h-10 hover:bg-secondary"
              onClick={handleRefresh}
            >
              <RefreshCw size={16} /> Refresh
            </Button>

            <AddProductDialog onSuccess={handleRefresh} />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {queryError && (
        <div className="bg-red-500/10 text-red-400 p-4 mb-6 rounded border border-red-900/50">
          <p>
            {queryError instanceof Error
              ? queryError.message
              : "Failed to load products"}
          </p>
          <Button
            variant="outline"
            className="mt-2 bg-transparent border-[#3C3120] text-[#A28B55] hover:bg-neutral-800 hover:border-[#A28B55]"
            onClick={handleRefresh}
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
              className="aspect-4/5 bg-black/40 border border-[#3C3120]/50 rounded-md animate-pulse"
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
              onUpdate={handleRefresh}
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
                <AddProductDialog onSuccess={handleRefresh} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
