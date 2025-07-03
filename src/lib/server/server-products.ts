// Server-side product fetching functions
import { Product } from "@/types/ComponentTypes";
import { cache } from "react";

// Use cache to avoid refetching during a request
export const getProductById = cache(
  async (id: string): Promise<Product | undefined> => {
    try {
      // Use absolute URL since we're on the server
      const response = await fetch(
        `${process.env.SITE_URL || "https://stardom.co.in"}/api/products`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const products: Product[] = await response.json();
      return products.find((p) => p.id === id);
    } catch (error) {
      console.error("Error fetching product on server:", error);
      return undefined;
    }
  },
);

// For similar products - also cached
export const getSimilarProducts = cache(
  async (id: string): Promise<Product[]> => {
    try {
      const product = await getProductById(id);
      if (!product) return [];

      const response = await fetch(
        `${process.env.SITE_URL || "https://stardom.co.in"}/api/products`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const products: Product[] = await response.json();
      return products.filter(
        (p) => p.category === product.category && p.id !== id,
      );
    } catch (error) {
      console.error("Error fetching similar products on server:", error);
      return [];
    }
  },
);
