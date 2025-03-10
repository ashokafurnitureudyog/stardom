import React from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";
import {
  fadeInUpVariants,
  staggerContainerVariants,
} from "@/lib/constants/AnimationConstants";

export const ProductGrid: React.FC = () => {
  const { filteredProducts, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px] place-items-center">
        <div className="col-span-full text-center text-muted-foreground">
          Loading products...
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-light mb-4">No products found</h3>
        <p className="text-muted-foreground">
          Try changing your filter selections or browse our custom solutions
          below.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
    >
      {filteredProducts.map((product) => (
        <motion.div key={product.id} variants={fadeInUpVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};
