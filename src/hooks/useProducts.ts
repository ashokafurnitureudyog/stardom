/**
 * Product data for the admin dashboard. Public pages render products on the
 * server, so this hook only covers the authenticated, interactive views.
 * @module useProducts
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/types/ComponentTypes";

const STALE_TIME = 5 * 60 * 1000;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { "Content-Type": "application/json" } });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const useProducts = () => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchJson<Product[]>("/api/products"),
    staleTime: STALE_TIME,
  });

  const featuredProductsQuery = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: () => fetchJson<Product[]>("/api/featured"),
    staleTime: STALE_TIME,
  });

  const deleteProductMutation = useMutation({
    mutationFn: async ({ productId, imageUrls }: { productId: string; imageUrls: string[] }) => {
      const response = await fetch("/api/protected/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, imageUrls }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete product");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["featuredProducts"] });
    },
  });

  return {
    products: productsQuery.data || [],
    featuredProducts: featuredProductsQuery.data || [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error || featuredProductsQuery.error || null,
    deleteProduct: deleteProductMutation.mutateAsync,
    productsQuery,
    featuredProductsQuery,
  };
};
