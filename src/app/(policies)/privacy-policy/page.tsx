"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { Eye, Database, Lock } from "lucide-react";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";

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
              Privacy{" "}
              <span className="font-serif italic text-primary">Policy</span>
            </SectionTitle>
            <p className="text-muted-foreground text-lg mx-auto mb-10">
              Our website is primarily for showcasing our furniture collections.
              We collect minimal information and respect your privacy.
            </p>
          </div>
        </Section>

        {/* Last Updated Notice */}
        <Section className="py-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-muted-foreground text-sm italic">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
                  Policy Sections
                </h3>
                <nav className="space-y-1">
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
                      {section.icon}
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Privacy Policy Content */}
            <div className="lg:col-span-3 space-y-16">
              <div className="mb-12">
                <p className="text-muted-foreground leading-relaxed">
                  This simple Privacy Policy explains the minimal data practices
                  of our furniture brand website. Since we&apos;re primarily a
                  showcase of our furniture collections, we collect very little
                  data from our visitors.
                </p>
              </div>

              {privacySections.map((section, idx) => (
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
      </div>
    </BaseLayout>
  );
};

export default PrivacyPolicyPage;
