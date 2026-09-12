import { Suspense } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { ProductsHero } from "@/components/marketing/ProductsHero";
import { CustomSolutionsSection } from "@/components/products/CustomSolution";
import { ProductFilter } from "@/components/products/ProductFilters";
import { ProductGrid, ProductGridSkeleton } from "@/components/products/ProductGrid";
import { getCollections, getProducts } from "@/lib/server/products";
import type { SortOption } from "@/types/ComponentTypes";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const first = (value: string | string[] | undefined, fallback: string) =>
  (Array.isArray(value) ? value[0] : value) || fallback;

async function Catalogue({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = {
    category: first(params.category, "all"),
    collection: first(params.collection, "all"),
    q: first(params.q, ""),
    sort: first(params.sort, "featured") as SortOption,
  };

  const [products, collections] = await Promise.all([
    getProducts({ ...filters, search: filters.q }),
    getCollections(),
  ]);

  return (
    <>
      <ProductFilter filters={filters} collections={collections} />
      <ProductGrid products={products} />
    </>
  );
}

export default function ProductsPage({ searchParams }: PageProps) {
  return (
    <BaseLayout>
      <div className="min-h-screen bg-background">
        <ProductsHero />

        <Section className="bg-background">
          <SectionTitle>
            Our <span className="font-serif italic text-primary">Collection</span>
          </SectionTitle>

          <Suspense fallback={<ProductGridSkeleton />}>
            <Catalogue searchParams={searchParams} />
          </Suspense>
        </Section>

        <Section className="bg-background">
          <CustomSolutionsSection />
        </Section>
      </div>
    </BaseLayout>
  );
}
