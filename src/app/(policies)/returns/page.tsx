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
import {
  RotateCcw,
  FileText,
  AlertCircle,
  Truck,
  Calendar,
  Phone,
} from "lucide-react";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { ReturnCategory } from "@/types/ComponentTypes";

const returnsCategories: ReturnCategory[] = [
  {
    title: "Return Eligibility",
    icon: <FileText className="h-5 w-5" />,
    info: [
      {
        title: "Standard Returns",
        details:
          "Items must be in original condition, unused, and with all original packaging and documentation. Returns must be initiated within 7 days of delivery for standard items.",
      },
      {
        title: "Custom Orders",
        details:
          "Custom-made furniture items with client-specified dimensions, materials, or finishes are not eligible for return unless there's a manufacturing defect.",
      },
      {
        title: "Display & Clearance Items",
        details:
          "Items marked as 'display', 'as-is', or 'clearance' at the time of purchase cannot be returned unless specifically agreed upon in writing before purchase.",
      },
      {
        title: "Project Orders",
        details:
          "For large project orders (more than 10 items), special return terms may apply as specified in your purchase agreement or contract.",
      },
    ],
  },
  {
    title: "Return Process",
    icon: <RotateCcw className="h-5 w-5" />,
    info: [
      {
        title: "Initiating a Return",
        details:
          "To initiate a return, contact our customer service team within 7 days of delivery. A return authorization number (RAN) must be issued before any item can be returned.",
      },
      {
        title: "Documentation Required",
        details:
          "All returns require original purchase documentation, including invoice number and GST details. Please have these ready when contacting our customer service team.",
      },
      {
        title: "Inspection Process",
        details:
          "Our team will schedule an inspection of the items to be returned. This may involve a visit to your location or requesting photographs of the items in question.",
      },
      {
        title: "Return Approval",
        details:
          "Once approved, you will receive return instructions and shipping labels if applicable. Unauthorized returns will not be accepted.",
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
          "Items with manufacturing defects are eligible for return, replacement, or repair within 30 days of delivery. Defects must be documented and reported immediately upon discovery.",
      },
      {
        title: "Damage During Shipping",
        details:
          "Damage that occurs during shipping must be noted on the delivery receipt and reported to our customer service team within 48 hours of delivery.",
      },
      {
        title: "Warranty Claims",
        details:
          "Different furniture categories carry different warranty periods. Office chairs (1 year), desks and tables (2 years), storage solutions (3 years), and custom executive furniture (5 years).",
      },
      {
        title: "Repair Services",
        details:
          "For minor defects, we offer repair services which may be conducted at your location depending on the nature of the issue and your location in India.",
      },
    ],
  },
  {
    title: "Return Shipping",
    icon: <Truck className="h-5 w-5" />,
    info: [
      {
        title: "Shipping Arrangements",
        details:
          "For approved returns, our logistics team will coordinate pickup from your location. Please ensure items are properly packed in their original packaging if available.",
      },
      {
        title: "Return Shipping Costs",
        details:
          "For returns due to customer preference or ordering error, the customer is responsible for return shipping costs. For defective or incorrectly shipped items, we cover the shipping costs.",
      },
      {
        title: "Pickup Scheduling",
        details:
          "Our team will coordinate with you to schedule a convenient pickup time during business hours (Mon-Fri, 10 AM to 6 PM).",
      },
      {
        title: "Preparing Items for Return",
        details:
          "All items must be disassembled (if they were delivered assembled), properly packaged, and ready for pickup at the scheduled time. Additional charges may apply if our team needs to disassemble or package items.",
      },
    ],
  },
  {
    title: "Refunds & Credits",
    icon: <Calendar className="h-5 w-5" />,
    info: [
      {
        title: "Refund Processing",
        details:
          "Refunds are processed within 10-15 business days after the returned items have been received and inspected at our warehouse. For B2B clients, credits may be applied to future purchases.",
      },
      {
        title: "Restocking Fees",
        details:
          "A restocking fee of 20% may apply to returns due to customer preference. This fee is waived for defective items or if we shipped incorrect items.",
      },
      {
        title: "Credit Memos",
        details:
          "Business clients with ongoing accounts may opt for credit memos instead of refunds, which can be applied to future purchases within 12 months.",
      },
      {
        title: "GST Adjustments",
        details:
          "Refunds include appropriate GST adjustments. A credit note with revised GST will be issued for all returns processed.",
      },
    ],
  },
  {
    title: "Special Considerations",
    icon: <Phone className="h-5 w-5" />,
    info: [
      {
        title: "Long-term Business Partners",
        details:
          "For established business relationships, we offer more flexible return policies. Please contact your account manager to discuss specific arrangements.",
      },
      {
        title: "Volume Purchases",
        details:
          "For bulk orders exceeding ₹10 lakhs, special return terms may be negotiated before purchase. These terms will be documented in your purchase agreement.",
      },
      {
        title: "Seasonal Variations",
        details:
          "Return processing times may be longer during peak business seasons (March-April, September-October) due to higher volume. Please plan accordingly.",
      },
      {
        title: "Project Cancellations",
        details:
          "For project cancellations involving multiple furniture items, please contact our B2B sales team directly to discuss the specific situation and possible solutions.",
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
