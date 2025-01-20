"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, AlertCircle, CheckCircle2 } from 'lucide-react';
import BaseLayout from '@/components/layout/BaseLayout';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

const DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src
});

L.Marker.prototype.options.icon = DefaultIcon;
interface Location {
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: [number, number];
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
}

interface FAQ {
  question: string;
  answer: string;
}

interface SocialLink {
  icon: React.ElementType;
  url: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const locations: Location[] = [
  {
    name: "Corporate Headquarters",
    address: "123 Business District, New Delhi, India",
    phone: "+91 11 1234 5678",
    email: "corporate@stardom.com",
    coordinates: [30.696056, 76.785417],
    hours: {
      weekday: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    }
  }
];

const faqs: FAQ[] = [
  {
    question: "What is your typical lead time for custom orders?",
    answer: "Our custom orders typically take 6-8 weeks from design approval to delivery. Each piece is meticulously crafted to meet our exacting standards."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer worldwide shipping through our trusted logistics partners. Shipping times and costs vary by destination."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unused items in original packaging. Custom orders are non-returnable unless defective."
  }
];

const socialLinks: SocialLink[] = [
  { icon: Facebook, url: "https://facebook.com/stardom" },
  { icon: Instagram, url: "https://instagram.com/stardom" },
  { icon: Linkedin, url: "https://linkedin.com/company/stardom" }
];

const ContactPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Premium map styles
  const mapStyle = {
    light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png'
  };

  // Custom map styles for dark mode
  const mapContainerStyle = {
    filter: theme === 'dark' ? 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <BaseLayout className="min-h-screen bg-background font-sans">
      {/* Map Section */}
      <section className="relative h-[70vh] border-b border-border">
        <MapContainer
          center={locations[0].coordinates}
          zoom={13}
          className="w-full h-full"
          style={mapContainerStyle}
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url={theme === 'dark' ? mapStyle.dark : mapStyle.light}
          />
          <Marker position={locations[0].coordinates}>
            <Popup>
              <div className="p-2">
                <h3 className="font-medium">{locations[0].name}</h3>
                <p className="text-sm">{locations[0].address}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Info Card */}
        <div className="absolute top-1/2 right-12 transform -translate-y-1/2 w-96 bg-card/95 backdrop-blur-sm shadow-2xl rounded-lg p-8 border border-border/50">
          <h2 className="text-2xl font-light mb-6">
            Corporate <span className="font-serif italic text-primary">Headquarters</span>
          </h2>
          
          <div className="space-y-4">
            {[
              { Icon: MapPin, title: "Address", content: locations[0].address },
              { Icon: Phone, title: "Phone", content: locations[0].phone },
              { Icon: Mail, title: "Email", content: locations[0].email },
              {
                Icon: Clock,
                title: "Business Hours",
                content: (
                  <>
                    <p className="text-muted-foreground">Weekdays: {locations[0].hours.weekday}</p>
                    <p className="text-muted-foreground">Saturday: {locations[0].hours.saturday}</p>
                    <p className="text-muted-foreground">Sunday: {locations[0].hours.sunday}</p>
                  </>
                )
              }
            ].map(({ Icon, title, content }, index) => (
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
      </section>

      {/* Contact Form and Info Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-light mb-8">
              Get in <span className="font-serif italic text-primary">Touch</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, "email")}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange(e, "phone")}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange(e, "subject")}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange(e, "message")}
                  disabled={isSubmitting}
                />
              </div>
              
              {formStatus && (
                <Alert
                  className={cn(
                    "transition-all duration-200",
                    formStatus === "success" && "bg-success/10 border-success/20",
                    formStatus === "error" && "bg-destructive/10 border-destructive/20"
                  )}
                >
                  {formStatus === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-destructive" />
                  )}
                  <AlertTitle>
                    {formStatus === "success" ? "Success" : "Error"}
                  </AlertTitle>
                  <AlertDescription>
                    {formStatus === "success"
                      ? "Your message has been sent successfully. We'll get back to you soon."
                      : "There was an error sending your message. Please try again later."}
                  </AlertDescription>
                </Alert>
              )}
              
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Emergency Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Alert className="border-primary/20 bg-primary/5">
                <AlertTitle className="text-lg font-medium mb-2">
                  24/7 Customer Support
                </AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  For urgent assistance outside business hours:
                  <br />
                  Emergency Hotline: +91 98765 43210
                </AlertDescription>
              </Alert>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-light mb-6">
                Connect <span className="font-serif italic text-primary">With Us</span>
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-input hover:border-primary hover:text-primary hover:scale-110 transition-all duration-200"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-2xl font-light mb-6">
                Frequently Asked <span className="font-serif italic text-primary">Questions</span>
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ContactPage;