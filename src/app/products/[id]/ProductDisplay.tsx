"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { useProducts } from "@/hooks/useProducts";
import { ProductDetailsSkeleton } from "@/components/products/ProductDetailsSkeleton";
import { ProductNotFound } from "@/components/products/ProductNotFound";
import { ProductImages } from "@/components/products/ProductDetailsImageCarousel";
import { ProductGalleryDesktop } from "@/components/products/ProductGalleryDesktop";
import { ProductInfo } from "@/components/products/ProductInfo";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { FloatingWhatsAppButton } from "@/components/products/FloatingWhatsappButton";
import { Product } from "@/types/ComponentTypes";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

/**
 * Props for the ProductDisplay component
 *
 * @interface ProductDisplayProps
 */
interface ProductDisplayProps {
  /** Product unique identifier */
  id: string;
  /** Initial product data from server-side rendering (optional) */
  initialProduct?: Product;
}

/**
 * Client component for displaying product details
 *
 * Handles product data fetching, image carousel, color selection,
 * related products, and WhatsApp inquiry functionality.
 *
 * @param {ProductDisplayProps} props - Component props
 * @returns {JSX.Element} Rendered product display component
 */
const ProductDisplay: React.FC<ProductDisplayProps> = ({
  id,
  initialProduct,
}) => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // State for selected product color and active image index
  // Empty string means "All Colors" is selected (default)
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Use React Query to fetch product data
  const { individualProductQuery, similarProductQuery } = useProducts(id);

  /**
   * Initialize React Query cache with server-provided data to prevent refetching
   */
  useEffect(() => {
    if (initialProduct) {
      queryClient.setQueryData(["product", id], initialProduct);
    }
  }, [id, initialProduct, queryClient]);

  // Current product data - prioritize SSR data to avoid hydration issues
  const currentProduct = initialProduct || individualProductQuery.data;

  // Parse image color mapping
  const imageColorMapping = React.useMemo(() => {
    if (!currentProduct?.image_color_mapping) return {};
    try {
      return JSON.parse(currentProduct.image_color_mapping);
    } catch {
      return {};
    }
  }, [currentProduct]);

  // Filter images based on selected color
  // Show images that are:
  // 1. Mapped to the selected color
  // 2. OR Not mapped to any color (common images)
  const filteredImages = React.useMemo(() => {
    if (!currentProduct?.images) return [];

    // If no color selected ("All Colors"), return all images
    if (!selectedColor) return currentProduct.images;

    // Type casting for Record<string, string>
    const mapping = imageColorMapping as Record<string, string>;

    return currentProduct.images.filter((img: string) => {
      // Try exact match first
      let mappedColor = mapping[img];

      // If not found, try looking up via decoded URL (in case validation encoded it differently)
      if (!mappedColor) {
        try {
          // Check if any key in mapping matches the decoded img
          const decodedImg = decodeURIComponent(img);
          mappedColor = mapping[decodedImg];

          // If still not found, try robust generic matching (ignoring query params)
          if (!mappedColor) {
            // 1. Try matching by "clean" URL (stripping query params)
            const cleanImgUrl = img.split("?")[0];
            const matchingKey = Object.keys(mapping).find(
              (key) => key.split("?")[0] === cleanImgUrl,
            );

            // 2. If that fails, try Appwrite/Generic ID matching (fallback)
            if (matchingKey) {
              mappedColor = mapping[matchingKey];
            } else {
              // Fallback: Check if the key is contained in the URL or vice versa
              // This helps with different domain structures or slight path variations
              const fuzzyKey = Object.keys(mapping).find(
                (key) =>
                  img.includes(key) ||
                  key.includes(img) ||
                  (cleanImgUrl.length > 20 && key.includes(cleanImgUrl)),
              );
              if (fuzzyKey) mappedColor = mapping[fuzzyKey];
            }
          }
        } catch (e) {}
      }

      // If image is mapped to a color, it must match the selected color.
      // If image is NOT mapped (undefined), show it for all colors.
      return !mappedColor || mappedColor === selectedColor;
    });
  }, [currentProduct?.images, selectedColor, imageColorMapping]);
  useEffect(() => {
    setActiveImageIndex(0);
  }, [id, selectedColor]);

  // Related products data
  const relatedProducts = similarProductQuery.data || [];
  const isLoadingRelatedProducts =
    similarProductQuery.isLoading && relatedProducts.length === 0;

  /**
   * Handle WhatsApp inquiry for the current product
   * Creates a pre-formatted message with product details and opens WhatsApp
   */
  const handleWhatsAppInquiry = useCallback(() => {
    if (!currentProduct) return;

    const currentUrl = `https://stardom.co.in${pathname}`;
    const message = encodeURIComponent(
      `Hello, I'm interested in the ${currentProduct.name} ${
        selectedColor ? `in ${selectedColor} finish` : ""
      }. Can you provide more information?\n\nProduct Link: ${currentUrl}`,
    );

    // Business WhatsApp number with country code
    const phoneNumber = "+916284673783";

    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  }, [currentProduct, pathname, selectedColor]);

  // Loading state - only show if we don't have initialProduct
  if (!currentProduct && individualProductQuery.isLoading) {
    return <ProductDetailsSkeleton />;
  }

  // Error state - only show if we don't have initialProduct
  if (
    !currentProduct &&
    (individualProductQuery.isError || !individualProductQuery.data)
  ) {
    return <ProductNotFound />;
  }

  // Fallback for unexpected state - should not normally be reached
  if (!currentProduct) {
    return <ProductNotFound />;
  }

  const isDesktop = React.useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 1024px)").matches;
  }, []);

  return (
    <ErrorBoundary fallback={<ProductNotFound />}>
      <BaseLayout className="bg-background">
        <div className="min-h-screen font-sans selection:bg-primary selection:text-primary-foreground">
          <Section className="pt-24 pb-32">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px]">
              {/* Refined Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center text-xs md:text-sm tracking-wider uppercase text-muted-foreground/60 mb-8 md:mb-16 font-medium"
              >
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Home
                </span>
                <span className="mx-3 text-muted-foreground/40">/</span>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Products
                </span>
                <span className="mx-3 text-muted-foreground/40">/</span>
                <span className="text-foreground">{currentProduct.name}</span>
              </nav>

              <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
                {/* Product Gallery - Desktop (Sticky List) & Mobile (Carousel) */}
                <div className="lg:col-span-8 mb-12 lg:mb-0">
                  <div className="hidden lg:block">
                    <ProductGalleryDesktop
                      images={filteredImages}
                      productName={currentProduct.name}
                    />
                  </div>
                  <div className="lg:hidden">
                    <ProductImages
                      images={filteredImages}
                      productName={currentProduct.name}
                      activeImageIndex={activeImageIndex}
                      setActiveImageIndex={setActiveImageIndex}
                    />
                  </div>
                </div>

                {/* Product Info - Sticky on Desktop */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 relative z-10 p-1">
                  <ProductInfo
                    product={currentProduct}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    handleWhatsAppInquiry={handleWhatsAppInquiry}
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* Related Products Section with extra spacing/styling */}
          <div className="border-t border-border bg-background/50 backdrop-blur-sm">
            <RelatedProducts
              isLoading={isLoadingRelatedProducts}
              relatedProducts={relatedProducts}
            />
          </div>

          <FloatingWhatsAppButton
            handleWhatsAppInquiry={handleWhatsAppInquiry}
          />
        </div>
      </BaseLayout>
    </ErrorBoundary>
  );
};

export default ProductDisplay;
