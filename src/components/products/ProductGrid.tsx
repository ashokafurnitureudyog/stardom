import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types/ComponentTypes";
import { ProductCard } from "./ProductCard";

export const ProductGridSkeleton = () => (
  <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="flex flex-col border-t border-border/60 pt-5">
        <Skeleton className="aspect-4/3 w-full rounded-none" />
        <Skeleton className="mt-5 h-7 w-2/3" />
        <Skeleton className="mt-3 h-4 w-1/3" />
        <Skeleton className="mt-4 h-4 w-full" />
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="border-t border-border/60 py-20 text-center">
    <p className="font-serif text-2xl text-foreground">Nothing in this series yet</p>
    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
      New pieces are added as they come off the line. Clear the filters to see the whole range, or
      tell us what you need and we will make it.
    </p>
  </div>
);

export const ProductGrid = ({ products }: { products: Product[] }) => {
  if (products.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
