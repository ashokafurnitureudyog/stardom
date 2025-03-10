"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { ProductsHero } from "@/components/marketing/ProductsHero";
import { ProductFilter } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CustomSolutionsSection } from "@/components/products/CustomSolution";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function ProductsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BaseLayout>
        <div className="min-h-screen bg-background">
          <ProductsHero />

          <Section className="bg-background">
            <SectionTitle>
              Our{" "}
              <span className="font-serif italic text-primary">Collection</span>
            </SectionTitle>

            <ProductFilter />
            <ProductGrid />
          </Section>

          <Section className="bg-background">
            <CustomSolutionsSection />
          </Section>
        </div>
      </BaseLayout>
    </QueryClientProvider>
  );
}
