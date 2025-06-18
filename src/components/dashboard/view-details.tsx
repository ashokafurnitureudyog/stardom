"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/ComponentTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = product.images?.length || 0;

  // Navigate to previous image
  const prevImage = () => {
    if (totalImages > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  // Navigate to next image
  const nextImage = () => {
    if (totalImages > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 h-full w-full overflow-auto md:overflow-hidden bg-neutral-900">
      {/* Image section with strict height constraints */}
      <div className="w-full h-[45vh] md:h-full flex-shrink-0 border-b md:border-b-0 md:border-r border-[#3C3120] relative">
        {/* Image container with adjusted height to account for nav */}
        <div className="absolute inset-0 bottom-14 p-4 flex items-center justify-center bg-black/30 overflow-hidden">
          <div className="w-[90%] h-[90%] relative rounded-md overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                <span className="text-neutral-600">No image available</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation section fixed at bottom */}
        {totalImages > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/40 border-t border-[#3C3120] flex items-center justify-center px-6">
            <div className="flex items-center justify-between w-full max-w-xs">
              {/* Navigation content (unchanged) */}
              {/* Left arrow */}
              <button
                onClick={prevImage}
                className="w-9 h-9 rounded-full bg-black/50 border border-[#3C3120] flex items-center justify-center hover:bg-black/70 hover:border-[#A28B55] transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-[#A28B55]" />
              </button>

              {/* Center section with counter and dots */}
              <div className="flex flex-col items-center space-y-1.5">
                {/* Image counter */}
                <span className="text-sm text-[#A28B55] font-medium">
                  {currentImageIndex + 1}/{totalImages}
                </span>

                {/* Dot indicators */}
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalImages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`transition-all duration-300 ${
                        idx === currentImageIndex
                          ? "w-5 h-2.5 bg-[#A28B55]"
                          : "w-2.5 h-2.5 bg-neutral-600 hover:bg-neutral-400"
                      } rounded-full`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Right arrow */}
              <button
                onClick={nextImage}
                className="w-9 h-9 rounded-full bg-black/50 border border-[#3C3120] flex items-center justify-center hover:bg-black/70 hover:border-[#A28B55] transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-[#A28B55]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product details section */}
      <div className="w-full md:h-full md:overflow-auto">
        {/* Use ScrollArea only on desktop */}
        <div className="block md:hidden p-6 space-y-6">
          {/* Mobile: Regular div content */}
          <ProductContent product={product} />
        </div>

        <div className="hidden md:block h-full">
          <ScrollArea className="h-full pr-4">
            <div className="p-6 space-y-6">
              {/* Desktop: ScrollArea content */}
              <ProductContent product={product} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

// Helper component to avoid duplicating code
function ProductContent({ product }: { product: Product }) {
  return (
    <>
      {/* Product Title and Categories */}
      <div>
        <p className="text-2xl font-semibold text-[#A28B55] pr-2">
          {product.name}
        </p>
        <div className="mt-3 space-y-2">
          {product.category && (
            <div className="flex items-center">
              <span className="text-[#A28B55] font-medium mr-2">Category:</span>
              <span className="text-neutral-400">{product.category}</span>
            </div>
          )}
          {product.product_collection && (
            <div className="flex items-center">
              <span className="text-[#A28B55] font-medium mr-2">
                Collection:
              </span>
              <span className="text-neutral-400">
                {product.product_collection}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#3C3120] to-transparent my-1"></div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-medium mb-2 text-[#A28B55]">Description</h3>
        <p className="text-neutral-400">{product.description}</p>
      </div>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-[#3C3120] to-transparent my-1"></div>
          <div>
            <h3 className="text-lg font-medium mb-3 text-[#A28B55]">
              Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-sm bg-neutral-800 text-[#A28B55] border-[#3C3120] hover:border-[#A28B55]"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Colors */}
      {product.colors && product.colors.length > 0 && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-[#3C3120] to-transparent my-1"></div>
          <div>
            <h3 className="text-lg font-medium mb-3 text-[#A28B55]">
              Available Colors
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-sm bg-neutral-800 text-neutral-300 border-[#3C3120] hover:border-[#A28B55]"
                >
                  {color}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-[#3C3120] to-transparent my-1"></div>

      {/* Product ID */}
      <div className="text-sm text-neutral-500">
        <p>ID: {product.id || product.$id}</p>
        {product.$createdAt && (
          <p>Added: {new Date(product.$createdAt).toLocaleDateString()}</p>
        )}
      </div>
    </>
  );
}
