"use client";
import BaseLayout from "@/components/layout/BaseLayout";
import ContactForm from "@/components/shared/ContactForm";
import { SideContent } from "@/components/marketing/SideContent";
import dynamic from "next/dynamic";
import { contactPageFaq } from "@/lib/constants/FAQ";
import { useCompanyData } from "@/hooks/useCompanyData";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BasicCompanyInfo as fallbackCompanyInfo,
  socialLinks as fallbackSocialLinks,
} from "@/lib/constants/CompanyInfo";

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import("@/components/ui/map"), { ssr: false });

const ContactPage = () => {
  // Fetch company data using our hook
  const { companyInfo, socialLinks, isLoading } = useCompanyData();

  return (
    <BaseLayout className="min-h-screen bg-background font-sans">
      {isLoading ? (
        <div className="w-full h-[300px] bg-muted flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      ) : (
        <Map companyInfo={companyInfo || fallbackCompanyInfo} />
      )}

      <div className="w-full mx-auto px-6 py-24 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:max-w-4xl">
          <ContactForm />

          <SideContent
            faqs={contactPageFaq}
            socialLinks={socialLinks || fallbackSocialLinks}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default ContactPage;
