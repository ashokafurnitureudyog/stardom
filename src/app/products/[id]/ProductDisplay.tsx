"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  fadeInUpVariants,
  staggerContainerVariants,
} from "@/lib/constants/AnimationConstants";
import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/types/ComponentTypes";
import BaseLayout from "@/components/layout/BaseLayout";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";

// Mock current product with the correct interface
const mockCurrentProduct: Product = {
  id: 1,
  name: "Artisan Ceramic Vase",
  description:
    "Handcrafted ceramic vase with a unique glaze finish. Perfect for modern interiors and complementing any decor style.",
  price: 129.99,
  category: "Home Decor",
  collection: "Artisan Series",
  image:
    "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  features: [
    "Handcrafted",
    "Unique glaze finish",
    "Durable ceramic",
    "Versatile placement options",
  ],
  colors: ["Terracotta", "Navy Blue", "Cream"],
  inStock: true,
  rating: 4.9,
};

// Mock related products with the correct interface
const mockRelatedProducts: Product[] = [
  {
    id: 2,
    name: "Modern Ceramic Bowl",
    description: "Minimalist ceramic bowl perfect for serving or decoration.",
    price: 79.99,
    category: "Home Decor",
    collection: "Artisan Series",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    features: ["Food safe", "Dishwasher safe", "Modern design"],
    colors: ["White", "Black", "Sage Green"],
    inStock: true,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Handwoven Basket Set",
    description: "Set of three handwoven baskets in graduated sizes.",
    price: 149.99,
    category: "Home Decor",
    collection: "Natural Living",
    image:
      "https://images.unsplash.com/photo-1619066045029-5c7e8537bd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    features: ["Natural materials", "Ethically sourced", "Versatile storage"],
    colors: ["Natural"],
    inStock: true,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Minimalist Table Lamp",
    description:
      "Clean-lined table lamp with adjustable arm and warm lighting.",
    price: 189.99,
    category: "Lighting",
    collection: "Modern Essentials",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    features: ["Adjustable", "Energy efficient", "Dimmable"],
    colors: ["Black", "Brass", "White"],
    inStock: true,
    rating: 4.9,
  },
];

// Client component that receives the ID as a prop
interface ProductDisplayProps {
  id: string;
}

const ProductDisplay = ({ id }: ProductDisplayProps) => {
  // In a real app, you'd use id to fetch data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const productId = id;
  const currentProduct = mockCurrentProduct;
  const relatedProducts = mockRelatedProducts;

  return (
    <BaseLayout className="overflow-x-hidden lg:overflow-auto">
      <div className="min-h-screen bg-background font-sans">
        {/* Hero Section */}
        <Section className="pt-16 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-muted-foreground mb-8">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span>{currentProduct.category}</span>
              <span className="mx-2">/</span>
              <span className="text-foreground">{currentProduct.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Product Image */}
              <div>
                <motion.div
                  className="rounded-2xl overflow-hidden bg-card shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
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
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-4">
                  <span className="text-sm text-primary font-medium tracking-wide uppercase">
                    {currentProduct.collection}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-light font-serif mb-6">
                  {currentProduct.name}
                </h1>

                <p className="text-xl font-light mb-8">
                  ${currentProduct.price.toFixed(2)}
                </p>

                <div className="flex items-center mb-8">
                  <div className="flex mr-3">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${i < Math.floor(currentProduct.rating) ? "text-primary" : "text-muted-foreground/20"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {currentProduct.rating} rating
                  </span>
                </div>

                <p className="text-muted-foreground text-lg mb-10">
                  {currentProduct.description}
                </p>

                {/* Features */}
                <div className="mb-10">
                  <h3 className="text-lg font-serif italic text-primary mb-4">
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {currentProduct.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-muted-foreground flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Colors */}
                <div className="mb-12">
                  <h3 className="text-lg font-serif italic text-primary mb-4">
                    Available Colors
                  </h3>
                  <div className="flex gap-3">
                    {currentProduct.colors.map((color, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 border border-border rounded-full text-sm hover:border-primary transition-colors"
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    className={`flex-1 h-14 tracking-wide ${
                      !currentProduct.inStock
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={!currentProduct.inStock}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {currentProduct.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button variant="outline" size="icon" className="h-14 w-14">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Related Products Section */}
        <Section className="bg-card py-24">
          <div className="container mx-auto px-4">
            <SectionTitle>
              You May Also{" "}
              <span className="font-serif italic text-primary">Like</span>
            </SectionTitle>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainerVariants}
            >
              {relatedProducts.map((product) => (
                <motion.div key={product.id} variants={fadeInUpVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>
      </div>
    </BaseLayout>
  );
};

export default ProductDisplay;
