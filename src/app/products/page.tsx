"use client";
import { useState, useEffect } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import { ProductCard } from "@/components/products/ProductCard";
import { SearchAndView } from "@/components/products/SearchAndView";
import { categories, products } from "@/lib/constants/ProductData";
import { cn } from "@/lib/utils";
import { ProductsHero } from "@/components/marketing/ProductsHero";
import { CategoryFilters } from "@/components/products/CategoryFilter";

export default function ProductsPage() {
  const [selectedMain, setSelectedMain] = useState("all");
  const [selectedSub, setSelectedSub] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let filtered = products;

    if (selectedMain !== "all") {
      filtered = filtered.filter((p) => p.mainCategory === selectedMain);

      if (selectedSub !== "all") {
        filtered = filtered.filter((p) => p.subCategory === selectedSub);
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedMain, selectedSub, searchQuery]);

  return (
    <BaseLayout>
      <div className="min-h-screen bg-background">
        <ProductsHero />

        <CategoryFilters
          categories={categories}
          selectedMain={selectedMain}
          selectedSub={selectedSub}
          onMainSelect={(id) => {
            setSelectedMain(id);
            setSelectedSub("all");
          }}
          onSubSelect={setSelectedSub}
        />

        <SearchAndView
          searchQuery={searchQuery}
          viewMode={viewMode}
          onSearchChange={setSearchQuery}
          onViewChange={setViewMode}
        />

        <main className="max-w-7xl mx-auto px-6 py-12">
          <div
            className={cn(
              "grid gap-8",
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            )}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        </main>
      </div>
    </BaseLayout>
  );
}
