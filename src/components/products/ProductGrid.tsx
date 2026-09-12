import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types/ComponentTypes";
import { ProductCard } from "./ProductCard";

export const ProductGridSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }, (_, index) => (
      <Card key={index} className="group relative overflow-hidden border-primary/10">
        <div className="relative aspect-4/3 w-full overflow-hidden border-b border-primary/10">
          <Skeleton className="h-full w-full rounded-none" />
        </div>
        <div className="flex flex-col gap-3 p-5">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="mt-auto border-t border-primary/10 pt-4">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
      </Card>
    ))}
  </div>
);

const EmptyState = () => (
  <Card className="w-full border-dashed border-primary/20 bg-background/50 px-8 py-12 text-center">
    <div className="mx-auto max-w-md">
      <h3 className="mb-3 font-serif text-xl font-medium">No products found</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Try adjusting your filter selections or browse our custom solutions below.
      </p>
    </div>
  </Card>
);

export const ProductGrid = ({ products }: { products: Product[] }) => {
  if (products.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
