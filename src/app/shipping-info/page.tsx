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
import { Clock, CreditCard, Shield } from "lucide-react";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { ShippingCategory } from "@/types/ComponentTypes";

const shippingCategories: ShippingCategory[] = [
  {
    title: "Shipping Times",
    icon: <Clock className="h-5 w-5" />,
    info: [
      {
        title: "Delivery Process",
        details:
          "Our logistics team will contact you to coordinate delivery details. You can also check status by contacting our customer service team.",
      },
      {
        title: "Delivery Windows",
        details:
          "For large furniture items, we'll contact you to schedule a delivery window at your convenience.",
      },
      {
        title: "Delays and Seasonal Factors",
        details:
          "Delivery times depend on your location. Monsoon season, festivals, or other factors may cause delays. We’ll notify you of any significant changes.",
      },
    ],
  },
  {
    title: "Shipping Policies",
    icon: <Shield className="h-5 w-5" />,
    info: [
      {
        title: "Damaged Items",
        details:
          "Inspect all items upon delivery. Any damage must be reported within 48 hours of receipt by contacting our customer service team.",
      },
      {
        title: "Address Changes",
        details:
          "Address changes must be requested before your order ships. Contact our customer service team immediately if you need to update your shipping address.",
      },
      {
        title: "Refused Deliveries",
        details:
          "If a delivery is refused without prior authorization, return shipping costs and a 15% restocking fee may be deducted from your refund.",
      },
      {
        title: "GST Billing",
        details:
          "All shipments include GST invoices. Please provide correct GST details during checkout for business purchases to ensure proper documentation.",
      },
    ],
  },
  {
    title: "Payment Information",
    icon: <CreditCard className="h-5 w-5" />,
    info: [
      {
        title: "Payment Methods",
        details:
          "We accept payments via Cheque, NEFT, UPI, and Cash. For specific instructions, please contact our team before making a transaction.",
      },
      {
        title: "Volume Discounts",
        details:
          "Bulk orders qualify for special pricing and shipping discounts. Contact our sales team for customized quotes.",
      },
      {
        title: "Advance Payment",
        details:
          "Depending on order size and customization, a 25-50% advance payment may be required to initiate production. Balance payment as per agreed terms.",
      },
    ],
  },
];

const ShippingInfoPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(
    shippingCategories[0]?.title || "",
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
              Shipping Information
            </span>
            <SectionTitle>
              Delivery{" "}
              <span className="font-serif italic text-primary">Details</span>
            </SectionTitle>
            <p className="text-muted-foreground text-lg mx-auto mb-10">
              Learn about our shipping options, delivery timeframes, and
              policies for our premium furniture collections throughout India.
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
                  {shippingCategories.map((category, idx) => (
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
                    <Link href="/returns">Return Policy</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Shipping Info Content */}
            <div className="lg:col-span-3 space-y-16">
              {shippingCategories.map((category, idx) => (
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

        {/* Business Solutions CTA */}
        <Section className="bg-card">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-primary/80 uppercase tracking-widest text-xs font-medium mb-3">
              Business Solutions
            </span>
            <SectionTitle>
              Corporate{" "}
              <span className="font-serif italic text-primary">
                Partnerships
              </span>
            </SectionTitle>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              We offer specialized shipping arrangements and flexible payment
              terms for our business clients. Contact our B2B sales team to
              discuss your specific requirements and explore our corporate
              solutions.
            </p>
            <Button
              className="min-w-[240px] h-14 text-lg tracking-wide"
              asChild
            >
              <Link href="/contact">Contact Our B2B Team</Link>
            </Button>
          </div>
        </Section>
      </div>
    </BaseLayout>
  );
};

export default ShippingInfoPage;
