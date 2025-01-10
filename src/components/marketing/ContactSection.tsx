"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPinIcon, MailIcon, PhoneIcon } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUpVariants } from '@/lib/constants/AnimationConstants';

const ContactSection = () => {

  return (
    <div className="w-full bg-background py-32 md:py-40 px-8 md:px-16 font-sans relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--primary-rgb),0.05),transparent_40%)]" />

      <div className="max-w-7xl mx-auto space-y-24 relative">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeInUpVariants}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full">
            <div className="h-px w-8 bg-primary/40" />
            <h3 className="text-primary/90 uppercase tracking-widest text-sm font-medium">
              Bespoke Consultation
            </h3>
          </div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-foreground font-serif">
            Experience
            <span className="block mt-2 font-normal italic text-primary">Exceptional Service</span>
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Connect with our dedicated team of luxury furniture specialists for a personalized consultation tailored to your distinctive requirements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            variants={fadeInUpVariants}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-10 rounded-xl space-y-4 transition-all duration-500 hover:from-accent/10 hover:to-primary/10 border border-primary/5 hover:border-primary/10">
              <div className="flex items-start gap-8">
                <MapPinIcon className="h-10 w-10 text-primary/60 shrink-0" />
                <div>
                  <h3 className="font-serif italic text-xl mb-4 text-foreground">Luxury Showroom</h3>
                  <p className="text-muted-foreground/80 leading-relaxed">Plot No. 304, Industrial Area Phase 2</p>
                  <p className="text-muted-foreground/80 leading-relaxed">Chandigarh, India 160002</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-10 rounded-xl space-y-4 transition-all duration-500 hover:from-accent/10 hover:to-primary/10 border border-primary/5 hover:border-primary/10">
              <div className="flex items-start gap-8">
                <MailIcon className="h-10 w-10 text-primary/60 shrink-0" />
                <div>
                  <h3 className="font-serif italic text-xl mb-4 text-foreground">Support</h3>
                  <p className="text-muted-foreground/80 leading-relaxed">hello@stardom.co.in</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-10 rounded-xl space-y-4 transition-all duration-500 hover:from-accent/10 hover:to-primary/10 border border-primary/5 hover:border-primary/10">
              <div className="flex items-start gap-8">
                <PhoneIcon className="h-10 w-10 text-primary/60 shrink-0" />
                <div>
                  <h3 className="font-serif italic text-xl mb-4 text-foreground">Personal Consultation</h3>
                  <p className="text-muted-foreground/80 leading-relaxed">+91 62846 73783</p>
                  <p className="text-muted-foreground/80 leading-relaxed">Mon - Fri, 10:00 - 18:00</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            variants={fadeInUpVariants}
            className="relative"
          >
            <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-10 rounded-xl space-y-8 border border-primary/5">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm text-muted-foreground/80 font-medium uppercase tracking-wider">First Name</label>
                  <Input 
                    placeholder="Enter first name"
                    className="bg-background/50 border-primary/10 text-foreground placeholder:text-muted-foreground/50 h-12 transition-all duration-300 focus:border-primary/30"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm text-muted-foreground/80 font-medium uppercase tracking-wider">Last Name</label>
                  <Input 
                    placeholder="Enter last name"
                    className="bg-background/50 border-primary/10 text-foreground placeholder:text-muted-foreground/50 h-12 transition-all duration-300 focus:border-primary/30"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm text-muted-foreground/80 font-medium uppercase tracking-wider">Email</label>
                <Input 
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background/50 border-primary/10 text-foreground placeholder:text-muted-foreground/50 h-12 transition-all duration-300 focus:border-primary/30"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm text-muted-foreground/80 font-medium uppercase tracking-wider">Message</label>
                <Textarea 
                  placeholder="Your message"
                  className="bg-background/50 border-primary/10 text-foreground placeholder:text-muted-foreground/50 min-h-[160px] transition-all duration-300 focus:border-primary/30"
                />
              </div>

              <Button 
                className="w-full bg-primary/90 hover:bg-primary text-background font-medium h-14 text-lg tracking-wide group"
              >
                Schedule Consultation
                <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;