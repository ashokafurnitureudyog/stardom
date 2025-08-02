"use client";
import React from "react";
import { motion } from "framer-motion";
import { Infinity } from "lucide-react";
import NumberTicker from "@/components/ui/number-ticker";
import { RainbowButton } from "@/components/ui/rainbow-button";

const LegacySection = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 py-24 px-6 relative overflow-hidden font-sans">
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,37,37,0.3)_0%,rgba(0,0,0,0.4)_100%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title Section */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-serif tracking-wide mb-4">
            Our Legacy of Luxury
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Heritage Section */}
          <motion.div
            className="space-y-6"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl text-white font-light tracking-wide mb-8">
              Heritage of Excellence
            </h3>
            <p className="text-lg leading-relaxed text-gray-400 font-light">
              Since 1996, Ashoka Furniture Udyog has been crafting exceptional
              furniture pieces. In 2014, we embarked on a new journey with
              Stardom, elevating our legacy of craftsmanship to new heights of
              luxury and sophistication.
            </p>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10"
            {...fadeIn}
            transition={{ delay: 0.4 }}
          >
            <div className="flex gap-8">
              <div>
                <div>
                  <NumberTicker
                    value={27}
                    className="text-5xl md:text-6xl text-white font-light mb-4"
                  />
                </div>
                <div className="text-lg text-gray-400 font-light tracking-wide">
                  Years of Excellence
                </div>
              </div>
              <div>
                <div>
                  <NumberTicker
                    value={9}
                    className="text-5xl md:text-6xl text-white font-light mb-4"
                  />
                </div>
                <div className="text-lg text-gray-400 font-light tracking-wide">
                  Years as Stardom
                </div>
              </div>
            </div>
          </motion.div>

          {/* Design Card */}
          <motion.div
            className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10"
            {...fadeIn}
            transition={{ delay: 0.6 }}
          >
            <Infinity className="w-12 h-12 text-white/80 mb-4" />
            <div className="text-lg text-gray-400 font-light tracking-wide">
              Limitless Design Possibilities
            </div>
          </motion.div>

          {/* Modern Luxury Section */}
          <motion.div
            className="space-y-6"
            {...fadeIn}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl text-white font-light tracking-wide mb-8">
              Modern Luxury Redefined
            </h3>
            <p className="text-lg leading-relaxed text-gray-400 font-light">
              Stardom is more than furniture; it&apos;s an embodiment of
              sophisticated living. Each piece is meticulously crafted, marrying
              time-honored artisanship with contemporary design innovation.
            </p>
          </motion.div>
        </div>

        {/* Footer Section */}
        <motion.div
          className="text-center mt-24 space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto">
            Coming soon, experience the culmination of our artisanal heritage
            and modern design philosophy.
          </p>

          <RainbowButton className="font-sans">
            Discover More Soon
          </RainbowButton>
        </motion.div>
      </div>
    </div>
  );
};

export default LegacySection;
