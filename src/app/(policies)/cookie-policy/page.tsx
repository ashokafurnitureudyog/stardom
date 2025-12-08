"use client";

import { useState, useEffect } from "react";
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
import { Cookie, Eye, Shield, ArrowRight } from "lucide-react";
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
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll position for visual effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCategory = (categoryId: string): void => {
    document.getElementById(categoryId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveCategory(categoryId);
  };

  // Determine active category based on scroll position
  useEffect(() => {
    const handleActiveCategory = () => {
      const categories = cookieCategories.map((cat) => cat.title);

      for (const category of categories) {
        const element = document.getElementById(category);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveCategory(category);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleActiveCategory);
    return () => window.removeEventListener("scroll", handleActiveCategory);
  }, []);

  return (
    <BaseLayout className="overflow-x-hidden lg:overflow-auto">
      <div className="min-h-screen bg-background font-sans">
        {/* Hero Section with subtle gradient background */}
        <Section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <motion.div
            className="text-center max-w-2xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionTitle>
              Cookie{" "}
              <span className="font-serif italic text-primary">Policy</span>
            </SectionTitle>
            <p className="text-muted-foreground text-lg md:text-xl font-light mx-auto mb-8 max-w-xl">
              Transparency in how we use cookies to improve your experience.
            </p>
            <div className="h-px w-24 bg-primary/30 mx-auto mt-10" />
          </motion.div>
        </Section>

        {/* Main Content */}
        <Section className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 max-w-6xl mx-auto">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div
                className={`transition-all duration-300 ${scrollPosition > 150 ? "sticky top-32" : ""}`}
              >
                <div className="space-y-8">
                  <h3 className="text-base font-medium mb-4 text-primary/80 uppercase tracking-wider">
                    Categories
                  </h3>
                  <nav className="space-y-2">
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
                        <span className="text-primary/80">{category.icon}</span>
                        <span>{category.title}</span>
                        {activeCategory === category.title && (
                          <motion.div
                            className="ml-auto"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ArrowRight className="h-4 w-4 text-primary" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </nav>

                  <div className="pt-8 mt-8 border-t border-input/20">
                    <h3 className="text-base font-medium mb-6 text-primary/80 uppercase tracking-wider">
                      Related Policies
                    </h3>
                    <div className="space-y-3">
                      <Button
                        className="w-full justify-start text-muted-foreground border-input/20 hover:border-primary/30 hover:text-foreground"
                        variant="outline"
                        asChild
                      >
                        <Link href="/privacy-policy">Privacy Policy</Link>
                      </Button>
                      <Button
                        className="w-full justify-start text-muted-foreground border-input/20 hover:border-primary/30 hover:text-foreground"
                        variant="outline"
                        asChild
                      >
                        <Link href="/terms-of-service">Terms of Service</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookie Policy Content */}
            <div className="lg:col-span-4 space-y-24">
              <motion.div
                className="mb-12"
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
              >
                <div className="px-6 py-8 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-lg font-light leading-relaxed">
                    This Cookie Policy explains the minimal cookie usage on our
                    furniture showcase website. As a premium furniture brand, we
                    respect your privacy and only use essential technical
                    cookies and limited analytics to enhance your browsing
                    experience.
                  </p>
                </div>
              </motion.div>

              {cookieCategories.map((category, idx) => (
                <motion.div
                  key={idx}
                  id={category.title}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="scroll-mt-32"
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="flex items-center justify-center p-3 rounded-full bg-primary/10">
                      <span className="text-primary">{category.icon}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-light flex items-center gap-3">
                      {category.title}
                    </h2>
                    <div className="h-px flex-grow bg-primary/10" />
                  </div>

                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue={`${category.title}-0`}
                  >
                    {category.info.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.title}-${index}`}
                        className="border-b border-input/20 last:border-0"
                      >
                        <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6 transition-all hover:text-primary">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base py-6 px-1">
                          <div className="pl-4 border-l-2 border-primary/30">
                            {item.details}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Policy footer */}
        <Section className="py-12 bg-primary/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-muted-foreground text-center md:text-left">
                Last updated: March 2025
              </p>
              <Button
                variant="outline"
                className="border-primary/20 hover:border-primary/50"
              >
                <Link href="/contact">Contact Us With Questions</Link>
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </BaseLayout>
  );
};

export default CookiePolicyPage;
