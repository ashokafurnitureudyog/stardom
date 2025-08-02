"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { TeamMember } from "@/types/ComponentTypes";

export const TeamSection = ({ members }: { members: TeamMember[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {members.map((member, index) => (
      <motion.div
        key={member.name}
        initial="initial"
        whileInView="animate"
        variants={fadeInUpVariants}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        <Card className="overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-80 object-cover"
          />
          <CardHeader>
            <CardTitle className="text-2xl font-light">{member.name}</CardTitle>
            <CardDescription className="font-serif italic text-primary">
              {member.role}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{member.bio}</p>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
);
