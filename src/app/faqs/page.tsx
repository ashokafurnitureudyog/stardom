"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "next-view-transitions";
import { faqCategories } from "@/lib/constants/FAQ";
import { Search } from "lucide-react";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { FAQ } from "@/types/ComponentTypes";

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(
    faqCategories[0]?.title || "",
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    (FAQ & { category: string })[]
  >([]);
  const [allFaqs, setAllFaqs] = useState<(FAQ & { category: string })[]>([]);

  // Prepare flat list of all FAQs for searching
  useEffect(() => {
    const flattenedFaqs = faqCategories.flatMap((category) =>
      category.faqs.map((faq) => ({
        ...faq,
        category: category.title,
      })),
    );
    setAllFaqs(flattenedFaqs);
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query),
    );

    setSearchResults(results);
  }, [searchQuery, allFaqs]);

  const scrollToCategory = (categoryId: string): void => {
    document.getElementById(categoryId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveCategory(categoryId);
  };

  return (
    <BaseLayout className="overflow-x-hidden lg:overflow-auto">
      <div className="min-h-screen bg-background font-sans">
        {/* Hero Section */}
        <Section className="pt-24 pb-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-primary/90 uppercase tracking-widest text-xs font-medium mb-4">
              Support Center
            </span>
            <SectionTitle>
              How can we{" "}
              <span className="font-serif italic text-primary">help you?</span>
            </SectionTitle>
            <p className="text-muted-foreground text-lg mx-auto mb-10">
              Find answers to common questions about our premium furniture
              collections, craftsmanship, and services.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground/60" />
              </div>
              <Input
                type="text"
                placeholder="Search for answers..."
                className="w-full py-6 pl-12 pr-4 bg-background border border-input/50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-base"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
              />
            </div>
          </div>
        </Section>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <Section className="py-8 bg-primary/5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-serif mb-6">Search Results</h2>
              <Accordion type="single" collapsible className="w-full">
                {searchResults.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`search-result-${index}`}
                    className="border-b border-input/30 last:border-0 bg-background rounded-lg mb-3 overflow-hidden"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4 px-6 transition-all hover:text-primary">
                      <div>
                        <div className="text-lg font-medium">
                          {faq.question}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Category: {faq.category}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-6 bg-background/80">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </Section>
        )}

        {/* Main Content - Show only if not searching */}
        {(!searchQuery || searchResults.length === 0) && (
          <Section className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
              {/* Navigation Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 space-y-8">
                  <h3 className="text-lg font-medium mb-4 text-foreground/80">
                    Categories
                  </h3>
                  <nav className="space-y-1">
                    {faqCategories.map((category, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToCategory(category.title)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          activeCategory === category.title
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-primary/5"
                        }`}
                      >
                        {category.title}
                      </button>
                    ))}
                  </nav>

                  <div className="pt-6 mt-6 border-t border-input/30">
                    <h3 className="text-lg font-medium mb-4 text-foreground/80">
                      Need more help?
                    </h3>
                    <Button
                      className="w-full justify-start border-input/50 hover:border-primary/50"
                      asChild
                    >
                      <Link href="/contact">Contact Support</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* FAQ Content */}
              <div className="lg:col-span-3 space-y-16">
                {faqCategories.map((category, idx) => (
                  <motion.div
                    key={idx}
                    id={category.title}
                    variants={fadeInUpVariants}
                    className="scroll-mt-32"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <h2 className="text-2xl lg:text-3xl font-light font-serif">
                        {category.title}
                      </h2>
                      <div className="h-px flex-grow bg-primary/20" />
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`${category.title}-${index}`}
                          className="border-b border-input/30 last:border-0"
                        >
                          <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6 transition-all hover:text-primary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed text-base py-4 px-1">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Contact CTA */}
        <Section className="bg-card">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-primary/80 uppercase tracking-widest text-xs font-medium mb-3">
              Personalized assistance
            </span>
            <SectionTitle>
              Still Have{" "}
              <span className="font-serif italic text-primary">Questions?</span>
            </SectionTitle>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              Our dedicated specialists are ready to provide personalized
              guidance and support. Experience the same level of excellence in
              our customer service as you do in our furniture.
            </p>
            <Button
              className="min-w-[240px] h-14 text-lg tracking-wide"
              asChild
            >
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </Section>
      </div>
    </BaseLayout>
  );
};

export default FAQPage;
