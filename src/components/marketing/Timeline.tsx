"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { TimelineEvent } from "@/types/ComponentTypes";

export const Timeline = ({ events }: { events: TimelineEvent[] }) => (
  <div className="relative">
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border" />

    <div className="space-y-24">
      {events.map((event, index) => (
        <motion.div
          key={event.year}
          initial="initial"
          whileInView="animate"
          variants={fadeInUpVariants}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className={cn(
            "flex items-center",
            index % 2 === 0 ? "flex-row" : "flex-row-reverse",
          )}
        >
          <div className="w-1/2 pr-12 text-right">
            <h3 className="text-5xl font-light text-primary mb-4">
              {event.year}
            </h3>
            <h4 className="text-2xl font-light mb-2">{event.title}</h4>
            <p className="text-muted-foreground">{event.description}</p>
          </div>
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="w-1/2 pl-12" />
        </motion.div>
      ))}
    </div>
  </div>
);
