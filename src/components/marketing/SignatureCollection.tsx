import React from 'react';
import { Button } from "@/components/ui/button";
import { HomeIcon, Package, Clock } from "lucide-react";

const SignatureCollection = () => {
  const products = [
    {
      id: 'x1',
      title: 'Executive Desk X1',
      subtitle: 'Refined Sophistication',
      image: 'https://i5.walmartimages.com/seo/Tribesigns-71-inch-Executive-Desk-L-Shaped-Desk-with-Cabinet-Storage-Executive-Office-Desk-with-Shelves_3f3a202b-8fbe-46cb-acbf-8ba6d0db7181.17aeb33a524344acbec24e5bf796e1c1.jpeg'
    },
    {
      id: 'c2',
      title: 'Conference Table C2',
      subtitle: 'Collaborative Excellence',
      image: 'https://images-cdn.ubuy.co.in/634d1bf344fe685ddf68cc3e-tribesigns-8ft-rectangle-conference.jpg'
    },
    {
      id: 'e3',
      title: 'Ergonomic Chair E3',
      subtitle: 'Comfort Redefined',
      image: 'https://astride.furniture/cdn/shop/files/Chair_Info_1B_500x.jpg?v=1735100193'
    }
  ];

  const features = [
    {
      icon: <HomeIcon className="w-6 h-6 text-primary/80" />,
      title: "Customization",
      description: "Tailor each piece to your needs"
    },
    {
      icon: <Package className="w-6 h-6 text-primary/80" />,
      title: "3D Visualization",
      description: "Preview in your space"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary/80" />,
      title: "Quick Delivery",
      description: "4-6 weeks lead time"
    }
  ];

  return (
    <div className="w-full bg-background py-20 md:py-32 px-8 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-primary/80 uppercase tracking-widest text-sm font-medium mb-6">
            Curated Excellence
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground font-serif mb-6">
            Signature Collection
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our most prestigious pieces, where form meets function in perfect harmony
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group relative overflow-hidden rounded-sm bg-gradient-to-br from-accent/5 to-primary/5 transition-all duration-700 hover:from-accent/10 hover:to-primary/10"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-background/95 via-background/90 to-transparent">
                <h3 className="text-2xl font-extralight text-foreground mb-3">
                  {product.title}
                </h3>
                <p className="text-primary tracking-wider uppercase text-sm mb-2">
                  {product.subtitle}
                </p>
              </div>
              <div className="absolute top-0 left-0 right-0 p-6 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Button variant="ghost" className="bg-background/80 hover:bg-background backdrop-blur-sm">
                  Explore
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="border border-primary/10 p-8 flex flex-col items-center text-center group hover:bg-primary/5 transition-all duration-300"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-lg hover:bg-primary/5 group px-6"
          >
            Explore Full Catalog
            <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignatureCollection;