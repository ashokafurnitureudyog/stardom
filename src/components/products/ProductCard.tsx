import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/ComponentTypes";
import { Link } from "next-view-transitions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, description, images, product_collection } = product;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative">
      {/* Glow effect container */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-75 transition-all duration-700 group-hover:duration-500" />

      {/* Inner glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />

      <Card className="relative overflow-hidden bg-background/95 border border-primary/10 group-hover:border-primary/30 transition-all duration-500 h-full flex flex-col">
        <div className="aspect-[4/3] w-full relative overflow-hidden">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <img
                      onError={() => setImgError(true)}
                      src={
                        imgError
                          ? "https://images.unsplash.com/photo-1610513320995-1ad4bbf25e55"
                          : image
                      }
                      alt={`${name} - image ${index + 1}`}
                      className="object-cover w-full h-full aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-70 transition-opacity" />
            <CarouselNext className="right-2 opacity-0 group-hover:opacity-70 transition-opacity" />
          </Carousel>
          <div className="absolute bottom-0 left-0 p-3 z-10">
            <Badge
              variant="secondary"
              className="bg-background/80 hover:bg-background/90"
            >
              {product_collection
                ? product_collection.charAt(0).toUpperCase() +
                  product_collection.slice(1)
                : "Uncategorized"}
            </Badge>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-light text-foreground font-serif">
            {name}
          </h3>
          <p className="text-muted-foreground/80 text-sm mt-2 line-clamp-2 flex-grow">
            {description}
          </p>

          <div className="mt-4 pt-4 border-t border-primary/10">
            <Link href={`/products/${id}`}>
              <button className="w-full py-2 border border-primary/20 text-primary/90 hover:text-primary hover:border-primary/40 transition-all duration-300 font-light">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};
