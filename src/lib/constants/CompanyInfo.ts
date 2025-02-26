import { CompanyInfo, SocialLink, TeamMember } from "@/types/ComponentTypes";
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
    weekday: "10:00 AM - 6:30 PM",
    sunday: "Closed",
  },
  phone: "+91 62846 73783",
  email: "hello@stardom.co.in",
  website: "https://stardom.co.in/",
  mapsLink: "https://maps.app.goo.gl/KjSFWv5XXerbHn9R7",
};

export const socialLinks: SocialLink[] = [
  { icon: Facebook, url: "https://facebook.com/stardom" },
  { icon: Instagram, url: "https://instagram.com/stardom" },
  { icon: Linkedin, url: "https://linkedin.com/company/stardom" },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Sandeep Jain",
    role: "Founder & Director",
    bio: "30+ years of expertise in office furniture manufacturing",
    image: "https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33",
  },
  {
    name: "Ishaan Jain",
    role: "Co-Founder & Director",
    bio: "Young entrepreneur with business acumen and hands-on experience",
    image: "/images/team/ishaan.png",
  },
  {
    name: "Abhishek Sharma",
    role: "Software Development Intern",
    bio: "Led company's digital transformation and brand enhancement",
    image: "https://github.com/abhisheksharm-3.png",
  },
];
