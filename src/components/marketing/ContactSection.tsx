import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPinIcon, MailIcon, PhoneIcon } from "lucide-react";

const ContactSection = () => {
  return (
    <div className="w-full bg-background py-20 md:py-32 px-8 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <h3 className="text-primary/80 uppercase tracking-widest text-sm font-medium">
            Connect With Us
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground font-serif">
            Exclusive Consultation
            <span className="block mt-2 text-primary/90">Premium Service</span>
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Experience personalized attention from our dedicated team of luxury furniture specialists.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-8 rounded-lg space-y-4 transition-all duration-300 hover:from-accent/10 hover:to-primary/10">
              <div className="flex items-start gap-6">
                <MapPinIcon className="h-8 w-8 text-primary/60 shrink-0" />
                <div>
                  <h3 className="font-medium text-lg mb-3 text-foreground">Luxury Showroom</h3>
                  <p className="text-muted-foreground/80">123 Luxury Avenue, Design District</p>
                  <p className="text-muted-foreground/80">Mumbai, India 400001</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-8 rounded-lg space-y-4 transition-all duration-300 hover:from-accent/10 hover:to-primary/10">
              <div className="flex items-start gap-6">
                <MailIcon className="h-8 w-8 text-primary/60 shrink-0" />
                <div>
                  <h3 className="font-medium text-lg mb-3 text-foreground">Premium Support</h3>
                  <p className="text-muted-foreground/80">info@stardom.luxury</p>
                  <p className="text-muted-foreground/80">support@stardom.luxury</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-8 rounded-lg space-y-4 transition-all duration-300 hover:from-accent/10 hover:to-primary/10">
              <div className="flex items-start gap-6">
                <PhoneIcon className="h-8 w-8 text-primary/60 shrink-0" />
                <div>
                  <h3 className="font-medium text-lg mb-3 text-foreground">Personal Consultation</h3>
                  <p className="text-muted-foreground/80">+91 98765 43210</p>
                  <p className="text-muted-foreground/80">Mon - Fri, 10:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-32 h-32 border border-primary/10 rotate-45 transition-transform duration-500 hover:rotate-90" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 border border-primary/10 rotate-45 transition-transform duration-500 hover:-rotate-90" />
            <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-8 rounded-lg space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm text-muted-foreground/80 font-medium">First Name</label>
                  <Input 
                    placeholder="Enter first name"
                    className="bg-background/50 border-primary/10 text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm text-muted-foreground/80 font-medium">Last Name</label>
                  <Input 
                    placeholder="Enter last name"
                    className="bg-background/50 border-primary/10 text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm text-muted-foreground/80 font-medium">Email</label>
                <Input 
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background/50 border-primary/10 text-foreground placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm text-muted-foreground/80 font-medium">Message</label>
                <Textarea 
                  placeholder="Your message"
                  className="bg-background/50 border-primary/10 text-foreground placeholder:text-muted-foreground/50 min-h-[160px]"
                />
              </div>

              <Button 
                className="w-full bg-primary/90 hover:bg-primary text-background font-medium py-6 group"
              >
                Request Consultation
                <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;