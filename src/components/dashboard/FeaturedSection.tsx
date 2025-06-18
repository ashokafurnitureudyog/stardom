"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/ComponentTypes";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { ProductDetails } from "./view-details";
import { FeaturedProductCard } from "./featured/FeaturedProductCard";
import { ProductSelectionDialog } from "./featured/ProductSelectionDialog";

export const FeaturedSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [productDetailsOpen, setProductDetailsOpen] = useState(false);
  const [selectedProductForDetails, setSelectedProductForDetails] =
    useState<Product | null>(null);

  // Calculate remaining slots
  const remainingSlots = 4 - featuredProducts.length;

  // Get available products for selection (products not already featured)
  const availableProducts = allProducts.filter(
    (product) =>
      !featuredProducts.some(
        (featured) =>
          featured.id === product.id || featured.$id === product.$id,
      ),
  );

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/featured", {
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!res.ok) throw new Error("Failed to fetch featured products");

      const data = await res.json();
      setFeaturedProducts(data);
    } catch (error: unknown) {
      console.error("Failed to fetch featured products:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load featured products",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setAllProducts(data);
    } catch (error: unknown) {
      console.error("Failed to fetch products:", error);
    }
  };

  const addToFeatured = async (productIds: string[]) => {
    if (productIds.length === 0) return;

    try {
      // Process each product sequentially
      for (const productId of productIds) {
        const response = await fetch("/api/protected/featured", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
          credentials: "include",
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to add to featured products");
        }
      }

      setError(
        `${productIds.length} product${productIds.length > 1 ? "s" : ""} added to featured section.`,
      );
      setTimeout(() => setError(""), 3000); // Clear after 3 seconds

      await fetchFeaturedProducts();
      setAddDialogOpen(false);
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to add to featured products",
      );
    }
  };

  const removeFromFeatured = async (productId: string) => {
    try {
      // Optimistically update UI
      setFeaturedProducts((prev) =>
        prev.filter(
          (product) => product.id !== productId && product.$id !== productId,
        ),
      );

      const response = await fetch("/api/protected/featured", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "Failed to remove from featured products",
        );
      }

      setError("Product removed from featured section");
      setTimeout(() => setError(""), 3000); // Clear after 3 seconds
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to remove from featured products",
      );
      // Revert optimistic update on error
      await fetchFeaturedProducts();
    }
  };

  // Show product details
  const showProductDetails = (product: Product) => {
    setSelectedProductForDetails(product);
    setProductDetailsOpen(true);
  };

  useEffect(() => {
    fetchFeaturedProducts();
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-semibold mb-2 text-[#A28B55]">
            Featured Products
          </h2>
          <p className="text-muted-foreground">
            Display up to 4 products on the homepage featured section
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="default"
            className="flex items-center gap-2 h-10 hover:bg-secondary"
            onClick={() => {
              fetchFeaturedProducts();
              fetchAllProducts();
            }}
          >
            <RefreshCw size={16} /> Refresh
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="flex items-center gap-2 h-10"
                disabled={featuredProducts.length >= 4}
                onClick={(e) => {
                  if (featuredProducts.length >= 4) {
                    e.preventDefault();
                    setError(
                      "Maximum limit of 4 featured products reached. Remove some before adding more.",
                    );
                    setTimeout(() => setError(""), 3000); // Clear after 3 seconds
                  } else {
                    setAddDialogOpen(true);
                  }
                }}
              >
                <Plus size={16} /> Add Featured
              </Button>
            </DialogTrigger>
          </Dialog>

          {/* Product Selection Dialog */}
          <ProductSelectionDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
            products={availableProducts}
            remainingSlots={remainingSlots}
            onAddToFeatured={addToFeatured}
            onViewDetails={showProductDetails}
          />

          {/* Product Details Dialog */}
          <Dialog
            open={productDetailsOpen}
            onOpenChange={setProductDetailsOpen}
          >
            <DialogContent className="w-[95vw] sm:max-w-[950px] h-[90vh] p-0 border-[#3C3120] bg-neutral-900">
              {selectedProductForDetails && (
                <ProductDetails product={selectedProductForDetails} />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Status messages */}
      {error && (
        <div className="bg-zinc-800/70 border border-zinc-700 px-5 py-3 mb-6 rounded-md">
          <div className="flex items-center gap-3">
            {error.includes("failed") ||
            error.includes("Failed") ||
            error.includes("error") ? (
              <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
            ) : (
              <CheckCircle2
                size={18}
                className="text-green-400 flex-shrink-0"
              />
            )}
            <div className="space-y-1">
              <p
                className={`font-medium ${
                  error.includes("failed") ||
                  error.includes("Failed") ||
                  error.includes("error")
                    ? "text-red-100"
                    : "text-green-100"
                }`}
              >
                {error}
              </p>
            </div>
          </div>

          {(error.includes("failed") || error.includes("Failed")) && (
            <Button
              variant="outline"
              className="mt-3 ml-9"
              onClick={fetchFeaturedProducts}
            >
              Try Again
            </Button>
          )}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-[4/5] bg-black/40 border border-[#3C3120]/50 rounded-md animate-pulse"
            />
          ))}
        </div>
      ) : featuredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <FeaturedProductCard
              key={product.id || product.$id}
              product={product}
              onRemove={removeFromFeatured}
              onViewDetails={showProductDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-black/40 border border-[#3C3120] rounded-md">
          <h3 className="text-xl font-medium mb-2">No Featured Products</h3>
          <p className="text-muted-foreground mb-4">
            Add products to feature them on your homepage
          </p>
          <Button
            onClick={() => {
              if (allProducts.length === 0) {
                setError(
                  "No products available. Add some products first before featuring them.",
                );
                setTimeout(() => setError(""), 3000);
              } else {
                setAddDialogOpen(true);
              }
            }}
            disabled={allProducts.length === 0}
          >
            Add First Featured Product
          </Button>
        </div>
      )}
    </div>
  );
};
