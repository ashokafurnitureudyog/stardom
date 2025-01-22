import { CompanyInfo, SocialLink } from "@/types/ComponentTypes";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export const BasicCompanyInfo: CompanyInfo = {
  name: "Stardom",
  parentCompany: "Ashoka Furniture Udyog",
  established: "1996",
  address: {
    street: "Plot No. 304, Industrial Area Phase 2",
    city: "Chandigarh",
    Country: "India",
    zip: "160002",
    coordinates: [30.696056, 76.785417],
  },
  hours: {
    weekday: "9:00 AM - 6:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Closed"
  },
  phone: "+91 62846 73783",
  email: "hello@stardom.co.in",
  website: "https://stardom.co.in/",
};

export const socialLinks: SocialLink[] = [
  { icon: Facebook, url: "https://facebook.com/stardom" },
  { icon: Instagram, url: "https://instagram.com/stardom" },
  { icon: Linkedin, url: "https://linkedin.com/company/stardom" }
];