"use client";
import { useState } from "react";
import Image from "next/image";
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
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ClientTestimonial } from "@/types/ComponentTypes";
import { EditTestimonialDialog } from "./EditTestimonialDialog";

interface TestimonialCardProps {
  testimonial: ClientTestimonial;
  onDelete: (id: string, imageUrl: string) => Promise<void>;
  onEdit?: () => void;
  isLoading?: boolean;
}

export const TestimonialCard = ({
  testimonial,
  onDelete,
  onEdit,
  isLoading = false,
}: TestimonialCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(
        testimonial.id || testimonial.$id || "",
        testimonial.img || "",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditSuccess = () => {
    if (onEdit) {
      onEdit();
    }
  };

  // Get initials for fallback
  const getInitials = () => {
    return testimonial.name ? testimonial.name.charAt(0).toUpperCase() : "?";
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="rounded-md overflow-hidden border border-[#3C3120] bg-black/40 h-[240px]">
        <div className="animate-pulse p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-[#3C3120]/40"></div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-[#3C3120]/40 rounded"></div>
              <div className="h-3 w-32 bg-[#3C3120]/30 rounded"></div>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-3 w-40 bg-[#3C3120]/30 rounded"></div>
            <div className="h-5 w-20 bg-[#3C3120]/40 rounded"></div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-[#3C3120]/30 rounded"></div>
              <div className="h-3 w-5/6 bg-[#3C3120]/30 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-md overflow-hidden bg-black/40 border border-[#3C3120] transition-all duration-300 hover:border-[#A28B55] hover:shadow-[0_0_12px_rgba(162,139,85,0.2)] transform hover:scale-[1.03] hover:z-10">
      <div className="relative h-full flex flex-col">
        <div className="p-4 border-b border-[#3C3120] group-hover:border-[#A28B55]/40 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#3C3120] group-hover:border-[#A28B55] transition-colors duration-300 bg-black/20 shadow-[0_0_8px_rgba(0,0,0,0.3)]">
              {testimonial.img && !imgError ? (
                <Image
                  src={testimonial.img}
                  alt={testimonial.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => {
                    setImgError(true);
                  }}
                  sizes="48px"
                  // 48px because h-12 w-12 = 3rem = 48px
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#3C3120]/50 text-[#A28B55] text-lg font-medium">
                  {getInitials()}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-[#A28B55] group-hover:text-[#E6D5A9] transition-colors duration-300">
                {testimonial.name}
              </h3>
              <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
                {testimonial.title}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-3">
            <span className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
              {testimonial.location} • {testimonial.purchaseDate}
            </span>
          </div>

          <div className="mb-3">
            <span className="px-2 py-1 text-xs rounded bg-[#A28B55]/10 text-[#A28B55] border border-[#A28B55]/20 group-hover:bg-[#A28B55]/20 group-hover:border-[#A28B55]/30 transition-all duration-300">
              {testimonial.context}
            </span>
          </div>

          <div className="relative">
            <p className="text-sm text-neutral-300 line-clamp-4 mb-2 flex-1 group-hover:text-neutral-200 transition-colors duration-300">
              {testimonial.quote}
            </p>
          </div>

          <div className="mt-auto pt-3 border-t border-[#3C3120]/70 group-hover:border-[#A28B55]/40 transition-colors duration-300 flex justify-end gap-2">
            {/* Edit Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditDialogOpen(true)}
              className="text-[#A28B55] hover:text-[#E6D5A9] hover:bg-[#A28B55]/10 transition-all duration-300 transform hover:scale-105"
            >
              <Edit size={16} className="mr-0 sm:mr-1" />
              <span className="hidden sm:inline">Edit</span>
            </Button>

            {/* Delete Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#A28B55] hover:text-[#E6D5A9] hover:bg-[#A28B55]/10 transition-all duration-300 transform hover:scale-105"
                >
                  <Trash2 size={16} className="mr-0 sm:mr-1" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#171410] border-[#3C3120]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[#A28B55]">
                    Delete Testimonial
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-neutral-400">
                    Are you sure you want to delete this testimonial from{" "}
                    {testimonial.name}? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-transparent border-[#3C3120] text-[#3C3120] hover:bg-neutral-800 hover:text-[#A28B55] hover:border-[#A28B55]">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete();
                    }}
                    disabled={isDeleting}
                    className="bg-[#3C3120] hover:bg-[#A28B55] text-neutral-200 transform hover:scale-105 transition-all duration-300"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <EditTestimonialDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        testimonial={testimonial}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};
