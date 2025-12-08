"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientTestimonial } from "@/types/ComponentTypes";

export const useTestimonials = () => {
  const queryClient = useQueryClient();

  const testimonialsQuery = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await fetch("/api/testimonials");
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json() as Promise<ClientTestimonial[]>;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async ({ id, imageUrl }: { id: string; imageUrl: string }) => {
      const response = await fetch("/api/protected/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, imageUrl }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete testimonial");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });

  return {
    testimonials: testimonialsQuery.data || [],
    isLoading: testimonialsQuery.isLoading,
    error: testimonialsQuery.error,
    deleteTestimonial: deleteTestimonialMutation.mutateAsync,
  };
};
