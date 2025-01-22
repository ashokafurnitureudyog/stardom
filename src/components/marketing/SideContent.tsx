"use client"
import React from 'react';
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ, SocialLink } from '@/types/ComponentTypes';

interface SideContentProps {
  faqs: FAQ[];
  socialLinks: SocialLink[];
}

export const SideContent: React.FC<SideContentProps> = ({ faqs, socialLinks }) => {
  return (
    <div className="space-y-12">
      {/* Emergency Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Alert className="border-primary/20 bg-primary/5">
          <AlertTitle className="text-lg font-medium mb-2">
            24/7 Customer Support
          </AlertTitle>
          <AlertDescription className="text-muted-foreground">
            For urgent assistance outside business hours:
            <br />
            Emergency Hotline: +91 98765 43210
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-2xl font-light mb-6">
          Connect <span className="font-serif italic text-primary">With Us</span>
        </h3>
        <div className="flex gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-input hover:border-primary hover:text-primary hover:scale-110 transition-all duration-200"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3 className="text-2xl font-light mb-6">
          Frequently Asked <span className="font-serif italic text-primary">Questions</span>
        </h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
};
