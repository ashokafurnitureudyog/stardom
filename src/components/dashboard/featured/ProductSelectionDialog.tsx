/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Product } from "@/types/ComponentTypes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Info, Eye, AlertCircle } from "lucide-react";

interface ProductSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  remainingSlots: number;
  onAddToFeatured: (productIds: string[]) => Promise<void>;
  onViewDetails: (product: Product) => void;
}

export const ProductSelectionDialog = ({
  open,
  onOpenChange,
  products,
  remainingSlots,
  onAddToFeatured,
  onViewDetails,
}: ProductSelectionDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set(),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectionError, setSelectionError] = useState("");

  // Filtered products based on search query
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

  // Handle product selection
  const toggleProductSelection = (productId: string) => {
    const newSelectedProducts = new Set(selectedProducts);

    // If already selected, remove it
    if (selectedProducts.has(productId)) {
      newSelectedProducts.delete(productId);
      setSelectedProducts(newSelectedProducts);
      setSelectionError(""); // Clear any error
      return;
    }

    // If trying to add more than allowed
    if (newSelectedProducts.size >= remainingSlots) {
      setSelectionError(
        `Selection limit reached. You can only select ${remainingSlots} more product${remainingSlots !== 1 ? "s" : ""}.`,
      );

      // Auto clear the error after 3 seconds
      setTimeout(() => setSelectionError(""), 3000);
      return;
    }

    // Otherwise add to selection
    newSelectedProducts.add(productId);
    setSelectedProducts(newSelectedProducts);
  };

  // Handle add to featured
  const handleAddToFeatured = async () => {
    if (selectedProducts.size === 0) return;

    setIsSubmitting(true);
    try {
      await onAddToFeatured(Array.from(selectedProducts));
      // Reset selection and close dialog on success
      setSelectedProducts(new Set());
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle dialog close
  const handleClose = () => {
    setSelectedProducts(new Set());
    setSelectionError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] border-[#3C3120]">
        <DialogHeader>
          <DialogTitle>Select Products to Feature</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 my-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Selection limit message */}
          {remainingSlots > 0 ? (
            <div className="bg-zinc-800/70 border border-zinc-700 text-zinc-100 px-5 py-3 rounded-md">
              <div className="flex items-center gap-3">
                <Info size={18} className="text-blue-400 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium">
                    You can select up to{" "}
                    <span className="text-blue-400">{remainingSlots}</span> more
                    product{remainingSlots !== 1 ? "s" : ""}.
                  </p>
                  <p className="text-sm text-zinc-400">
                    {4 - remainingSlots} of 4 slots already used.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-800/70 border border-zinc-700 text-amber-100 px-5 py-3 rounded-md">
              <div className="flex items-center gap-3">
                <Info size={18} className="text-amber-400 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium">Maximum limit reached.</p>
                  <p className="text-sm text-zinc-400">
                    Remove existing featured products before adding more.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Selection error message */}
          {selectionError && (
            <div className="bg-zinc-800/70 border border-zinc-700 text-red-100 px-5 py-3 rounded-md">
              <div className="flex items-center gap-3">
                <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">{selectionError}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-[400px] overflow-y-scroll px-4 py-2 scrollbar-thin scrollbar-thumb-[#3C3120] scrollbar-track-neutral-900">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
              {filteredProducts.map((product) => {
                const productId = product.id || product.$id || "";
                const isSelected = selectedProducts.has(productId);

                return (
                  <div
                    key={productId}
                    className={`
              group rounded-md overflow-hidden bg-black/40 border 
              ${
                isSelected
                  ? "border-[#090908] shadow-[0_0_12px_rgba(162,139,85,0.3)]"
                  : "border-[#3C3120] hover:border-[#A28B55] hover:shadow-[0_0_12px_rgba(162,139,85,0.2)]"
              }
              transition-all duration-300 hover:z-10 transform hover:scale-[1.03]
            `}
                  >
                    {/* Image container */}
                    <div
                      className="relative w-full"
                      style={{ height: "220px" }}
                    >
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="absolute opacity-85 inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                          <span className="text-neutral-600">No image</span>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div
                        className={`absolute inset-0 ${isSelected ? "bg-black/80" : "bg-black/90"} flex items-center justify-center 
                ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-all duration-300 cursor-pointer`}
                        onClick={() => toggleProductSelection(productId)}
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div
                            className={`flex items-center justify-center ${isSelected ? "text-[#A28B55]" : "text-neutral-200"} 
                    transform scale-100 hover:scale-110 transition-all duration-300 cursor-pointer`}
                          >
                            {isSelected ? (
                              <span className="text-sm font-medium border border-[#A28B55] hover:border-neutral-600 text-[#A28B55] hover:text-neutral-300 px-4 py-1.5 rounded-sm">
                                Remove
                              </span>
                            ) : (
                              <span className="text-sm font-medium border border-neutral-600 hover:border-[#A28B55] hover:text-[#A28B55] px-4 py-1.5 rounded-sm">
                                Select
                              </span>
                            )}
                          </div>

                          <div
                            className="flex items-center justify-center text-neutral-400 hover:text-[#A28B55] transform scale-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewDetails(product);
                            }}
                          >
                            <Eye size={18} className="mr-2" />
                            <span className="text-xs font-medium">
                              View Details
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Selection Badge */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 z-20">
                          <div className="bg-[#A28B55]/80 text-neutral-900 text-xs font-semibold px-2 py-1 rounded-sm">
                            Selected
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <h3 className="font-medium text-[#A28B55] truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-500 truncate mt-1">
                        {product.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-500">
              {searchQuery
                ? "No products match your search"
                : "No products available"}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center gap-4">
          <div>
            {selectedProducts.size > 0 && (
              <span className="text-sm">
                {selectedProducts.size} product
                {selectedProducts.size !== 1 ? "s" : ""} selected
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleAddToFeatured}
              disabled={selectedProducts.size === 0 || isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add to Featured"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
