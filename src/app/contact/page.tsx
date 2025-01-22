"use client"
import BaseLayout from '@/components/layout/BaseLayout';
import { BasicCompanyInfo, socialLinks } from '@/lib/constants/CompanyInfo';
import ContactForm from '@/components/shared/ContactForm';
import { SideContent } from '@/components/marketing/SideContent';
import { faqs } from '@/lib/constants/FAQ';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/ui/map'), { ssr: false })
const ContactPage = () => {
  return (
    <BaseLayout className="min-h-screen bg-background font-sans">
      <Map companyInfo={BasicCompanyInfo} />

      <div className="w-full mx-auto px-6 py-24 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:max-w-4xl">
          <ContactForm />

          <SideContent faqs={faqs} socialLinks={socialLinks} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default ContactPage;