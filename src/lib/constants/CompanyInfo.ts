import { CompanyInfo, SocialLink, TeamMember, TimelineEvent } from "@/types/ComponentTypes";
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
  mapsLink: "https://maps.app.goo.gl/KjSFWv5XXerbHn9R7"
};

export const socialLinks: SocialLink[] = [
  { icon: Facebook, url: "https://facebook.com/stardom" },
  { icon: Instagram, url: "https://instagram.com/stardom" },
  { icon: Linkedin, url: "https://linkedin.com/company/stardom" }
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: "1985",
    title: "Foundation",
    description: "Established with a vision to redefine office furniture craftsmanship"
  },
  {
    year: "1995",
    title: "International Expansion",
    description: "Began exporting to luxury markets across Europe and Middle East"
  },
  {
    year: "2005",
    title: "Innovation Center",
    description: "Launched state-of-the-art design and manufacturing facility"
  },
  {
    year: "2015",
    title: "Sustainability Initiative",
    description: "Pioneered eco-friendly manufacturing processes"
  },
  {
    year: "2023",
    title: "Digital Transformation",
    description: "Integrated smart furniture solutions for modern workspaces"
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: "Rajesh Kumar",
    role: "Managing Director",
    bio: "30+ years of expertise in luxury furniture manufacturing",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5"
  }
];
