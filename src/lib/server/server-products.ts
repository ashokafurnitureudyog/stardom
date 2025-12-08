"use cache";

import { Client, Databases } from "node-appwrite";
import { Product } from "@/types/ComponentTypes";

/**
 * Creates an Appwrite client for build-time operations
 * This doesn't use cookies like createAdminClient, making it suitable for static generation
 */
function createBuildTimeClient() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT!)
    .setKey(process.env.APPWRITE_KEY!);

  return {
    database: new Databases(client),
  };
}

/**
 * Fetches all products directly from Appwrite
 *
 * This uses direct Appwrite SDK calls instead of HTTP fetch
 * to avoid ECONNREFUSED errors during build-time static generation
 *
 * @returns {Promise<Product[]>} Array of product objects
 * @throws Will throw an error if the fetch fails
 */
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const { database } = createBuildTimeClient();

    const products = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PRODUCTS_COLLECTION_ID!,
    );

    return products.documents.map((product) => ({
      id: product.$id,
      $id: product.$id,
      name: product.name,
      description: product.description,
      category: product.category,
      product_collection: product.product_collection,
      images: product.images || [],
      features: product.features || [],
      colors: product.colors || [],
      $createdAt: product.$createdAt,
      $updatedAt: product.$updatedAt,
    })) as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error; // Re-throw to allow the caller to handle it
  }
}

/**
 * Retrieves a single product by its ID
 *
 * Uses Next.js 16 'use cache' directive for request deduplication
 *
 * @param {string} id - The unique identifier of the product to retrieve
 * @returns {Promise<Product | undefined>} The product if found, undefined otherwise
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const products = await fetchAllProducts();
    return products.find((product) => product.id === id);
  } catch (error) {
    console.error(`Error retrieving product with ID ${id}:`, error);
    return undefined;
  }
}

/**
 * Retrieves products similar to the specified product
 *
 * Finds products in the same category as the specified product,
 * excluding the product itself
 *
 * @param {string} id - The ID of the reference product
 * @returns {Promise<Product[]>} Array of similar products
 */
export async function getSimilarProducts(id: string): Promise<Product[]> {
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
}

/**
 * Retrieves all products from a specific category
 *
 * @param {string} category - The category name
 * @returns {Promise<Product[]>} Array of products in the specified category
 */
export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  try {
    const products = await fetchAllProducts();
    return products.filter((product) => product.category === category);
  } catch (error) {
    console.error(`Error retrieving products in category ${category}:`, error);
    return [];
  }
}
