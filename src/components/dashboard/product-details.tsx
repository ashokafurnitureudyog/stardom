"use client";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/ComponentTypes";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh]">
      <div className="relative h-full">
        <ImageCarousel
          images={product.images}
          aspectRatio="square"
          fill
          indicators="counter"
        />
      </div>

      <ScrollArea className="h-[70vh] pr-4">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.category && (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {product.category}
                </Badge>
              )}
              {product.product_collection && (
                <Badge
                  variant="outline"
                  className="text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 border-gray-200 font-medium"
                >
                  {product.product_collection}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-3">Features</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {product.colors && product.colors.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-3">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="text-sm text-muted-foreground">
            <p>ID: {product.id || product.$id}</p>
            {product.$createdAt && (
              <p>Added: {new Date(product.$createdAt).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
