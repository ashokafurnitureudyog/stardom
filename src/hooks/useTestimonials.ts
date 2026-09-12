"use client";

import { useCallback, useEffect, useState } from "react";
import { loadTestimonials } from "@/lib/actions/content-actions";
import { deleteTestimonial as removeTestimonial } from "@/lib/controllers/TestimonialsControllers";
import type { ClientTestimonial } from "@/types/ComponentTypes";

/**
 * Testimonials for the dashboard section, which reloads them after each edit.
 */
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<ClientTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      setTestimonials(await loadTestimonials());
      setError(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause : new Error("Failed to load testimonials"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const deleteTestimonial = useCallback(
    async ({ id, imageUrl }: { id: string; imageUrl?: string }) => {
      const result = await removeTestimonial(id, imageUrl);
      if (!result.ok) throw new Error(result.error);
      await refresh();
    },
    [refresh],
  );

  return { testimonials, isLoading, error, deleteTestimonial, refresh };
};
