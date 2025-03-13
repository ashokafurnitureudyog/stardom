"use client";
import React, { useState } from "react";
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

// Client component that receives the ID as a prop
interface ProductDisplayProps {
  id: string;
}

const ProductDisplay = ({ id }: ProductDisplayProps) => {
  const pathname = usePathname();
  // Use the hook to fetch product data
  const { individualProductQuery, similarProductQuery } = useProducts(id);

  // Initialize with empty string, will update when data is available
  const [selectedColor, setSelectedColor] = useState("");

  // State to track the current image index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Loading state
  if (individualProductQuery.isLoading) {
    return <ProductDetailsSkeleton />;
  }

  // Error state
  if (individualProductQuery.isError || !individualProductQuery.data) {
    return <ProductNotFound />;
  }

  // Get the current product from the query
  const currentProduct = individualProductQuery.data;
  // Get related products from the similar products query
  const relatedProducts = similarProductQuery.data || [];

  // Set selected color if it's empty and we have product data
  if (
    selectedColor === "" &&
    currentProduct.colors &&
    currentProduct.colors.length > 0
  ) {
    setSelectedColor(currentProduct.colors[0]);
  }

  // WhatsApp inquiry function
  const handleWhatsAppInquiry = () => {
    // Get the current page URL to include in the message
    const currentUrl = "https://stardom.co.in" + pathname;

    // Create the message with product details and URL
    const message = encodeURIComponent(
      `Hello, I'm interested in the ${currentProduct.name} in ${selectedColor} finish. Can you provide more information?\n\nProduct Link: ${currentUrl}`,
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
            <div className="flex items-center text-sm text-muted-foreground mb-12">
              <span>Home</span>
              <span className="mx-3">/</span>
              <span>{currentProduct.category}</span>
              <span className="mx-3">/</span>
              <span className="text-foreground">{currentProduct.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {/* Product Image Carousel */}
              <ProductImages
                images={currentProduct.images}
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
          isLoading={similarProductQuery.isLoading}
          relatedProducts={relatedProducts}
        />

        {/* Floating WhatsApp Chat Button */}
        <FloatingWhatsAppButton handleWhatsAppInquiry={handleWhatsAppInquiry} />
      </div>
    </BaseLayout>
  );
};

export default ProductDisplay;
