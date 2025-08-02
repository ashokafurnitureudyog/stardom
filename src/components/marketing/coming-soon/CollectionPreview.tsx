"use client";
import React from "react";
import { motion } from "framer-motion";
import { Crown, Briefcase, Minimize2 } from "lucide-react";

const CollectionPreview = () => {
  const collections = [
    {
      title: "The Royal Suite",
      icon: Crown,
      description: "Timeless elegance meets royal sophistication",
      gradient: "from-amber-500/20 to-transparent",
    },
    {
      title: "The Executive Collection",
      icon: Briefcase,
      description: "Where power meets contemporary luxury",
      gradient: "from-purple-500/20 to-transparent",
    },
    {
      title: "The Minimalist Series",
      icon: Minimize2,
      description: "Refined simplicity in its purest form",
      gradient: "from-emerald-500/20 to-transparent",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300 py-32 px-6 relative font-sans">
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(64,64,64,0.1)_0%,rgba(0,0,0,0.8)_100%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-white font-serif tracking-wider mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Preview Our Collection
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            A glimpse into the future of luxury furniture. Each piece is a
            masterpiece in waiting.
          </p>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-12" />
        </motion.div>

        {/* Collection Cards */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${collection.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl`}
              />

              <div className="relative backdrop-blur-md bg-white/[0.03] rounded-2xl p-10 h-[450px] border border-white/5 overflow-hidden transition-all duration-700 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-white/5">
                {/* Icon */}
                <collection.icon className="w-10 h-10 text-white/90 mb-8 transition-transform duration-500 group-hover:scale-110" />

                {/* Title */}
                <h3 className="text-3xl text-white font-light tracking-wider mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {collection.title}
                </h3>

                {/* Hidden Description - Reveals on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-12 transition-all duration-700"
                >
                  <p className="text-xl text-gray-200 font-light leading-relaxed">
                    {collection.description}
                  </p>
                </motion.div>

                {/* Coming Soon Tag */}
                <div className="absolute bottom-10 left-10">
                  <span className="text-sm text-gray-400 tracking-[0.2em] uppercase font-light">
                    Coming Soon
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-xl text-gray-400 font-light italic tracking-wide">
            Each piece tells a story of craftsmanship and elegance
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionPreview;
