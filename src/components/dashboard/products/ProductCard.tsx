/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
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
import { Trash, Eye, Star, Pencil } from "lucide-react";
import type { Product } from "@/types/ComponentTypes";
import { Badge } from "@/components/ui/badge";
import { ProductDetails } from "../view-details";
import { EditProductDialog } from "./EditProductDialog";

export const ProductCard = ({
  product,
  onDelete,
  onUpdate,
  isFeatured = false,
}: {
  product: Product;
  onDelete: (id: string, images: string[]) => void;
  onUpdate?: () => void;
  isFeatured?: boolean;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const productId = product.id || product.$id || "";

  const handleDeleteClick = async () => {
    setIsDeleting(true);
    await onDelete(productId, product.images || []);
    setIsDeleting(false);
    setDeleteDialogOpen(false);
  };

  return (
    <div className="group rounded-md overflow-hidden bg-black/40 border border-[#3C3120] transition-all duration-300 hover:border-[#A28B55] hover:shadow-[0_0_12px_rgba(162,139,85,0.2)] transform hover:scale-[1.03] hover:z-10">
      {/* Featured badge - refined premium styling */}
      {isFeatured && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-black/80 backdrop-blur-sm border border-[#A28B55] text-[#A28B55] flex gap-1.5 items-center px-3 py-1 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
            <Star size={12} className="fill-[#A28B55] text-[#A28B55]" />
            <span className="font-medium tracking-wide">Featured</span>
          </Badge>
        </div>
      )}

      {/* Action buttons - top right corner, only visible on hover */}
      <div className="absolute right-2 top-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
        {/* Edit button */}
        <EditProductDialog product={product} onSuccess={onUpdate}>
          <button className="h-8 w-8 p-0 flex items-center justify-center rounded-full transform scale-100 hover:scale-110">
            <Pencil size={18} className="text-[#A28B55]" />
          </button>
        </EditProductDialog>

        {/* Delete button */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogTrigger asChild>
            <button className="h-8 w-8 p-0 flex items-center justify-center rounded-full transform scale-100 hover:scale-110">
              <Trash size={18} className="text-[#A28B55]" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-neutral-900 border border-[#3C3120]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[#A28B55]">
                Delete Product
              </AlertDialogTitle>
              <AlertDialogDescription className="text-neutral-400">
                Are you sure you want to delete &quot;{product.name}&quot;? This
                action cannot be undone and will permanently remove all
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

      {/* Image container with View Details on hover */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div
            className="relative w-full cursor-pointer"
            style={{ height: "280px" }}
          >
            {product.images && product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="absolute opacity-85 inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                <span className="text-neutral-600">No image</span>
              </div>
            )}

            {/* Hover overlay for View Details - exactly like featured cards */}
            <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="flex items-center justify-center text-[#A28B55] transform scale-100 hover:scale-110 transition-all duration-300">
                <Eye size={25} className="mr-2 text-[#A28B55]" />
                <span className="text-sm font-medium">View Details</span>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-[95vw] sm:max-w-[950px] h-[90vh] p-0 border-[#3C3120] bg-neutral-900">
          <ProductDetails product={product} />
        </DialogContent>
      </Dialog>

      {/* Product info - simplified to match featured cards */}
      <div className="p-4">
        <h3 className="font-medium text-[#A28B55] truncate">{product.name}</h3>
        <p className="text-xs text-neutral-500 truncate mt-1">
          {product.description}
        </p>
      </div>
    </div>
  );
};
