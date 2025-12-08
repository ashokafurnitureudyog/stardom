"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import {
  ScrollText,
  FileCheck,
  BookOpen,
  Scale,
  ArrowRight,
} from "lucide-react";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";

const termsSections = [
  {
    id: "acceptance",
    title: "Website Usage",
    icon: <FileCheck className="h-5 w-5" />,
    content: `
      <p>By accessing our website, you agree to these simple Terms of Service. Our website is intended to showcase our furniture products and provide information about our brand.</p>
      
      <p>Please use our website responsibly and in accordance with applicable laws. We reserve the right to modify these terms at any time.</p>
    `,
  },
  {
    id: "services",
    title: "Our Products",
    icon: <ScrollText className="h-5 w-5" />,
    content: `
      <p>Our website displays our furniture products and designs for informational purposes. Product images, descriptions, dimensions, and features are for reference only.</p>
      
      <p>To purchase or inquire about our products, please contact us directly using the information provided on our contact page. Prices, availability, and specifications may change without notice.</p>
      
      <p>For custom orders or specific requirements, we encourage you to reach out to discuss your needs directly.</p>
    `,
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    icon: <BookOpen className="h-5 w-5" />,
    content: `
      <p>All content on our website including text, images, designs, logos, and product photos are our intellectual property. These materials are protected by copyright and trademark laws.</p>
      
      <p>You may not use, reproduce, or distribute any content from our website without our explicit permission.</p>
      
      <p>If you believe any content on our website infringes upon your rights, please contact us using the information below.</p>
    `,
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: <Scale className="h-5 w-5" />,
    content: `
      <p>Our website is provided "as is" without warranties of any kind. We do not guarantee the accuracy or completeness of any information on our website.</p>
      
      <p>We are not liable for any damages arising from your use of, or inability to use, our website. This includes direct, indirect, or consequential damages.</p>
      
      <p>Product representations, including colors, may vary from actual products due to screen variations and photography lighting.</p>
    `,
  },
];

const TermsOfServicePage = () => {
  const [activeSection, setActiveSection] = useState<string>(
    termsSections[0]?.id || "",
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

  // Determine active section based on scroll position
  useEffect(() => {
    const handleActiveSection = () => {
      const sections = termsSections.map((sec) => sec.id);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleActiveSection);
    return () => window.removeEventListener("scroll", handleActiveSection);
  }, []);

  const scrollToSection = (sectionId: string): void => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveSection(sectionId);
  };

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
              Terms of{" "}
              <span className="font-serif italic text-primary">Service</span>
            </SectionTitle>
            <p className="text-muted-foreground text-lg md:text-xl font-light mx-auto mb-8 max-w-xl">
              Some simple terms about using our website. Our site is for
              informational purposes only to showcase our furniture designs.
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
                    Policy Sections
                  </h3>
                  <nav className="space-y-2">
                    {termsSections.map((section, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                          activeSection === section.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-primary/5"
                        }`}
                      >
                        <span className="text-primary/80">{section.icon}</span>
                        <span>{section.title}</span>
                        {activeSection === section.id && (
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
                        <Link href="/cookie-policy">Cookie Policy</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms of Service Content */}
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
                    These simple terms explain how you can use our website. Our
                    site is primarily for showcasing our furniture designs and
                    providing information about our brand.
                  </p>
                </div>
              </motion.div>

              {termsSections.map((section, idx) => (
                <motion.div
                  key={idx}
                  id={section.id}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="scroll-mt-32"
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="flex items-center justify-center p-3 rounded-full bg-primary/10">
                      <span className="text-primary">{section.icon}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-light flex items-center gap-3">
                      {section.title}
                    </h2>
                    <div className="h-px flex-grow bg-primary/10" />
                  </div>

                  <div className="prose prose-slate max-w-none prose-headings:font-medium prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground/90 pl-1">
                    <div
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
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

export default TermsOfServicePage;
