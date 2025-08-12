"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash, Eye, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PortfolioProjectDetails } from "./PortfolioProjectDetails";
import { PortfolioProjectType } from "./portfolio/types";
import { EditPortfolioDialog } from "./EditPortfolioDialog";

interface PortfolioCardProps {
  project: PortfolioProjectType;
  onDelete: (id: string, imageUrls: string[]) => Promise<void>;
  onEditSuccess: () => void;
  isLoading?: boolean;
}

export const PortfolioCard = ({
  project,
  onDelete,
  onEditSuccess,
  isLoading = false,
}: PortfolioCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const projectId = project.id || project.$id || "";

  const handleDeleteClick = async () => {
    setIsDeleting(true);
    await onDelete(projectId, project.gallery || []);
    setIsDeleting(false);
    setDeleteDialogOpen(false);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="rounded-md overflow-hidden border border-[#3C3120] bg-black/40 h-[350px]">
        <div className="animate-pulse p-4">
          <div className="h-48 bg-[#3C3120]/40 rounded-md mb-4"></div>
          <div className="space-y-2">
            <div className="h-5 w-3/4 bg-[#3C3120]/40 rounded"></div>
            <div className="h-4 w-1/2 bg-[#3C3120]/30 rounded"></div>
            <div className="flex gap-2 mt-3">
              <div className="h-6 w-16 bg-[#3C3120]/30 rounded-full"></div>
              <div className="h-6 w-20 bg-[#3C3120]/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-md overflow-hidden bg-black/40 border border-[#3C3120] transition-all duration-300 hover:border-[#A28B55] hover:shadow-[0_0_12px_rgba(162,139,85,0.2)] transform hover:scale-[1.03] hover:z-10 relative">
      {/* Action buttons container */}
      <div className="absolute top-2 right-2 z-20 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
        {/* Edit button */}
        <button
          onClick={() => setEditDialogOpen(true)}
          className="h-8 w-8 p-0 flex items-center justify-center rounded-full bg-neutral-900/80 backdrop-blur-sm transform scale-100 hover:scale-110 border border-[#3C3120] hover:border-[#A28B55]"
          title="Edit project"
        >
          <Edit size={16} className="text-[#A28B55]" />
        </button>

        {/* Delete button */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogTrigger asChild>
            <button
              className="h-8 w-8 p-0 flex items-center justify-center rounded-full bg-neutral-900/80 backdrop-blur-sm transform scale-100 hover:scale-110 border border-[#3C3120] hover:border-[#A28B55]"
              title="Delete project"
            >
              <Trash size={16} className="text-[#A28B55]" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-neutral-900 border border-[#3C3120]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[#A28B55]">
                Delete Portfolio Project
              </AlertDialogTitle>
              <AlertDialogDescription className="text-neutral-400">
                Are you sure you want to delete &quot;{project.title}&quot;?
                This action cannot be undone and will permanently remove all
                associated images.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-[#3C3120] text-[#3C3120] hover:bg-neutral-800 hover:text-[#A28B55] hover:border-[#A28B55]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="bg-[#3C3120] hover:bg-[#A28B55] text-neutral-200 transform hover:scale-105 transition-all duration-300"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Edit Dialog */}
      <EditPortfolioDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        project={project}
        onSuccess={onEditSuccess}
      />

      {/* Image container with View Details on hover */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div
            className="relative w-full cursor-pointer"
            style={{ height: "200px" }}
          >
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                unoptimized
                className="opacity-85 object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                <span className="text-neutral-600">No image</span>
              </div>
            )}

            {/* Hover overlay for View Details */}
            <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="flex items-center justify-center text-[#A28B55] transform scale-100 hover:scale-110 transition-all duration-300">
                <Eye size={25} className="mr-2 text-[#A28B55]" />
                <span className="text-sm font-medium">View Details</span>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-[95vw] sm:max-w-[950px] h-[90vh] p-0 border-[#3C3120] bg-neutral-900">
          <PortfolioProjectDetails project={project} />
        </DialogContent>
      </Dialog>

      {/* Project info */}
      <div className="p-4">
        <h3 className="font-medium text-[#A28B55] truncate">{project.title}</h3>
        <p className="text-xs text-neutral-500 truncate mt-1 mb-3">
          {project.description}
        </p>

        <div className="flex flex-nowrap overflow-hidden gap-2">
          {project.tags.slice(0, 2).map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs bg-neutral-800/50 text-[#A28B55] border-[#3C3120]/70 hover:border-[#A28B55] whitespace-nowrap max-w-[45%] overflow-hidden text-ellipsis"
            >
              <span className="truncate">{tag}</span>
            </Badge>
          ))}
          {project.tags.length > 2 && (
            <Badge
              variant="outline"
              className="text-xs bg-neutral-800/30 text-neutral-500 border-neutral-700/50 whitespace-nowrap flex-shrink-0"
            >
              +{project.tags.length - 2} more
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
