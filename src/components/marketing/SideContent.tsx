"use client";

import React, { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ, SocialLink } from "@/types/ComponentTypes";

interface SideContentProps {
  faqs: FAQ[];
  socialLinks: SocialLink[];
  className?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const LoadingSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-32 w-full" />
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="flex gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12 w-12 rounded-full" />
        ))}
      </div>
    </div>
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  </div>
);

export const SideContent: React.FC<SideContentProps> = ({
  faqs,
  socialLinks,
  className,
}) => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <AnimatePresence>
        <div className={cn("space-y-12", className)}>
          {/* Emergency Support */}
          <motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.1 }}>
            <Alert className="border-primary/20 bg-primary/5 backdrop-blur-sm hover:bg-primary/10 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <AlertTitle className="text-lg font-medium mb-2 text-primary">
                    24/7 Customer Support
                  </AlertTitle>
                  <AlertDescription className="text-muted-foreground leading-relaxed">
                    For urgent assistance outside business hours:
                    <br />
                    <a
                      href="tel:+919876543210"
                      className="font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Emergency Hotline: +91 98887 23681
                    </a>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </motion.div>

          {/* Social Links */}
          <motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.2 }}>
            <h2 className="text-2xl lg:text-3xl font-light mb-8 font-serif">
              Connect with{" "}
              <span className="font-serif italic text-primary">Us</span>
            </h2>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-input bg-background hover:border-primary hover:text-primary hover:scale-110 hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div {...fadeInUp} transition={{ duration: 0.4, delay: 0.3 }}>
            <h3 className="text-2xl lg:text-3xl font-light mb-8 flex items-center gap-2 font-serif">
              Frequently Asked{" "}
              <span className="font-serif italic text-primary relative">
                Questions
              </span>
            </h3>
            <Accordion type="single" collapsible className="">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-b border-input/50"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6 transition-all hover:text-primary">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {faq.question}
                    </motion.span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </AnimatePresence>
    </Suspense>
  );
};
