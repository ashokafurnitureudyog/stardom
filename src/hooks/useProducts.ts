"use client";

import { useCallback, useEffect, useState } from "react";
import { loadFeaturedIds, loadProducts } from "@/lib/actions/content-actions";
import { deleteProduct as removeProduct } from "@/lib/controllers/ProductControllers";
import type { Product } from "@/types/ComponentTypes";

/**
 * Products for the dashboard. The storefront reads products during render, so
 * this covers only the authenticated views that mutate them.
 */
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredIds, setFeaturedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const [all, featured] = await Promise.all([loadProducts(), loadFeaturedIds()]);
      setProducts(all);
      setFeaturedIds(featured);
      setError(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause : new Error("Failed to load products"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const deleteProduct = useCallback(
    async ({ productId, imageUrls }: { productId: string; imageUrls: string[] }) => {
      const result = await removeProduct(productId, imageUrls);
      if (!result.ok) throw new Error(result.error);
      await refresh();
    },
    [refresh],
  );

  return { products, featuredIds, isLoading, error, deleteProduct, refresh };
};
