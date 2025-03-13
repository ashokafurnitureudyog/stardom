"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  staggerContainerVariants,
} from "@/lib/constants/AnimationConstants";
import { ProductCard } from "@/components/products/ProductCard";
import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { useProducts } from "@/hooks/useProducts";
import { usePathname } from "next/navigation";

// Client component that receives the ID as a prop
interface ProductDisplayProps {
  id: string;
}

const ProductDisplay = ({ id }: ProductDisplayProps) => {
  const pathname = usePathname();
  // Use the hook to fetch product data
  const { individualProductQuery, similarProductQuery } = useProducts(id);

  // FIXED: Move useState hook here, before any conditional returns
  // Initialize with empty string, will update when data is available
  const [selectedColor, setSelectedColor] = useState("");

  // Loading state
  if (individualProductQuery.isLoading) {
    return (
      <BaseLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </BaseLayout>
    );
  }

  // Error state
  if (individualProductQuery.isError || !individualProductQuery.data) {
    return (
      <BaseLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
            <p className="text-muted-foreground">
              The product you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
          </div>
        </div>
      </BaseLayout>
    );
  }

  // Get the current product from the query
  const currentProduct = individualProductQuery.data;
  // Get related products from the similar products query
  const relatedProducts = similarProductQuery.data || [];

  // FIXED: Set selected color if it's empty and we have product data
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
    const currentUrl = pathname;

    // Create the message with product details and URL
    const message = encodeURIComponent(
      `Hello, I'm interested in the ${currentProduct.name} in ${selectedColor} finish. Can you provide more information?\n\nProduct Link: ${currentUrl}`,
    );

    // Make sure to include country code with the phone number (assuming this is an Indonesian number)
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
              {/* Product Image */}
              <div>
                <motion.div
                  className="rounded-3xl overflow-hidden bg-card shadow-[0_0_32px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>

              {/* Product Info */}
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="mb-6">
                  <span className="text-sm text-primary font-medium tracking-wide uppercase">
                    {currentProduct.collection}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-serif mb-8">
                  {currentProduct.name}
                </h1>

                <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
                  {currentProduct.description}
                </p>

                {/* Features */}
                <div className="mb-12">
                  <h3 className="text-xl font-serif italic text-primary mb-6">
                    Features
                  </h3>
                  <ul className="space-y-3">
                    {currentProduct.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-muted-foreground flex items-center"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full mr-4"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Colors */}
                <div className="mb-14">
                  <h3 className="text-xl font-serif italic text-primary mb-6">
                    Available Colors
                  </h3>
                  <div className="flex gap-4">
                    {currentProduct.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`px-5 py-2.5 border rounded-full text-sm transition-colors cursor-pointer
                          ${
                            selectedColor === color
                              ? "border-primary text-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Inquiry Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-4"
                >
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5C] text-white py-4 px-6 rounded-full transition-all shadow-md hover:shadow-lg w-full md:w-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="font-medium">Inquire on WhatsApp</span>
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Related Products Section */}
        <Section className="bg-card py-32">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <SectionTitle>
              You May Also{" "}
              <span className="font-serif italic text-primary">Like</span>
            </SectionTitle>

            {similarProductQuery.isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : relatedProducts.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainerVariants}
              >
                {relatedProducts.map((product) => (
                  <motion.div key={product.id} variants={fadeInUpVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-center text-muted-foreground py-20">
                No related products found
              </p>
            )}
          </div>
        </Section>

        {/* Floating WhatsApp Chat Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.3,
            type: "spring",
            stiffness: 200,
          }}
        >
          <button
            onClick={handleWhatsAppInquiry}
            className="bg-[#25D366] hover:bg-[#20BD5C] text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            aria-label="Chat on WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
        </motion.div>
      </div>
    </BaseLayout>
  );
};

export default ProductDisplay;
