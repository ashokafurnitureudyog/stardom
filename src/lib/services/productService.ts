/**
 * Product service for handling all product-related API calls and data transformations
 * @module ProductService
 */
import { Product, SortOption } from "@/types/ComponentTypes";

/**
 * Base URL for API endpoints
 */
const API_BASE_URL =
  typeof window !== "undefined" ? window.location.origin : "";

/**
 * Configuration options for API requests
 */
const DEFAULT_REQUEST_CONFIG: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Service for handling product-related API calls and data transformations
 */
export const productService = {
  /**
   * Fetches all products from the API
   * @returns Promise resolving to an array of Product objects
   * @throws Error if the API request fails
   */
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products`,
        DEFAULT_REQUEST_CONFIG,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  /**
   * Extracts unique categories from all products
   * @returns Promise resolving to an array of unique category strings
   */
  getCategories: async (): Promise<string[]> => {
    const products = await productService.getProducts();
    return [...new Set(products.map((product) => product.category))];
  },

  /**
   * Extracts unique collections from all products
   * @returns Promise resolving to an array of unique collection strings
   */
  getCollections: async (): Promise<string[]> => {
    const products = await productService.getProducts();
    return [
      ...new Set(
        products
          .map((product) => product.product_collection)
          .filter(
            (collection): collection is string => collection !== undefined,
          ),
      ),
    ];
  },

  /**
   * Fetches a specific product by ID
   * @param id - Product ID to fetch
   * @returns Promise resolving to a Product object or undefined if not found
   */
  getProductById: async (id: string): Promise<Product | undefined> => {
    try {
      const products = await productService.getProducts();
      return products.find((product) => product.id === id);
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Fetches products similar to the specified product ID (same category)
   * @param id - Product ID to find similar products for
   * @returns Promise resolving to an array of similar Product objects
   */
  getSimilarProducts: async (id: string): Promise<Product[]> => {
    try {
      const products = await productService.getProducts();
      const product = products.find((p) => p.id === id);

      if (!product) return [];

      return products.filter(
        (p) => p.category === product.category && p.id !== product.id,
      );
    } catch (error) {
      console.error(`Error fetching similar products for ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Fetches featured products from a dedicated API endpoint with fallback
   * @returns Promise resolving to an array of featured Product objects
   */
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/featured`,
        DEFAULT_REQUEST_CONFIG,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch featured products: ${response.status} ${response.statusText}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching featured products, using fallback:", error);

      // Fallback to algorithm if the featured API fails
      try {
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
      } catch (fallbackError) {
        console.error("Featured products fallback also failed:", fallbackError);
        throw error; // Throw original error
      }
    }
  },

  /**
   * Filters products based on category, collection, search query, and sort option
   * @param products - Array of products to filter
   * @param category - Category to filter by, or 'all' for no filtering
   * @param collection - Collection to filter by, or 'all' for no filtering
   * @param searchQuery - Search query to filter by
   * @param sortOption - Option to sort the filtered products by
   * @returns Array of filtered and sorted Product objects
   */
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

      // Search query matching (case-insensitive)
      const normalizedQuery = searchQuery.toLowerCase().trim();
      const searchMatch =
        normalizedQuery === "" ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        (product.product_collection &&
          product.product_collection.toLowerCase().includes(normalizedQuery));

      return categoryMatch && collectionMatch && searchMatch;
    });

    // Then sort filtered products
    return productService.sortProducts(filtered, sortOption);
  },

  /**
   * Sorts products based on the provided sort option
   * @param products - Array of products to sort
   * @param sortOption - Option to sort by
   * @returns Sorted array of Product objects
   */
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
