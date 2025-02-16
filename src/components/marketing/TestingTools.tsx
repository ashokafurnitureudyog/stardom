"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  TestTubeIcon,
  TargetIcon,
  ScaleIcon,
  ActivityIcon,
  LayersIcon,
  GaugeIcon,
} from "lucide-react";
import { MagicCard } from "../ui/magic-card";

const testingToolsData = [
  {
    Icon: ScaleIcon,
    name: "Indentation Hardness Tester",
    description:
      "Advanced digital measurement system for precise compression analysis",
    detail: "High-Precision Digital Interface",
  },
  {
    Icon: ActivityIcon,
    name: "DeMattia Upper Flex Tester",
    description:
      "Industrial-grade flexibility assessment for leatherette durability",
    detail: "Advanced 360° Motion Analysis",
  },
  {
    Icon: TargetIcon,
    name: "Shear Fatigue Tester",
    description:
      "State-of-the-art evaluation of material endurance under stress",
    detail: "Precision-Engineered Testing Cycles",
  },
  {
    Icon: GaugeIcon,
    name: "Bursting Strength Tester",
    description: "Premium hydraulic system for material integrity assessment",
    detail: "Digital Pressure Monitoring",
  },
  {
    Icon: LayersIcon,
    name: "Martindale Abrasion Tester",
    description: "Superior surface wear and durability evaluation system",
    detail: "Multi-Station Testing Platform",
  },
  {
    Icon: TestTubeIcon,
    name: "Ball Resilience Tester",
    description: "High-precision rebound characteristics measurement",
    detail: "Computer-Aided Analysis",
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
            Our state-of-the-art testing facility employs precision engineering
            to ensure exceptional quality, longevity, and refined comfort in
            every product we craft.
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
                className="flex-col items-center justify-center p-6 h-full"
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
