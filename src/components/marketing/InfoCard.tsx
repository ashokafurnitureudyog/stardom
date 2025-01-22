import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CompanyInfo } from '@/types/ComponentTypes';

interface InfoCardProps {
  companyInfo: CompanyInfo;
}

export const InfoCard: React.FC<InfoCardProps> = ({ companyInfo }) => {
  const infoItems = [
    { Icon: MapPin, title: "Address", content: `${companyInfo.address.street}, ${companyInfo.address.city}, ${companyInfo.address.zip}` },
    { Icon: Phone, title: "Phone", content: companyInfo.phone },
    { Icon: Mail, title: "Email", content: companyInfo.email },
    {
      Icon: Clock,
      title: "Business Hours",
      content: (
        <>
          <p className="text-muted-foreground">Weekdays: {companyInfo.hours.weekday}</p>
          <p className="text-muted-foreground">Saturday: {companyInfo.hours.saturday}</p>
          <p className="text-muted-foreground">Sunday: {companyInfo.hours.sunday}</p>
        </>
      )
    }
  ];

  return (
    <div className="absolute top-1/2 right-12 transform -translate-y-1/2 w-96 bg-card/95 backdrop-blur-sm shadow-2xl rounded-lg p-8 border border-border/50">
      <h2 className="text-2xl font-light mb-6">
        {companyInfo.name} <span className="font-serif italic text-primary">{companyInfo.parentCompany}</span>
      </h2>
      
      <div className="space-y-4">
        {infoItems.map(({ Icon, title, content }, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <Icon className="w-5 h-5 text-primary mt-1 group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-medium">{title}</p>
              {typeof content === 'string' ? (
                <p className="text-muted-foreground">{content}</p>
              ) : (
                content
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};