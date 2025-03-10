import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts } from "@/hooks/useProducts";

export const ProductFilter: React.FC = () => {
  const {
    categories,
    collections,
    filters: { selectedCategory, selectedCollection },
    filterByCategory,
    filterByCollection,
  } = useProducts();

  return (
    <div className="mb-12">
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-6">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
              onClick={() => filterByCategory("all")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => filterByCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collections" className="mt-6">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCollection === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
              onClick={() => filterByCollection("all")}
            >
              All
            </button>
            {collections.map((collection) => (
              <button
                key={collection}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCollection === collection
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => filterByCollection(collection)}
              >
                {collection.charAt(0).toUpperCase() + collection.slice(1)}
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
