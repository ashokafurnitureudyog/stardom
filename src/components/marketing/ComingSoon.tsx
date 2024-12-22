import React from 'react';
import Image from 'next/image';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { BackgroundBeams } from '../ui/background-beams';



const ComingSoonPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-10">
          <div className="space-y-6">
            <span className="text-sm tracking-wider text-gray-400">
              LAUNCHING SOON
            </span>
            
            <h1 className="text-6xl font-light tracking-tight font-serif">
              STARDOM
            </h1>
            
            <p className="text-lg text-gray-400 font-light">
              Where timeless elegance meets contemporary luxury.
            </p>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed max-w-md">
            From artisanal craftsmanship to modern design, we create pieces that define the future of luxury living.
          </p>

          <div className="flex items-center space-x-6">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-500 hover:text-white transition-colors duration-200"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="relative aspect-square">
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Stardom Preview"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
      <BackgroundBeams className="z-0"/>
    </div>
  );
};

export default ComingSoonPage;