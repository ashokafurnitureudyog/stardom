/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MediaItem } from "@/types/MediaTypes";
import { Trash, Eye, Image as ImageIcon, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { HeroMediaDetails } from "./HeroMediaDetails";

type MediaItemWithId = MediaItem & { id: string };

interface HeroMediaCardProps {
  item: MediaItemWithId;
  onDelete: (id: string) => Promise<void>;
}

export const HeroMediaCard = ({ item, onDelete }: HeroMediaCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Update this function in HeroMediaCard.tsx
  const handleDeleteClick = async () => {
    setIsDeleting(true);
    await onDelete(item.id);
    setIsDeleting(false);
    setDeleteDialogOpen(false);
  };

  return (
    <div className="group rounded-md overflow-hidden bg-black/40 border border-[#3C3120] transition-all duration-300 hover:border-[#A28B55] hover:shadow-[0_0_12px_rgba(162,139,85,0.2)] transform hover:scale-[1.03] hover:z-10 relative">
      {/* Media Type Badge - top left corner */}
      <div className="absolute top-2 left-2 z-10">
        <Badge className="bg-black/80 backdrop-blur-sm border border-[#A28B55] text-[#A28B55] flex gap-1.5 items-center px-3 py-1 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
          {item.type === "image" ? (
            <>
              <ImageIcon size={12} className="text-[#A28B55]" /> Image
            </>
          ) : (
            <>
              <Play size={12} className="fill-[#A28B55] text-[#A28B55]" /> Video
            </>
          )}
        </Badge>
      </div>

      {/* Delete button - top right corner, only visible on hover */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogTrigger asChild>
          <button className="absolute right-2 top-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 h-8 w-8 p-0 flex items-center justify-center rounded-full transform scale-100 hover:scale-110">
            <Trash size={20} className="text-[#A28B55]" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#171410] border border-[#352b1c]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#A28B55]">
              Delete Media
            </AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              Are you sure you want to delete this {item.type}? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-[#3C3120] text-neutral-300 hover:bg-neutral-900 hover:border-[#A28B55]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteClick}
              disabled={isDeleting}
              className="bg-red-950/30 text-red-400 hover:bg-red-950/50 border border-red-900/30 hover:border-red-500/50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Media container with View Details on hover */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div
            className="relative w-full cursor-pointer"
            style={{ height: "280px" }}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt || "Hero image"}
                className="absolute inset-0 w-full h-full object-cover opacity-85"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                <div className="w-full h-full relative">
                  {/* Video thumbnail/poster - not playable in card view */}
                  <video
                    src={item.src}
                    className="absolute inset-0 w-full h-full object-cover opacity-85"
                    muted
                    playsInline
                    preload="metadata"
                  />
                </div>
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
        <DialogContent className="w-[95vw] sm:max-w-[950px] h-[90vh] p-0 border-[#3C3120] bg-[#171410] [&>button]:hidden">
          <HeroMediaDetails item={item} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
