import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fadeInUpVariants,
  staggerContainerVariants,
} from "@/lib/constants/AnimationConstants";

export const ProductGrid: React.FC = () => {
  const { filteredProducts, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="group relative">
            {/* Glow effect containers (simplified for skeleton) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-lg blur-lg" />
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg blur-sm" />

            <div className="relative overflow-hidden bg-background/95 border border-primary/10 rounded-lg h-full flex flex-col">
              {/* Image carousel skeleton */}
              <div className="aspect-[4/3] w-full relative overflow-hidden">
                <Skeleton className="h-full w-full rounded-none" />
                {/* Badge skeleton */}
                <div className="absolute bottom-0 left-0 p-3 z-10">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>

              {/* Content skeleton */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Title skeleton */}
                <Skeleton className="h-7 w-3/4 mb-2" />
                {/* Description skeleton */}
                <Skeleton className="h-4 w-full mt-2 mb-1" />
                <Skeleton className="h-4 w-2/3 mb-8" />

                {/* Button skeleton */}
                <div className="mt-auto pt-4 border-t border-primary/10">
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
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
