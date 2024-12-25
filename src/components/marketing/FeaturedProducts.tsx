"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RockingChairIcon } from '../ui/rocking-chair';
import { UsersIcon } from '../ui/users';
import { FingerprintIcon } from '../ui/fingerprint';
import { ArrowRightIcon } from '../ui/arrow-right';

const FeaturedProducts = () => {
  const products = [
    {
      icon: <RockingChairIcon />,
      title: "Luxury Executive Desks",
      description: "Handcrafted masterpieces for distinguished leaders",
      detail: "Imported Italian Wood"
    },
    {
      icon: <UsersIcon />,
      title: "Premium Conference Solutions",
      description: "Where visionary decisions take shape",
      detail: "Smart Integration Ready"
    },
    {
      icon: <FingerprintIcon />,
      title: "Elite Ergonomic Seating",
      description: "Precision-engineered comfort for excellence",
      detail: "German Engineering"
    }
  ];

  return (
    <div className="w-full py-40 px-4 font-serif">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
            Signature <span className="font-normal">Collections</span>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Experience unparalleled luxury with our masterfully curated collection,
            where each piece embodies timeless elegance and refined sophistication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <div key={index} className="group h-full">
              <Card className="border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-500 rounded-none h-full flex flex-col">
                <CardHeader className="text-center pt-16 pb-12 px-8 flex-grow">
                  <div className="mx-auto mb-10 transform group-hover:scale-110 transition-transform duration-500">
                    {product.icon}
                  </div>
                  <CardTitle className="text-2xl mb-6 font-light tracking-wide">
                    {product.title}
                  </CardTitle>
                  <p className="text-neutral-600 leading-relaxed">
                    {product.description}
                  </p>
                </CardHeader>
                <CardContent className="text-center pb-16 px-8">
                  <p className="text-sm uppercase tracking-widest text-neutral-500 mb-8">
                    {product.detail}
                  </p>
                  <Button 
                    variant="outline" 
                    className="rounded-none px-8 py-6 border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300"
                  >
                    Discover More
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-24">
          <Button 
            variant="link" 
            className="text-neutral-800 hover:text-neutral-600 text-lg font-light tracking-wide"
          >
            View Full Collection <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;