"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { MagicCard } from "../ui/magic-card";
import { TestingTool } from "@/types/ComponentTypes";
import { testingToolsData } from "@/lib/constants/ToolsInfo";

const TestingToolCard = ({
  tool,
  index,
}: {
  tool: TestingTool;
  index: number;
}) => {
  const { theme } = useTheme();
  const { Icon, name, description, detail } = tool;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <MagicCard
        className="flex-col items-center justify-center p-6 h-full"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <div className="flex items-center mb-4">
          <Icon
            className="w-10 h-10 text-primary mr-4 group-hover:rotate-12 transition-transform duration-300"
            aria-hidden="true"
          />
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
            {name}
          </h3>
        </div>
        <p className="text-muted-foreground mb-2">{description}</p>
        <div className="text-sm text-primary/80 font-medium">{detail}</div>
      </MagicCard>
    </motion.div>
  );
};

export function TestingToolsSection() {
  const tools = testingToolsData;

  return (
    <section
      className="w-full px-4 font-sans pb-16"
      aria-labelledby="testing-tools-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <h2 id="testing-tools-heading" className="sr-only">
            Testing Tools
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Our state-of-the-art testing facility employs precision engineering
            to ensure exceptional quality, longevity, and refined comfort in
            every product we craft.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, idx) => (
            <TestingToolCard key={`tool-${idx}`} tool={tool} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestingToolsSection;
