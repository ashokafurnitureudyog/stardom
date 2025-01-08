/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, FingerprintIcon, RockingChairIcon, SmartphoneChargingIcon, UsersIcon } from 'lucide-react';

const features = [
  {
    Icon: SmartphoneChargingIcon,
    name: "Luxury Executive Desks",
    description: "Handcrafted masterpieces for distinguished leaders",
    detail: "Imported Italian Wood",
    href: "#",
    cta: "Discover More",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174" 
          alt="Luxury Executive Desk" 
          className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-neutral-900/30 group-hover:bg-neutral-900/20 transition-all duration-500" />
      </div>
    ),
  },
  {
    Icon: UsersIcon,
    name: "Premium Conference Solutions",
    description: "Where visionary decisions take shape",
    detail: "Smart Integration Ready",
    href: "#",
    cta: "Discover More",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407" 
          alt="Conference Room" 
          className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-neutral-900/30 group-hover:bg-neutral-900/20 transition-all duration-500" />
      </div>
    ),
  },
  {
    Icon: FingerprintIcon,
    name: "Elite Ergonomic Seating",
    description: "Precision-engineered comfort for excellence",
    detail: "German Engineering",
    href: "#",
    cta: "Discover More",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1681418659069-eef28d44aeab" 
          alt="Ergonomic Chair" 
          className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-neutral-900/30 group-hover:bg-neutral-900/20 transition-all duration-500" />
      </div>
    ),
  },
  {
    Icon: RockingChairIcon,
    name: "Designer Lounge Collection",
    description: "Contemporary comfort meets timeless sophistication",
    detail: "Artisan Crafted",
    href: "#",
    cta: "Discover More",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1464029902023-f42eba355bde" 
          alt="Lounge Collection" 
          className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-neutral-900/30 group-hover:bg-neutral-900/20 transition-all duration-500" />
      </div>
    ),
  },
];

export function FeaturedProducts() {
  return (
    <div className="w-full py-40 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8 font-serif">
            Featured <span className="font-normal">Products</span>
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Experience unparalleled luxury with our masterfully curated collection,
            where each piece embodies timeless elegance and refined sophistication.
          </p>
        </div>

        <BentoGrid className="max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <BentoCard
              key={idx} 
              {...feature}
              className={`${feature.className} group overflow-hidden border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-500`}
            />
          ))}
        </BentoGrid>

        <div className="text-center mt-24">
          <Button 
            variant="link" 
            className="text-neutral-600 hover:text-neutral-400 text-lg font-light tracking-wide"
          >
            View Full Collection <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;