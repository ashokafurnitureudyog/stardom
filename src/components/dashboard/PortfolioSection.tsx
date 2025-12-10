import { useState, useOptimistic, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddPortfolioDialog } from "./portfolio/AddPortfolioDialog";
import { PortfolioCard } from "./portfolio/PortfolioCard";
import { PortfolioProject } from "@/types/ComponentTypes";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

// Just add the database fields without changing the base type
interface DatabasePortfolioProject extends PortfolioProject {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export const PortfolioSection = () => {
  const {
    projects,
    isLoading: loading,
    error: queryError,
    deleteProject,
  } = usePortfolio();

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const [optimisticProjects, addOptimisticProject] = useOptimistic(
    projects,
    (state: DatabasePortfolioProject[], deletedId: string) =>
      state.filter((p) => p.id !== deletedId && p.$id !== deletedId),
  );

  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };

  // Filtered projects
  const filteredProjects = optimisticProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      project.testimonial.author
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["portfolio"] });
  };

  const handleDelete = async (projectId: string, imageUrls: string[]) => {
    startTransition(async () => {
      addOptimisticProject(projectId);
      try {
        await deleteProject({ projectId, imageUrls });
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
      } catch (error) {
        console.error("Delete failed:", error);
        toast({
          title: "Error",
          description: "Failed to delete portfolio project",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-semibold mb-2 text-[#A28B55]">
            Portfolio Projects
          </h2>
          <p className="text-muted-foreground">
            {projects.length} portfolio items
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-64">
            {isPending ? (
              <div className="absolute left-2.5 top-2.5 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              placeholder="Search projects..."
              className="pl-9"
              value={inputValue}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto lg:w-auto justify-center">
            <Button
              variant="outline"
              size="default"
              className="flex items-center gap-2 h-10 hover:bg-secondary"
              onClick={handleRefresh}
            >
              <RefreshCw size={16} />{" "}
              <span className="hidden lg:inline">Refresh</span>
            </Button>

            <AddPortfolioDialog onSuccess={handleRefresh} />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {queryError && (
        <div className="bg-red-500/10 text-red-400 p-4 mb-6 rounded border border-red-900/50">
          <p>
            {queryError instanceof Error
              ? queryError.message
              : "Failed to load portfolio projects"}
          </p>
          <Button
            variant="outline"
            className="mt-2 bg-transparent border-[#3C3120] text-[#A28B55] hover:bg-neutral-800 hover:border-[#A28B55]"
            onClick={handleRefresh}
          >
            Try Again
          </Button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[310px] bg-black/40 border border-[#3C3120]/50 rounded-md animate-pulse"
            />
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <PortfolioCard
              key={project.id || project.$id || `${project.title}-${index}`}
              project={project}
              onDelete={handleDelete}
              onEditSuccess={handleRefresh}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-black/40 border border-[#3C3120] rounded-md">
          <ImageIcon className="mx-auto h-12 w-12 text-[#A28B55] opacity-70 mb-4" />
          {searchQuery ? (
            <>
              <h3 className="text-xl font-medium mb-3 text-[#A28B55]">
                No Projects Found
              </h3>
              <p className="text-neutral-500 mb-6">
                No projects match your search query
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-medium mb-3 text-[#A28B55]">
                No Projects Yet
              </h3>
              <p className="text-neutral-500 mb-6">
                Get started by adding your first portfolio project
              </p>
              <div className="flex justify-center">
                <AddPortfolioDialog onSuccess={handleRefresh} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
