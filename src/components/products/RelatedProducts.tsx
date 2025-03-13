import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { ProductCard } from "@/components/products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fadeInUpVariants,
  staggerContainerVariants,
} from "@/lib/constants/AnimationConstants";
import { Product } from "@/types/ComponentTypes";

interface RelatedProductsProps {
  isLoading: boolean;
  relatedProducts: Product[];
}

export const RelatedProducts = ({
  isLoading,
  relatedProducts,
}: RelatedProductsProps) => {
  return (
    <Section className="bg-card py-32">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <SectionTitle>
          You May Also{" "}
          <span className="font-serif italic text-primary">Like</span>
        </SectionTitle>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex flex-col space-y-4">
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-10 w-1/3" />
              </div>
            ))}
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
  );
};
