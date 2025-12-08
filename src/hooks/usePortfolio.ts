import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PortfolioProject } from "@/types/ComponentTypes";

interface DatabasePortfolioProject extends PortfolioProject {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export const usePortfolio = () => {
  const queryClient = useQueryClient();

  const portfolioQuery = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const res = await fetch("/api/portfolio");
      if (!res.ok) throw new Error("Failed to fetch portfolio projects");
      return res.json() as Promise<DatabasePortfolioProject[]>;
    },
    staleTime: 5 * 60 * 1000,
  });

  const deletePortfolioMutation = useMutation({
    mutationFn: async ({
      projectId,
      imageUrls,
    }: {
      projectId: string;
      imageUrls: string[];
    }) => {
      const response = await fetch("/api/protected/portfolio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, imageUrls }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete portfolio project");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });

  return {
    projects: portfolioQuery.data || [],
    isLoading: portfolioQuery.isLoading,
    error: portfolioQuery.error,
    deleteProject: deletePortfolioMutation.mutateAsync,
  };
};
