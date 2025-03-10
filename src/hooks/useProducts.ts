import { productService } from "@/lib/mock/mockAPI";
import { useProductStore } from "@/lib/store/ProductStore";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { SortOption } from "@/types/ComponentTypes";

export const useProducts = () => {
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

  // Filter by category handler
  const filterByCategory = (category: string) => {
    setFilter("category", category);
  };

  // Filter by collection handler
  const filterByCollection = (collection: string) => {
    setFilter("collection", collection);
  };

  // Search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Sort handler
  const handleSort = (option: SortOption) => {
    setSortOption(option);
  };

  // Sort options
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "featured", label: "Featured" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "name-a-z", label: "Name: A to Z" },
    { value: "name-z-a", label: "Name: Z to A" },
    { value: "rating-high-low", label: "Highest Rated" },
  ];

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
    handleSearch,
    handleSort,
    sortOptions,
    resetFilters,
    filters,
    searchQuery,
    sortOption,
  };
};
