"use client";
import React, { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Sparkles, Construction, Timer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PageComingSoon = ({
  pageName = "This Section",
  returnPath = "/",
  expectedDate = "Soon",
}) => {
  const [, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const messages = [
    "Crafting Excellence",
    "Perfecting Details",
    "Design in Progress",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const decorativeElements = Array(3)
    .fill(null)
    .map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-primary/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.4, 0.2, 0.4],
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          delay: i * 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: `${(i + 2) * 100}px`,
          height: `${(i + 2) * 100}px`,
        }}
      />
    ));

  return (
    <div className="min-h-[80vh] w-full bg-background/95 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Animated background gradients */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.08),transparent_50%)]"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--primary-rgb),0.08),transparent_50%)]"
        animate={{
          opacity: [0.8, 0.5, 0.8],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Decorative rotating circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {decorativeElements}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl"
      >
        <Card className="bg-card/40 backdrop-blur-xl border-primary/20 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <motion.div
              className="text-center space-y-8"
              initial="initial"
              animate="animate"
              variants={{
                animate: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {/* Header Section */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-8 h-8 text-primary" />
                </motion.div>

                <motion.h3
                  className="text-primary/90 uppercase tracking-widest text-sm font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Refinement in Progress
                </motion.h3>

                <motion.h2
                  className="text-3xl md:text-4xl font-light tracking-tight text-foreground font-serif"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {pageName}
                  <Separator className="max-w-[120px] mx-auto my-6 bg-primary/20" />
                </motion.h2>
              </div>

              {/* Animated Status Message */}
              <div className="h-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-muted-foreground/80"
                  >
                    {messages[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 text-muted-foreground/80">
                  <Construction className="w-4 h-4" />
                  <span className="text-sm">In Development</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground/80">
                  <Timer className="w-4 h-4" />
                  <span className="text-sm">Expected: {expectedDate}</span>
                </div>
              </div>

              {/* Return Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link href={returnPath} passHref>
                  <Button
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/5 text-primary/80 group relative overflow-hidden"
                  >
                    <motion.span
                      className="absolute inset-0 bg-primary/5"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    Return to Homepage
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PageComingSoon;
