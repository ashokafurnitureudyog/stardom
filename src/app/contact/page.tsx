import BaseLayout from "@/components/layout/BaseLayout";
import { ContactLocation } from "@/components/marketing/ContactLocation";
import { SideContent } from "@/components/marketing/SideContent";
import ContactForm from "@/components/shared/ContactForm";
import {
  BasicCompanyInfo as fallbackCompanyInfo,
  socialLinks as fallbackSocialLinks,
} from "@/lib/constants/CompanyInfo";
import { contactPageFaq } from "@/lib/constants/FAQ";
import { getCompanyData } from "@/lib/server/content";

const ContactPage = async () => {
  const { companyInfo, socialLinks } = await getCompanyData();

  return (
    <BaseLayout className="min-h-screen bg-background font-sans">
      <ContactLocation companyInfo={companyInfo || fallbackCompanyInfo} />

      <div className="mx-auto flex w-full items-center justify-center px-6 py-24">
        <div className="grid grid-cols-1 gap-24 lg:max-w-4xl lg:grid-cols-2">
          <ContactForm />

          <SideContent
            faqs={contactPageFaq}
            socialLinks={socialLinks.length > 0 ? socialLinks : fallbackSocialLinks}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default ContactPage;
