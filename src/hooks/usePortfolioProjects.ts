"use client";

import { useQuery } from "@tanstack/react-query";
import { PortfolioProject } from "@/types/ComponentTypes";
import { PortfolioProjects as fallbackProjects } from "@/lib/constants/PortfolioProjects";

interface UsePortfolioOptions {
  featured?: boolean;
  limit?: number;
  tag?: string;
  enabled?: boolean;
}

export function usePortfolioProjects(options: UsePortfolioOptions = {}) {
  const { featured, limit, tag, enabled = true } = options;

  return useQuery<PortfolioProject[]>({
    queryKey: ["portfolio-projects", { featured, limit, tag }],
    queryFn: async () => {
      try {
        // Using absolute URL with origin to ensure proper path resolution
        const endpoint = `${window.location.origin}/api/portfolio`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Cache-Control": "no-cache",
          },
        });

        if (!response.ok) {
          throw new Error(
            `API request failed: ${response.status} ${response.statusText}`,
          );
        }

        const data = await response.json();

        // Handle different possible response structures
        let projects: PortfolioProject[];

        if (data.projects && Array.isArray(data.projects)) {
          projects = data.projects;
        } else if (Array.isArray(data)) {
          projects = data;
        } else {
          throw new Error("API returned unexpected data structure");
        }

        return projects;
      } catch (error) {
        throw error; // Let React Query error handling take over
      }
    },
    enabled, // Control whether the query auto-executes
    retry: 2, // Retry failed requests a reasonable number of times
    retryDelay: (attempt) => Math.min(attempt > 1 ? 2000 : 1000, 30 * 1000),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes

    // Use fallback data when in error state or when loading
    placeholderData: getFilteredFallbacks,

    // Process and filter the projects
    select: (data) => {
      if (!data || !Array.isArray(data) || data.length === 0) {
        return getFilteredFallbacks();
      }

      let filtered = [...data];

      // Apply filters in sequence
      if (featured !== undefined) {
        filtered = filtered.filter((project) =>
          featured
            ? project.tags?.includes("featured")
            : !project.tags?.includes("featured"),
        );
      }

      if (tag) {
        filtered = filtered.filter((project) => project.tags?.includes(tag));
      }

      if (limit && limit > 0) {
        filtered = filtered.slice(0, limit);
      }

      return filtered;
    },
  });

  // Helper function to filter fallback data based on the same options
  function getFilteredFallbacks(): PortfolioProject[] {
    if (
      !fallbackProjects ||
      !Array.isArray(fallbackProjects) ||
      fallbackProjects.length === 0
    ) {
      return getEmergencyFallback();
    }

    let filtered = [...fallbackProjects];

    if (featured !== undefined) {
      filtered = filtered.filter((p) =>
        featured ? p.tags?.includes("featured") : !p.tags?.includes("featured"),
      );
    }

    if (tag) {
      filtered = filtered.filter((p) => p.tags?.includes(tag));
    }

    if (limit && limit > 0) {
      filtered = filtered.slice(0, limit);
    }

    return filtered;
  }

  // Provide a minimal emergency fallback if everything else fails
  function getEmergencyFallback(): PortfolioProject[] {
    return [
      {
        id: "emergency-1",
        title: "Sample Project",
        tags: ["featured"],
        thumbnail: "https://placehold.co/600x400?text=Sample+Project",
        description: "This is a sample project when fallback data is missing.",
        challenge: "Sample challenge text.",
        solution: "Sample solution text.",
        impact: "Sample impact text.",
        testimonial: {
          quote: "Sample testimonial quote.",
          author: "John Doe",
          position: "CEO, Sample Company",
        },
        gallery: ["https://placehold.co/800x600?text=Gallery+Image"],
      },
    ];
  }
}
