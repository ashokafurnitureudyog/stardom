import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

export const CultureGallery = () => (
  <Carousel className="w-full">
    <CarouselContent>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1676276383599-478e31770aac"
                alt={`Culture ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);
