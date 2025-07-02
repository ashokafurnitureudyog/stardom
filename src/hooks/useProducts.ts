import { useProductStore } from "@/lib/store/ProductStore";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Product, SortOption } from "@/types/ComponentTypes";

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${window.location.origin}/api/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },

  getCategories: async (): Promise<string[]> => {
    const products = await productService.getProducts();
    return [...new Set(products.map((p) => p.category))];
  },

  getCollections: async (): Promise<string[]> => {
    const products = await productService.getProducts();
    return [
      ...new Set(
        products
          .map((p) => p.product_collection)
          .filter(
            (collection): collection is string => collection !== undefined,
          ),
      ),
    ];
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    const products = await productService.getProducts();
    return products.find((p) => p.id === id);
  },

  getSimilarProducts: async (id: string): Promise<Product[]> => {
    const products = await productService.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) return [];
    return products.filter(
      (p) => p.category === product.category && p.id !== product.id,
    );
  },

  // Get featured products using the dedicated API endpoint
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${window.location.origin}/api/featured`);

      if (!response.ok) {
        throw new Error("Failed to fetch featured products");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching featured products:", error);

      // Fallback to the original algorithm if the featured API fails
      const products = await productService.getProducts();
      const categories = [...new Set(products.map((p) => p.category))];
      const featuredProducts: Product[] = [];

      for (const category of categories.slice(0, 4)) {
        const categoryProduct = products.find((p) => p.category === category);
        if (categoryProduct) {
          featuredProducts.push(categoryProduct);
        }
      }

      return featuredProducts;
    }
  },

  // Filter and sort products
  filterProducts: (
    products: Product[],
    category: string,
    collection: string,
    searchQuery: string,
    sortOption: SortOption,
  ): Product[] => {
    // First filter products
    const filtered = products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;
      const collectionMatch =
        collection === "all" || product.product_collection === collection;

      // Search query matching
      const searchMatch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.product_collection &&
          product.product_collection
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));

      return categoryMatch && collectionMatch && searchMatch;
    });

    // Then sort filtered products
    return productService.sortProducts(filtered, sortOption);
  },

  // Sort products based on sort option
  sortProducts: (products: Product[], sortOption: SortOption): Product[] => {
    const sortedProducts = [...products];

    switch (sortOption) {
      case "name-a-z":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

      case "name-z-a":
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));

      case "featured":
      default:
        // Assuming id represents the natural "featured" order
        return sortedProducts.sort((a, b) => a.id.localeCompare(b.id));
    }
  },
};

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

  // Fetch featured products
  const featuredProductsQuery = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: productService.getFeaturedProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Categories are derived from products - no separate API call needed
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    enabled: !!productsQuery.data, // Only run after products are loaded
  });

  // Collections are derived from products - no separate API call needed
  const collectionsQuery = useQuery({
    queryKey: ["collections"],
    queryFn: productService.getCollections,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    enabled: !!productsQuery.data, // Only run after products are loaded
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
      productsQuery.error || categoriesQuery.error || collectionsQuery.error,
    featuredError: featuredProductsQuery.error,
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
    featuredProductsQuery,
    categoriesQuery,
    collectionsQuery,
    individualProductQuery,
    similarProductQuery,
  };
};
