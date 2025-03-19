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
import { Cookie, Eye, Shield } from "lucide-react";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { CookieCategory } from "@/types/ComponentTypes";

const cookieCategories: CookieCategory[] = [
  {
    title: "Essential Cookies",
    icon: <Cookie className="h-5 w-5" />,
    info: [
      {
        title: "What Are Essential Cookies?",
        details:
          "Essential cookies are basic technical cookies that allow our website to function properly. Our furniture showcase website uses minimal essential cookies necessary for core functionality such as page loading and basic navigation.",
      },
      {
        title: "Your Control",
        details:
          "Essential cookies are required for the website to work properly. They are automatically set when you use our website and cannot be disabled.",
      },
    ],
  },
  {
    title: "Analytics Cookies",
    icon: <Eye className="h-5 w-5" />,
    info: [
      {
        title: "Third-Party Analytics",
        details:
          "Our website uses basic analytics tools provided by our cloud hosting service and Google Analytics. These tools collect anonymous information about how visitors use our site, helping us understand which furniture collections are most popular and how to improve your browsing experience.",
      },
      {
        title: "Your Control",
        details:
          "You can disable these cookies through your browser settings or by using Google's opt-out browser add-on. However, we don't directly control these third-party cookies.",
      },
    ],
  },
  {
    title: "Your Privacy",
    icon: <Shield className="h-5 w-5" />,
    info: [
      {
        title: "Our Commitment",
        details:
          "As a small furniture brand, we keep data collection to an absolute minimum. We do not use advertising cookies, targeting cookies, or collect personal information beyond basic analytics.",
      },
      {
        title: "Browser Controls",
        details:
          "Most web browsers allow you to control cookies through their settings. You can choose to block cookies, though this may affect your browsing experience.",
      },
    ],
  },
];

const CookiePolicyPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(
    cookieCategories[0]?.title || "",
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
            <SectionTitle>
              Cookie{" "}
              <span className="font-serif italic text-primary">Policy</span>
            </SectionTitle>
            <p className="text-muted-foreground text-lg mx-auto mb-10">
              Information about cookies on our furniture showcase website.
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
                  Categories
                </h3>
                <nav className="space-y-1">
                  {cookieCategories.map((category, idx) => (
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
                    Related Policies
                  </h3>
                  <Button
                    className="w-full justify-start border-input/50 hover:border-primary/50 mb-2"
                    variant="outline"
                    asChild
                  >
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </Button>
                  <Button
                    className="w-full justify-start border-input/50 hover:border-primary/50"
                    variant="outline"
                    asChild
                  >
                    <Link href="/terms-of-service">Terms of Service</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Cookie Policy Content */}
            <div className="lg:col-span-3 space-y-16">
              <div className="mb-12">
                <p className="text-muted-foreground leading-relaxed">
                  This simple Cookie Policy explains the minimal cookie usage on
                  our furniture showcase website. Our site primarily serves to
                  showcase our furniture collections and provide basic
                  information about our brand. We use only essential technical
                  cookies and limited analytics.
                </p>
              </div>

              {cookieCategories.map((category, idx) => (
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
      </div>
    </BaseLayout>
  );
};

export default CookiePolicyPage;
