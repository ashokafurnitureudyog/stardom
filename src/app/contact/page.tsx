import BaseLayout from "@/components/layout/BaseLayout";
import { MapPinIcon, Star } from "lucide-react";
import React from "react";

const Contact = () => {
  return (
    <BaseLayout>
<div className="absolute inset-0 opacity-[0.07]">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Grid Lines */}
          <pattern id="grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-primary" />

          {/* Stylized Landmass */}
          <path d="M300,400 Q400,350 500,450 T700,400 T900,450" 
                stroke="currentColor" 
                strokeWidth="0.8" 
                fill="none" 
                className="text-primary"
          />
          
          {/* Abstract Geographic Features */}
          <circle cx="600" cy="400" r="3" className="fill-primary/40" />
          <circle cx="600" cy="400" r="1" className="fill-primary" />
          
          {/* Decorative Elements */}
          <path d="M580,380 L620,420" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />
          <path d="M620,380 L580,420" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />
        </svg>
      </div>

      {/* Content Overlay */}
      <div className="relative min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-4 h-4 text-primary/60" />
                <h3 className="text-primary/80 uppercase tracking-widest text-sm font-medium">
                  Coming Soon
                </h3>
                <Star className="w-4 h-4 text-primary/60" />
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground font-serif">
                A New Landmark
                <span className="block mt-4 text-primary/90 font-light">in Luxury Living</span>
              </h1>
              
              <p className="text-muted-foreground/90 text-lg leading-relaxed max-w-2xl mx-auto">
                Experience the future of premium furniture and design at our upcoming flagship showroom 
                in Chandigarh.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-8">
              <div className="flex items-center gap-3 text-primary/80">
                <MapPinIcon className="h-5 w-5" />
                <span className="text-lg">Plot No. 304, Industrial Area Phase 2, Chandigarh, India</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </BaseLayout>
  );
};

export default Contact;
