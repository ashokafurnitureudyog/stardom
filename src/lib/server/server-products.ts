import { Product } from "@/types/ComponentTypes";
import { cache } from "react";

/**
 * Base URL for API requests
 * Falls back to production URL if SITE_URL is not set
 */
const API_BASE_URL = process.env.SITE_URL || "https://stardom.co.in";

/**
 * Fetches all products from the API
 *
 * This is a utility function used by other fetchers
 * and implements basic error handling and logging
 *
 * @returns {Promise<Product[]>} Array of product objects
 * @throws Will throw an error if the fetch fails
 */
async function fetchAllProducts(): Promise<Product[]> {
  try {
    // Use absolute URL for server-side fetching
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      // Add cache control headers
      headers: {
        "Cache-Control": "max-age=300", // Cache for 5 minutes
      },
      // Optional: Add next.js revalidate setting
      next: {
        revalidate: 300, // Revalidate every 5 minutes
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error; // Re-throw to allow the caller to handle it
  }
}

/**
 * Retrieves a single product by its ID
 *
 * Uses React's cache() to deduplicate requests during rendering
 *
 * @param {string} id - The unique identifier of the product to retrieve
 * @returns {Promise<Product | undefined>} The product if found, undefined otherwise
 */
export const getProductById = cache(
  async (id: string): Promise<Product | undefined> => {
    try {
      const products = await fetchAllProducts();
      return products.find((product) => product.id === id);
    } catch (error) {
      console.error(`Error retrieving product with ID ${id}:`, error);
      return undefined;
    }
  },
);

/**
 * Retrieves products similar to the specified product
 *
 * Finds products in the same category as the specified product,
 * excluding the product itself
 *
 * @param {string} id - The ID of the reference product
 * @returns {Promise<Product[]>} Array of similar products
 */
export const getSimilarProducts = cache(
  async (id: string): Promise<Product[]> => {
    try {
      // Get the reference product
      const referenceProduct = await getProductById(id);
      if (!referenceProduct) {
        console.warn(`Cannot find similar products - product ${id} not found`);
        return [];
      }

      // Get all products and filter
      const allProducts = await fetchAllProducts();

      return allProducts.filter(
        (product) =>
          // Same category but not the same product
          product.category === referenceProduct.category &&
          product.id !== referenceProduct.id,
      );
    } catch (error) {
      console.error(`Error retrieving similar products for ID ${id}:`, error);
      return [];
    }
  },
);

/**
 * Retrieves all products from a specific category
 *
 * @param {string} category - The category name
 * @returns {Promise<Product[]>} Array of products in the specified category
 */
export const getProductsByCategory = cache(
  async (category: string): Promise<Product[]> => {
    try {
      const products = await fetchAllProducts();
      return products.filter((product) => product.category === category);
    } catch (error) {
      console.error(
        `Error retrieving products in category ${category}:`,
        error,
      );
      return [];
    }
  },
);
