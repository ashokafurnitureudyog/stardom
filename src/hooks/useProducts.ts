import { productService } from "@/lib/mock/mockAPI";
import { useProductStore } from "@/lib/store/ProductStore";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useProducts = () => {
  // Get filters from Zustand store
  const { filters, setFilter, resetFilters } = useProductStore();

  // Fetch products
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });

  // Fetch categories
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
  });

  // Fetch collections
  const collectionsQuery = useQuery({
    queryKey: ["collections"],
    queryFn: productService.getCollections,
  });

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    if (!productsQuery.data) return [];

    return productService.filterProducts(
      productsQuery.data,
      filters.selectedCategory,
      filters.selectedCollection,
    );
  }, [
    productsQuery.data,
    filters.selectedCategory,
    filters.selectedCollection,
  ]);

  // Filter by category handler
  const filterByCategory = (category: string) => {
    setFilter("category", category);
  };

  // Filter by collection handler
  const filterByCollection = (collection: string) => {
    setFilter("collection", collection);
  };

  return {
    products: productsQuery.data || [],
    filteredProducts,
    categories: categoriesQuery.data || [],
    collections: collectionsQuery.data || [],
    isLoading:
      productsQuery.isLoading ||
      categoriesQuery.isLoading ||
      collectionsQuery.isLoading,
    filterByCategory,
    filterByCollection,
    resetFilters,
    filters,
  };
};
