"use client";

import { useState } from "react";
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
import { Link } from "next-view-transitions";
import { FileText, AlertCircle, Truck } from "lucide-react";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { ReturnCategory } from "@/types/ComponentTypes";

const returnsCategories: ReturnCategory[] = [
  {
    title: "Return Eligibility",
    icon: <FileText className="h-5 w-5" />,
    info: [
      {
        title: "Manufacturing Defects Only",
        details:
          "We only accept returns for items with genuine manufacturing defects that cannot be repaired. If a defect is identified and deemed irreparable, we will replace the item at no additional cost.",
      },
      {
        title: "Return Assistance",
        details:
          "To request a return due to a manufacturing defect, please contact our customer support team. They will guide you through the verification and return process.",
      },
    ],
  },
  {
    title: "Defective Items",
    icon: <AlertCircle className="h-5 w-5" />,
    info: [
      {
        title: "Manufacturing Defects",
        details:
          "Items with verifiable manufacturing defects are eligible for free repair or, if not repairable, replacement. Defects must be documented and reported as soon as they are discovered.",
      },
      {
        title: "Damage During Shipping",
        details:
          "If your item is damaged during transit, please report it within 48 hours of delivery. We'll arrange repair or replacement as applicable.",
      },
      {
        title: "Warranty Claims",
        details:
          "All products are covered under a 1-year warranty for structural and mechanical defects. Our team will assess whether the defect qualifies for repair or replacement.",
      },
      {
        title: "Repair Services",
        details:
          "Where possible, our service team will attempt to repair defective products before considering replacement. Repairs may be done on-site or off-site based on your location.",
      },
    ],
  },
  {
    title: "Return Shipping",
    icon: <Truck className="h-5 w-5" />,
    info: [
      {
        title: "Shipping for Defective Returns",
        details:
          "If a manufacturing defect is confirmed, we will arrange pickup and cover return shipping costs. This also applies to any replacement shipments.",
      },
      {
        title: "Pickup Coordination",
        details:
          "Our logistics team will coordinate a pickup time for the defective item and ensure the replacement (if required) is delivered promptly.",
      },
      {
        title: "Packaging Requirements",
        details:
          "Please ensure the item is packaged securely for pickup. If packaging is unavailable, inform our team in advance so alternate arrangements can be made.",
      },
    ],
  },
];

const ReturnsInfoPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(
    returnsCategories[0]?.title || "",
  );

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
              Returns Information
            </span>
            <SectionTitle>
              Return{" "}
              <span className="font-serif italic text-primary">Policy</span>
            </SectionTitle>
            <p className="text-muted-foreground text-lg mx-auto mb-10">
              Learn about our return process, eligibility criteria, and policies
              for our premium furniture collections.
            </p>
          </div>
        </Section>

        {/* Main Content */}
        <Section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <h3 className="text-lg font-medium mb-4 text-foreground/80">
                  Information
                </h3>
                <nav className="space-y-1">
                  {returnsCategories.map((category, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToCategory(category.title)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                        activeCategory === category.title
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-primary/5"
                      }`}
                    >
                      {category.icon}
                      {category.title}
                    </button>
                  ))}
                </nav>

                <div className="pt-6 mt-6 border-t border-input/30">
                  <h3 className="text-lg font-medium mb-4 text-foreground/80">
                    Need more help?
                  </h3>
                  <Button
                    className="w-full justify-start border-input/50 hover:border-primary/50 mb-2"
                    asChild
                  >
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                  <Button
                    className="w-full justify-start border-input/50 hover:border-primary/50"
                    variant="outline"
                    asChild
                  >
                    <Link href="/shipping-info">Shipping Information</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Returns Info Content */}
            <div className="lg:col-span-3 space-y-16">
              {returnsCategories.map((category, idx) => (
                <motion.div
                  key={idx}
                  id={category.title}
                  variants={fadeInUpVariants}
                  className="scroll-mt-32"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-2xl lg:text-3xl font-light font-serif flex items-center gap-3">
                      {category.icon}
                      {category.title}
                    </h2>
                    <div className="h-px flex-grow bg-primary/20" />
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {category.info.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.title}-${index}`}
                        className="border-b border-input/30 last:border-0"
                      >
                        <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6 transition-all hover:text-primary">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base py-4 px-1">
                          {item.details}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Contact CTA */}
        <Section className="bg-card">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-primary/80 uppercase tracking-widest text-xs font-medium mb-3">
              Personalized Support
            </span>
            <SectionTitle>
              Questions About{" "}
              <span className="font-serif italic text-primary">Returns?</span>
            </SectionTitle>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              Our B2B support team is ready to assist with your specific return
              requirements. For established business relationships, we offer
              customized return solutions tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="min-w-[200px] h-14 text-lg tracking-wide"
                asChild
              >
                <Link href="/contact">Contact Support Team</Link>
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </BaseLayout>
  );
};

export default ReturnsInfoPage;
