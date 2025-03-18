import { productService } from "@/lib/mock/mockAPI";
import { useProductStore } from "@/lib/store/ProductStore";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { SortOption } from "@/types/ComponentTypes";

/**
 * Hook for managing product data, filtering, sorting, and searching
 * @param productId - Optional ID to fetch a specific product
 */
export const useProducts = (productId?: string) => {
  // Get filters from Zustand store
  const {
    filters,
    searchQuery,
    sortOption,
    setFilter,
    setSearchQuery,
    setSortOption,
    resetFilters,
  } = useProductStore();

  // Fetch products with proper error handling and caching
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Fetch categories with proper error handling and caching
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  // Fetch collections with proper error handling and caching
  const collectionsQuery = useQuery({
    queryKey: ["collections"],
    queryFn: productService.getCollections,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  // Fetch individual product details
  const individualProductQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProductById(productId || ""),
    enabled: !!productId,
    staleTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
  });

  // Fetch similar products
  const similarProductQuery = useQuery({
    queryKey: ["similarProducts", productId],
    queryFn: () => productService.getSimilarProducts(productId || ""),
    enabled: !!productId,
    staleTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
  });

  // Filter products based on current filters, search, and sort
  const filteredProducts = useMemo(() => {
    if (!productsQuery.data) return [];

    return productService.filterProducts(
      productsQuery.data,
      filters.selectedCategory,
      filters.selectedCollection,
      searchQuery,
      sortOption,
    );
  }, [
    productsQuery.data,
    filters.selectedCategory,
    filters.selectedCollection,
    searchQuery,
    sortOption,
  ]);

  // Handlers
  const filterByCategory = (category: string) =>
    setFilter("category", category);
  const filterByCollection = (collection: string) =>
    setFilter("collection", collection);
  const handleSearch = (query: string) => setSearchQuery(query);
  const handleSort = (option: SortOption) => setSortOption(option);

  // Sort options
  const sortOptions = [
    { value: "featured" as const, label: "Featured" },
    { value: "name-a-z" as const, label: "Name: A to Z" },
    { value: "name-z-a" as const, label: "Name: Z to A" },
    // Add more sort options as needed
  ];

  return {
    // Data
    products: productsQuery.data || [],
    filteredProducts,
    categories: categoriesQuery.data || [],
    collections: collectionsQuery.data || [],

    // Loading states
    isLoading:
      productsQuery.isLoading ||
      categoriesQuery.isLoading ||
      collectionsQuery.isLoading,
    isProductLoading: individualProductQuery.isLoading,
    isSimilarProductsLoading: similarProductQuery.isLoading,

    // Error states
    error:
      productsQuery.error || categoriesQuery.error || collectionsQuery.error,
    productError: individualProductQuery.error,

    // Actions
    filterByCategory,
    filterByCollection,
    handleSearch,
    handleSort,
    sortOptions,
    resetFilters,

    // State
    filters,
    searchQuery,
    sortOption,

    // Queries (for direct access if needed)
    productsQuery,
    categoriesQuery,
    collectionsQuery,
    individualProductQuery,
    similarProductQuery,
  };
};
