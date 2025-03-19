"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { Eye, Database, Lock, ArrowRight } from "lucide-react";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

const privacySections = [
  {
    id: "information-collection",
    title: "Information Collection",
    icon: <Database className="h-5 w-5" />,
    content: `
            <p>As a furniture brand with a primarily informational website, we collect minimal data:</p>
            <ul>
                <li><strong>Basic Analytics:</strong> We use standard analytics to understand website traffic and page views.</li>
                <li><strong>Contact Forms:</strong> If you reach out through our contact form, we'll receive the information you provide such as your name and email.</li>
            </ul>
            <p>We do not collect or store personal information beyond what's mentioned above, and we do not use tracking technologies beyond essential cookies.</p>
        `,
  },
  {
    id: "information-use",
    title: "Use of Information",
    icon: <Eye className="h-5 w-5" />,
    content: `
            <p>Any information we receive is used solely to:</p>
            <ul>
                <li>Respond to your inquiries about our furniture products</li>
                <li>Improve our website based on visitor analytics</li>
                <li>Provide information about our furniture collections when requested</li>
            </ul>
            <p>We do not sell or share your information with third parties for marketing purposes.</p>
        `,
  },
  {
    id: "cookies",
    title: "Cookies",
    icon: <Lock className="h-5 w-5" />,
    content: `
            <p>Our website uses only essential cookies to ensure the site functions properly. These cookies don't track your browsing activity for marketing purposes.</p>
            <p>You can configure your browser to refuse cookies, though this may limit some website functionality.</p>
        `,
  },
];

const PrivacyPolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(
    privacySections[0]?.id || "",
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
      const sections = privacySections.map((sec) => sec.id);

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
              Privacy{" "}
              <span className="font-serif italic text-primary">Policy</span>
            </SectionTitle>
            <p className="text-muted-foreground text-lg md:text-xl font-light mx-auto mb-8 max-w-xl">
              Our commitment to protecting your privacy while delivering premium
              furniture experiences.
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
                    {privacySections.map((section, idx) => (
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
                        <Link href="/cookie-policy">Cookie Policy</Link>
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

            {/* Privacy Policy Content */}
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
                    As a premium furniture brand, we believe that respecting
                    your privacy is as essential as crafting quality furniture.
                    This Privacy Policy outlines our minimal data practices, as
                    our website primarily serves to showcase our exceptional
                    furniture collections.
                  </p>
                </div>
              </motion.div>

              {privacySections.map((section, idx) => (
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

export default PrivacyPolicyPage;
