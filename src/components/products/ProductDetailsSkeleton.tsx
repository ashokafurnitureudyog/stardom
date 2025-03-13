import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductDetailsSkeleton = () => {
  return (
    <BaseLayout>
      <div className="min-h-screen">
        <Section className="pt-24 pb-32">
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
            <div className="flex items-center text-sm text-muted-foreground mb-12">
              <Skeleton className="h-4 w-16" />
              <span className="mx-3">/</span>
              <Skeleton className="h-4 w-24" />
              <span className="mx-3">/</span>
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {/* Product Image Skeleton */}
              <div>
                <Skeleton className="w-full h-[400px] rounded-3xl" />
              </div>

              {/* Product Info Skeleton */}
              <div className="flex flex-col justify-center space-y-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-24 w-full" />

                {/* Features Skeleton */}
                <div className="space-y-4">
                  <Skeleton className="h-8 w-32" />
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                </div>

                {/* Colors Skeleton */}
                <div className="space-y-4">
                  <Skeleton className="h-8 w-40" />
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-20 rounded-full" />
                    <Skeleton className="h-10 w-20 rounded-full" />
                    <Skeleton className="h-10 w-20 rounded-full" />
                  </div>
                </div>

                {/* Button Skeleton */}
                <Skeleton className="h-14 w-full md:w-2/3 rounded-full" />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </BaseLayout>
  );
};
