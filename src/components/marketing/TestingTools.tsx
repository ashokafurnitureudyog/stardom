"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  TestTubeIcon,
  TargetIcon,
  ScaleIcon,
  WeightIcon,
  FlameIcon,
  GaugeIcon,
} from "lucide-react";
import { MagicCard } from "../ui/magic-card";

const testingToolsData = [
  {
    Icon: ScaleIcon,
    name: "Indentation Hardness Tester",
    description: "Precise measurement of foam compression characteristics",
    detail: "Digital Computerized Model",
  },
  {
    Icon: WeightIcon,
    name: "Flex Tester",
    description: "Simulates repeated pressing for rubberized coir sheets",
    detail: "240 Cycles per Minute",
  },
  {
    Icon: TargetIcon,
    name: "Shear Fatigue Tester",
    description: "Evaluates polyurethane foam durability",
    detail: "28 Compression Cycles",
  },
  {
    Icon: GaugeIcon,
    name: "Soft Material Thickness Gauge",
    description: "Precise thickness measurement for foam specimens",
    detail: "0-100mm Range",
  },
  {
    Icon: FlameIcon,
    name: "Flammability Tester",
    description: "Comprehensive fire resistance evaluation",
    detail: "PU Foam Safety Testing",
  },
  {
    Icon: TestTubeIcon,
    name: "Ball Resilience Tester",
    description: "Measures foam bounce-back characteristics",
    detail: "500mm Drop Height",
  },
];

export function TestingToolsSection() {
  const { theme } = useTheme();

  return (
    <div className="w-full px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Rigorous testing ensures the highest standards of comfort,
            durability, and safety in every piece of furniture we create.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testingToolsData.map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <MagicCard
                className="cursor-pointer flex-col items-center justify-center p-6 h-full"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
              >
                <div className="flex items-center mb-4">
                  <tool.Icon className="w-10 h-10 text-primary mr-4 group-hover:rotate-12 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                    {tool.name}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-2">{tool.description}</p>
                <div className="text-sm text-primary/80 font-medium">
                  {tool.detail}
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestingToolsSection;
