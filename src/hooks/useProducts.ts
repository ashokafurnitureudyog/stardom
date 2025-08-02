/**
 * Custom hook for managing product data, filtering, sorting, and searching
 * @module useProducts
 */
import { useProductStore } from "@/lib/store/ProductStore";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Product, SortOption } from "@/types/ComponentTypes";
import { productService } from "@/lib/services/productService";

/**
 * Sort option configuration
 */
export const SORT_OPTIONS = [
  { value: "featured" as const, label: "Featured" },
  { value: "name-a-z" as const, label: "Name: A to Z" },
  { value: "name-z-a" as const, label: "Name: Z to A" },
] as const;

/**
 * Cache configuration in milliseconds
 */
const CACHE_CONFIG = {
  PRODUCTS_STALE_TIME: 5 * 60 * 1000, // 5 minutes
  METADATA_STALE_TIME: 10 * 60 * 1000, // 10 minutes
  PRODUCT_DETAILS_STALE_TIME: 3 * 60 * 1000, // 3 minutes
  DEFAULT_RETRY_COUNT: 2,
};

/**
 * Interface for the return value of useProducts
 */
interface UseProductsReturn {
  // Data
  products: Product[];
  filteredProducts: Product[];
  featuredProducts: Product[];
  categories: string[];
  collections: string[];
  product?: Product;
  similarProducts: Product[];

  // Loading states
  isLoading: boolean;
  isFeaturedLoading: boolean;
  isProductLoading: boolean;
  isSimilarProductsLoading: boolean;

  // Error states
  error: Error | null;
  featuredError: Error | null;
  productError: Error | null;

  // Actions
  filterByCategory: (category: string) => void;
  filterByCollection: (collection: string) => void;
  handleSearch: (query: string) => void;
  handleSort: (option: SortOption) => void;
  sortOptions: typeof SORT_OPTIONS;
  resetFilters: () => void;

  // State
  filters: {
    selectedCategory: string;
    selectedCollection: string;
  };
  searchQuery: string;
  sortOption: SortOption;

  // Query objects (for advanced use cases)
  productsQuery: ReturnType<typeof useQuery<Product[], Error>>;
  featuredProductsQuery: ReturnType<typeof useQuery<Product[], Error>>;
  categoriesQuery: ReturnType<typeof useQuery<string[], Error>>;
  collectionsQuery: ReturnType<typeof useQuery<string[], Error>>;
  individualProductQuery: ReturnType<
    typeof useQuery<Product | undefined, Error>
  >;
  similarProductQuery: ReturnType<typeof useQuery<Product[], Error>>;
}

/**
 * Custom hook for managing product data, filtering, sorting, and searching
 * @param productId - Optional ID to fetch a specific product
 * @returns Object containing product data, loading states, error states, and methods
 */
export const useProducts = (productId?: string): UseProductsReturn => {
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
    staleTime: CACHE_CONFIG.PRODUCTS_STALE_TIME,
    retry: CACHE_CONFIG.DEFAULT_RETRY_COUNT,
  });

  // Fetch featured products
  const featuredProductsQuery = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: productService.getFeaturedProducts,
    staleTime: CACHE_CONFIG.PRODUCTS_STALE_TIME,
    retry: CACHE_CONFIG.DEFAULT_RETRY_COUNT,
  });

  // Categories are derived from products
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
    staleTime: CACHE_CONFIG.METADATA_STALE_TIME,
    retry: CACHE_CONFIG.DEFAULT_RETRY_COUNT,
    enabled: !!productsQuery.data, // Only run after products are loaded
  });

  // Collections are derived from products
  const collectionsQuery = useQuery({
    queryKey: ["collections"],
    queryFn: productService.getCollections,
    staleTime: CACHE_CONFIG.METADATA_STALE_TIME,
    retry: CACHE_CONFIG.DEFAULT_RETRY_COUNT,
    enabled: !!productsQuery.data, // Only run after products are loaded
  });

  // Fetch individual product details if productId is provided
  const individualProductQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProductById(productId || ""),
    enabled: !!productId,
    staleTime: CACHE_CONFIG.PRODUCT_DETAILS_STALE_TIME,
    retry: CACHE_CONFIG.DEFAULT_RETRY_COUNT,
  });

  // Fetch similar products if productId is provided
  const similarProductQuery = useQuery({
    queryKey: ["similarProducts", productId],
    queryFn: () => productService.getSimilarProducts(productId || ""),
    enabled: !!productId,
    staleTime: CACHE_CONFIG.PRODUCT_DETAILS_STALE_TIME,
    retry: CACHE_CONFIG.DEFAULT_RETRY_COUNT,
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

  // Handler functions to update filters
  const filterByCategory = (category: string) =>
    setFilter("category", category);
  const filterByCollection = (collection: string) =>
    setFilter("collection", collection);
  const handleSearch = (query: string) => setSearchQuery(query);
  const handleSort = (option: SortOption) => setSortOption(option);

  return {
    // Data
    products: productsQuery.data || [],
    filteredProducts,
    featuredProducts: featuredProductsQuery.data || [],
    categories: categoriesQuery.data || [],
    collections: collectionsQuery.data || [],
    product: individualProductQuery.data,
    similarProducts: similarProductQuery.data || [],

    // Loading states
    isLoading:
      productsQuery.isLoading ||
      categoriesQuery.isLoading ||
      collectionsQuery.isLoading,
    isFeaturedLoading: featuredProductsQuery.isLoading,
    isProductLoading: individualProductQuery.isLoading,
    isSimilarProductsLoading: similarProductQuery.isLoading,

    // Error states
    error:
      productsQuery.error ||
      categoriesQuery.error ||
      collectionsQuery.error ||
      null,
    featuredError: featuredProductsQuery.error,
    productError: individualProductQuery.error,

    // Actions
    filterByCategory,
    filterByCollection,
    handleSearch,
    handleSort,
    sortOptions: SORT_OPTIONS,
    resetFilters,

    // State
    filters,
    searchQuery,
    sortOption,

    // Queries (for direct access if needed)
    productsQuery,
    featuredProductsQuery,
    categoriesQuery,
    collectionsQuery,
    individualProductQuery,
    similarProductQuery,
  };
};
