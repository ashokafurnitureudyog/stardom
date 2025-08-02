import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import {
  fadeInUpVariants,
  staggerContainerVariants,
} from "@/lib/constants/AnimationConstants";

export const ProductGrid: React.FC = () => {
  const { filteredProducts, isLoading } = useProducts();

  // Loading state with shadcn/ui components
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <Card
            key={i}
            className="group relative overflow-hidden border-primary/10"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Product image skeleton */}
            <div className="aspect-[4/3] w-full relative overflow-hidden border-b border-primary/10">
              <Skeleton className="h-full w-full rounded-none" />
              {/* Badge skeleton */}
              <div className="absolute bottom-2 left-2 z-10">
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>

            {/* Content skeleton */}
            <div className="p-5 flex flex-col gap-3">
              {/* Title skeleton */}
              <Skeleton className="h-6 w-3/4" />
              {/* Description skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              {/* Button skeleton */}
              <div className="mt-auto pt-4 border-t border-primary/10">
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Empty state with shadcn/ui components
  if (filteredProducts.length === 0) {
    return (
      <Card className="w-full py-12 px-8 text-center border-dashed border-primary/20 bg-background/50 =">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mx-auto mb-8 w-20 h-20">
            {/* Subtle glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full blur-md animate-pulse" />

            {/* Icon container */}
            <div className="relative flex items-center justify-center w-full h-full bg-background border border-primary/10 rounded-full">
              <svg
                className="w-8 h-8 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 9h.01" />
                <path d="M15 9h.01" />
                <path d="M9 15a3 3 0 0 0 6 0" />
              </svg>
            </div>
          </div>

          <motion.h3
            className="text-xl font-medium mb-3 font-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            No products found
          </motion.h3>

          <motion.p
            className="text-muted-foreground text-sm mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Try adjusting your filter selections or browse our custom solutions
            below.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          ></motion.div>
        </motion.div>
      </Card>
    );
  }

  // Product grid with results
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
