import { Product } from "@/types/ComponentTypes";
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
import { X, Eye } from "lucide-react";
import Image from "next/image";
interface FeaturedProductCardProps {
  product: Product;
  onRemove: (productId: string) => Promise<void>;
  onViewDetails: (product: Product) => void;
}

export const FeaturedProductCard = ({
  product,
  onRemove,
  onViewDetails,
}: FeaturedProductCardProps) => {
  const productId = product.id || product.$id || "";

  return (
    <div className="group rounded-md overflow-hidden bg-black/40 border border-[#3C3120] transition-all duration-300 hover:border-[#A28B55] hover:shadow-[0_0_12px_rgba(162,139,85,0.2)] transform hover:scale-[1.03] hover:z-10">
      {/* Image container with fixed dimensions */}
      <div className="relative w-full" style={{ height: "280px" }}>
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            unoptimized
            className="object-cover opacity-85"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
            <span className="text-neutral-600">No image</span>
          </div>
        )}

        {/* Delete button - with scale effect on hover */}
        <div className="absolute right-2 top-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="h-8 w-8 p-0 flex items-center justify-center rounded-full transform scale-100 hover:scale-110 transition-all duration-300">
                <X size={25} className="text-[#A28B55]" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-neutral-900 border border-[#3C3120]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[#A28B55]">
                  Remove from Featured
                </AlertDialogTitle>
                <AlertDialogDescription className="text-neutral-400">
                  Are you sure you want to remove &quot;{product.name}&quot;
                  from featured products?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border-[#3C3120] text-[#3C3120] hover:bg-neutral-800 hover:text-[#A28B55] hover:border-[#A28B55]">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onRemove(productId)}
                  className="bg-[#3C3120] hover:bg-[#A28B55] text-neutral-200 transform hover:scale-105 transition-all duration-300"
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Hover overlay with even fade across entire image */}
        <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div
            onClick={() => onViewDetails(product)}
            className="flex items-center justify-center text-[#A28B55] transform scale-100 hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <Eye size={25} className="mr-2 text-[#A28B55]" />
            <span className="text-sm font-medium">View Details</span>
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <h3 className="font-medium text-[#A28B55] truncate">{product.name}</h3>
        <p className="text-xs text-neutral-500 truncate mt-1">
          {product.description}
        </p>
      </div>
    </div>
  );
};
