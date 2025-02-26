import { TestingTool } from "@/types/ComponentTypes";
import {
  TestTubeIcon,
  TargetIcon,
  ScaleIcon,
  ActivityIcon,
  LayersIcon,
  GaugeIcon,
} from "lucide-react";
export const testingToolsData: TestingTool[] = [
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
