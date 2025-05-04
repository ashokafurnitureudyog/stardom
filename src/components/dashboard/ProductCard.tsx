"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Trash, Eye } from "lucide-react";
import type { Product } from "@/types/ComponentTypes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ProductDetails } from "./product-details";
import { ImageCarousel } from "@/components/ui/image-carousel";

export const ProductCard = ({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: (id: string, images: string[]) => void;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async () => {
    setIsDeleting(true);
    await onDelete(product.id || product.$id || "", product.images || []);
    setIsDeleting(false);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer relative">
            <div className="relative">
              <ImageCarousel
                images={product.images}
                aspectRatio="square"
                fill={true}
                showControls={false}
                indicators="dots"
                className="group-hover:blur-[1px] transition-all"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-1.5 px-4 py-5 font-medium"
                >
                  <Eye size={18} />
                  View Details
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-1 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {product.category && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-primary/10 text-primary px-2 py-0.5"
                  >
                    {product.category}
                  </Badge>
                )}

                {product.product_collection ? (
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 border-gray-200 font-medium"
                  >
                    {product.product_collection}
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-xs bg-destructive/10 text-destructive px-2 py-0.5"
                  >
                    No Collection
                  </Badge>
                )}
              </div>
            </CardContent>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
          <ProductDetails product={product} />
        </DialogContent>
      </Dialog>

      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-1"
              disabled={isDeleting}
            >
              <Trash size={14} /> {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete &quot;{product.name}&quot;? This
                action cannot be undone and will permanently remove all
                associated images.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteClick}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
