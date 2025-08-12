"use client";
import { useEffect, useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddPortfolioDialog } from "./portfolio/AddPortfolioDialog";
import { PortfolioCard } from "./portfolio/PortfolioCard";
import { PortfolioProject } from "@/types/ComponentTypes";

// Just add the database fields without changing the base type
interface DatabasePortfolioProject extends PortfolioProject {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export const PortfolioSection = () => {
  const [projects, setProjects] = useState<DatabasePortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string>("");

  // Filtered projects
  const filteredProjects = projects.filter(
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

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/portfolio", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch portfolio projects");

      const data = await res.json();
      setProjects(data);
    } catch (error: unknown) {
      console.error("Failed to fetch portfolio projects:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load portfolio projects";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (projectId: string, imageUrls: string[]) => {
    try {
      // Find the project to get its thumbnail before removing it from state
      const projectToDelete = projects.find(
        (p) => p.id === projectId || p.$id === projectId,
      );

      // Optimistically update UI
      setProjects((prevProjects) =>
        prevProjects.filter(
          (project) => project.id !== projectId && project.$id !== projectId,
        ),
      );

      // Only include the thumbnail if we found the project and it has a thumbnail
      const allImages = [...imageUrls];
      if (projectToDelete?.thumbnail) {
        allImages.push(projectToDelete.thumbnail);
      }

      const response = await fetch("/api/protected/portfolio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          imageUrls: allImages,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete portfolio project");
      }

      // If successful, project is already removed from state
    } catch (error: unknown) {
      console.error("Delete failed:", error);
      // If deletion fails, refresh the project list
      fetchProjects();
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto justify-center">
            <Button
              variant="outline"
              size="default"
              className="flex items-center gap-2 h-10 hover:bg-secondary"
              onClick={fetchProjects}
            >
              <RefreshCw size={16} /> Refresh
            </Button>

            <AddPortfolioDialog onSuccess={fetchProjects} />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {error && (
        <div className="bg-red-500/10 text-red-400 p-4 mb-6 rounded border border-red-900/50">
          <p>{error}</p>
          <Button
            variant="outline"
            className="mt-2 bg-transparent border-[#3C3120] text-[#A28B55] hover:bg-neutral-800 hover:border-[#A28B55]"
            onClick={fetchProjects}
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
              onEditSuccess={fetchProjects}
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
                <AddPortfolioDialog onSuccess={fetchProjects} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
