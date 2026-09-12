"use client";

import { useCallback, useEffect, useState } from "react";
import { loadPortfolioProjects } from "@/lib/actions/content-actions";
import { deletePortfolioProject } from "@/lib/controllers/PortfolioControllers";
import type { PortfolioProject } from "@/types/ComponentTypes";

/**
 * Portfolio projects for the dashboard section, which reloads them after each
 * edit.
 */
export const usePortfolio = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      setProjects(await loadPortfolioProjects());
      setError(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause : new Error("Failed to load portfolio"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const deleteProject = useCallback(
    async ({ projectId, imageUrls }: { projectId: string; imageUrls: string[] }) => {
      const result = await deletePortfolioProject(projectId, imageUrls);
      if (!result.ok) throw new Error(result.error);
      await refresh();
    },
    [refresh],
  );

  return { projects, isLoading, error, deleteProject, refresh };
};
