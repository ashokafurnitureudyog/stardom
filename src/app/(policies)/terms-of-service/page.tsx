"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { ScrollText, FileCheck, BookOpen, Scale } from "lucide-react";
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
        {/* Hero Section */}
        <Section className="pt-24 pb-12">
          <div className="text-center max-w-3xl mx-auto">
            <SectionTitle>
              Terms of{" "}
              <span className="font-serif italic text-primary">Service</span>
            </SectionTitle>
            <p className="text-muted-foreground text-lg mx-auto mb-10">
              Some simple terms about using our website. Our site is for
              informational purposes only to showcase our furniture designs.
            </p>
          </div>
        </Section>

        {/* Last Updated Notice */}
        <Section className="py-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-muted-foreground text-sm italic">
              Last Updated: {new Date().toLocaleDateString()}
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
                  Sections
                </h3>
                <nav className="space-y-1">
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
                      {section.icon}
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Terms of Service Content */}
            <div className="lg:col-span-3 space-y-16">
              <div className="mb-12">
                <p className="text-muted-foreground leading-relaxed">
                  These simple terms explain how you can use our website. Our
                  site is primarily for showcasing our furniture designs and
                  providing information about our brand.
                </p>
              </div>

              {termsSections.map((section, idx) => (
                <motion.div
                  key={idx}
                  id={section.id}
                  variants={fadeInUpVariants}
                  className="scroll-mt-32"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-2xl lg:text-3xl font-light font-serif flex items-center gap-3">
                      {section.icon}
                      {section.title}
                    </h2>
                    <div className="h-px flex-grow bg-primary/20" />
                  </div>

                  <div className="prose prose-slate max-w-none prose-headings:font-medium prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground/90">
                    <div
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Contact CTA */}
        <Section className="bg-card">
          <div className="text-center max-w-3xl mx-auto">
            <SectionTitle>
              Questions About Our{" "}
              <span className="font-serif italic text-primary">Furniture?</span>
            </SectionTitle>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              We&apos;d love to hear from you and discuss how our furniture can
              transform your space.
            </p>
            <Button
              className="min-w-[200px] h-14 text-lg tracking-wide"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </Section>
      </div>
    </BaseLayout>
  );
};

export default TermsOfServicePage;
