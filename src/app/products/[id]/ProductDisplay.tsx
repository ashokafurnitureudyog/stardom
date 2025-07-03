"use client";
import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { useProducts } from "@/hooks/useProducts";
import { usePathname } from "next/navigation";
import { ProductDetailsSkeleton } from "@/components/products/ProductDetailsSkeleton";
import { ProductNotFound } from "@/components/products/ProductNotFound";
import { ProductImages } from "@/components/products/ProductDetailsImageCarousel";
import { ProductInfo } from "@/components/products/ProductInfo";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { FloatingWhatsAppButton } from "@/components/products/FloatingWhatsappButton";
import { Product } from "@/types/ComponentTypes";

// Client component that receives the ID and initialProduct as props
interface ProductDisplayProps {
  id: string;
  initialProduct?: Product;
}

const ProductDisplay = ({ id, initialProduct }: ProductDisplayProps) => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // Set initialProduct in React Query cache if provided
  useEffect(() => {
    if (initialProduct) {
      queryClient.setQueryData(["product", id], initialProduct);
    }
  }, [initialProduct, id, queryClient]);

  // Use the existing hook to fetch product data
  const { individualProductQuery, similarProductQuery } = useProducts(id);

  // Initialize selected color from initialProduct or wait for data to load
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Update selectedColor when product data becomes available
  useEffect(() => {
    const currentProduct = initialProduct || individualProductQuery.data;
    if (currentProduct?.colors?.length && selectedColor === "") {
      setSelectedColor(currentProduct.colors[0]);
    }
  }, [initialProduct, individualProductQuery.data, selectedColor]);

  // State to track the current image index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset image index when product changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [id]);

  // Determine the current product - prioritize initialProduct to avoid hydration issues
  const currentProduct = initialProduct || individualProductQuery.data;

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

  // We shouldn't reach here without a product, but just in case
  if (!currentProduct) {
    return <ProductNotFound />;
  }

  // Get related products from the similar products query
  const relatedProducts = similarProductQuery.data || [];

  // WhatsApp inquiry function
  const handleWhatsAppInquiry = () => {
    // Get the current page URL to include in the message
    const currentUrl = "https://stardom.co.in" + pathname;

    // Create the message with product details and URL
    const message = encodeURIComponent(
      `Hello, I'm interested in the ${currentProduct.name} ${
        selectedColor ? `in ${selectedColor} finish` : ""
      }. Can you provide more information?\n\nProduct Link: ${currentUrl}`,
    );

    // Make sure to include country code with the phone number
    const phoneNumber = "+916284673783";

    // Open WhatsApp with the formatted message
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <BaseLayout className="overflow-x-hidden lg:overflow-auto">
      <div className="min-h-screen bg-background font-sans">
        {/* Hero Section */}
        <Section className="pt-24 pb-32">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-12">
              <span>Products</span>
              <span className="mx-3">/</span>
              <span className="capitalize">{currentProduct.category}</span>
              <span className="mx-3">/</span>
              <span className="text-foreground">{currentProduct.name}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {/* Product Image Carousel */}
              <ProductImages
                images={currentProduct.images || []}
                productName={currentProduct.name}
                activeImageIndex={activeImageIndex}
                setActiveImageIndex={setActiveImageIndex}
              />

              {/* Product Info */}
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
          isLoading={
            similarProductQuery.isLoading && relatedProducts.length === 0
          }
          relatedProducts={relatedProducts}
        />

        {/* Floating WhatsApp Chat Button */}
        <FloatingWhatsAppButton handleWhatsAppInquiry={handleWhatsAppInquiry} />
      </div>
    </BaseLayout>
  );
};

export default ProductDisplay;
