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

  /**
   * Set default selected color when product data becomes available
   */
  useEffect(() => {
    const currentProduct = initialProduct || individualProductQuery.data;
    if (currentProduct?.colors?.length && selectedColor === "") {
      setSelectedColor(currentProduct.colors[0]);
    }
  }, [initialProduct, individualProductQuery.data, selectedColor]);

  /**
   * Reset active image index when product ID changes
   */
  useEffect(() => {
    setActiveImageIndex(0);
  }, [id]);

  // Current product data - prioritize SSR data to avoid hydration issues
  const currentProduct = initialProduct || individualProductQuery.data;

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

  return (
    <ErrorBoundary fallback={<ProductNotFound />}>
      <BaseLayout className="overflow-x-hidden lg:overflow-auto">
        <div className="min-h-screen bg-background font-sans">
          {/* Hero Section with Product Details */}
          <Section className="pt-24 pb-32">
            <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
              {/* Breadcrumb Navigation */}
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center text-sm text-muted-foreground mb-12"
              >
                <span>Products</span>
                <span className="mx-3" aria-hidden="true">
                  /
                </span>
                <span className="capitalize">{currentProduct.category}</span>
                <span className="mx-3" aria-hidden="true">
                  /
                </span>
                <span className="text-foreground" aria-current="page">
                  {currentProduct.name}
                </span>
              </nav>

              {/* Product Display Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {/* Product Image Gallery */}
                <ProductImages
                  images={currentProduct.images || []}
                  productName={currentProduct.name}
                  activeImageIndex={activeImageIndex}
                  setActiveImageIndex={setActiveImageIndex}
                />

                {/* Product Information */}
                <ProductInfo
                  product={currentProduct}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  handleWhatsAppInquiry={handleWhatsAppInquiry}
                />
              </div>
            </div>
          </Section>

          {/* Related Products Section */}
          <RelatedProducts
            isLoading={isLoadingRelatedProducts}
            relatedProducts={relatedProducts}
          />

          {/* Floating WhatsApp Button */}
          <FloatingWhatsAppButton
            handleWhatsAppInquiry={handleWhatsAppInquiry}
          />
        </div>
      </BaseLayout>
    </ErrorBoundary>
  );
};

export default ProductDisplay;
