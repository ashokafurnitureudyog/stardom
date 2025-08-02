"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import NumberTicker from "../ui/number-ticker";
import { motion } from "framer-motion";
import { StatisticProps } from "@/types/ComponentTypes";
import { ArrowRightIcon } from "lucide-react";
import { BasicCompanyInfo as fallbackCompanyInfo } from "@/lib/constants/CompanyInfo";
import { Link } from "next-view-transitions";
import { useCompanyData } from "@/hooks/useCompanyData";

const Statistic: React.FC<StatisticProps> = ({ value, label }) => (
  <motion.div whileHover={{ scale: 1.02 }} className="relative group">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg transform -rotate-1" />
    <div className="relative p-8 border-l-2 border-primary/30">
      <NumberTicker
        className="text-6xl font-light text-foreground font-serif"
        value={value}
      />
      <span className="text-primary text-5xl font-serif ml-1">+</span>
      <p className="text-muted-foreground/90 mt-3 text-lg tracking-wide">
        {label}
      </p>
    </div>
  </motion.div>
);

const ImagePanel: React.FC<{ src: string; index: number }> = ({
  src,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.2 }}
    className="relative overflow-hidden rounded-lg"
  >
    <img
      src={src}
      alt="Legacy showcase"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  </motion.div>
);

const LegacySection: React.FC = () => {
  const { companyInfo } = useCompanyData();
  const established =
    companyInfo?.established || fallbackCompanyInfo.established;

  const images: string[] = [
    "https://images.unsplash.com/photo-1728633826211-4e04854e344e",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    "https://images.unsplash.com/photo-1595846519845-68e298c2edd8",
    "https://images.unsplash.com/photo-1594235048794-fae8583a5af5",
  ];

  return (
    <div className="w-full bg-background py-32 md:py-40 px-8 md:px-16 font-sans relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full">
                <div className="h-px w-8 bg-primary/40" />
                <h3 className="text-primary/90 uppercase tracking-widest text-sm font-medium">
                  Heritage of Excellence
                </h3>
              </div>

              <h2 className="text-5xl lg:text-7xl font-light tracking-tight text-foreground">
                <span className="font-serif">Crafting</span>{" "}
                <span className="text-primary/90 font-serif italic">
                  Elegance
                </span>
                <div className="text-4xl lg:text-5xl mt-4 flex items-center gap-4">
                  <span className="font-light">Since {established}</span>
                </div>
              </h2>

              <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
                From our inception as Ashoka Furniture Udyog to our position as
                an industry leader in luxury office furniture, we have
                maintained an unwavering dedication to artistry and innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Statistic value={28} label="Years of Excellence" />
              <Statistic value={1000} label="Projects" />
            </div>

            <Button
              variant="ghost"
              className="text-lg group px-8 py-6 hover:bg-primary/5"
              asChild
            >
              <div>
                <Link href="/heritage">Explore Our Legacy</Link>
                <ArrowRightIcon className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-6 group">
              {images.map((src, index) => (
                <ImagePanel key={src} src={src} index={index} />
              ))}
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary/20" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LegacySection;
