"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPinIcon, MailIcon, PhoneIcon } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: "",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data = await response.json();

      setFormStatus({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        message: "Thank you! We will contact you shortly.",
      });

      // Reset form fields after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending contact form:", error);
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: "Failed to send message. Please try again.",
      });
    }
  };

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
            <span className="block mt-2 font-normal italic text-primary">
              Exceptional Service
            </span>
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Connect with our dedicated team of luxury furniture specialists for
            a personalized consultation tailored to your distinctive
            requirements.
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
                  <h3 className="font-serif italic text-xl mb-4 text-foreground">
                    Our Store
                  </h3>
                  <p className="text-muted-foreground/80 leading-relaxed">
                    Plot No. 304, Industrial Area Phase 2
                  </p>
                  <p className="text-muted-foreground/80 leading-relaxed">
                    Chandigarh, India 160002
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-10 rounded-xl space-y-4 transition-all duration-500 hover:from-accent/10 hover:to-primary/10 border border-primary/5 hover:border-primary/10">
              <div className="flex items-start gap-8">
                <MailIcon className="h-10 w-10 text-primary/60 shrink-0" />
                <div>
                  <h3 className="font-serif italic text-xl mb-4 text-foreground">
                    Support
                  </h3>
                  <p className="text-muted-foreground/80 leading-relaxed">
                    hello@stardom.co.in
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-primary/5 p-10 rounded-xl space-y-4 transition-all duration-500 hover:from-accent/10 hover:to-primary/10 border border-primary/5 hover:border-primary/10">
              <div className="flex items-start gap-8">
                <PhoneIcon className="h-10 w-10 text-primary/60 shrink-0" />
                <div>
                  <h3 className="font-serif italic text-xl mb-4 text-foreground">
                    Personal Consultation
                  </h3>
                  <p className="text-muted-foreground/80 leading-relaxed">
                    +91 62846 73783
                  </p>
                  <p className="text-muted-foreground/80 leading-relaxed">
                    Mon - Fri, 10:00 - 18:00
                  </p>
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
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-accent/5 to-primary/5 p-10 rounded-xl space-y-8 border border-primary/5"
            >
              <div className="space-y-3">
                <label className="text-sm text-muted-foreground/80 font-medium uppercase tracking-wider">
                  Full Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="bg-background/50 border-primary/10 text-foreground placeholder:text-muted-foreground/50 h-12 transition-all duration-300 focus:border-primary/30"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm text-muted-foreground/80 font-medium uppercase tracking-wider">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="bg-background/50 border-primary/10 text-foreground placeholder:text-muted-foreground/50 h-12 transition-all duration-300 focus:border-primary/30"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm text-muted-foreground/80 font-medium uppercase tracking-wider">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                  className="bg-background/50 border-primary/10 text-foreground placeholder:text-muted-foreground/50 min-h-[160px] transition-all duration-300 focus:border-primary/30"
                />
              </div>

              {formStatus.isSuccess && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600">
                  {formStatus.message}
                </div>
              )}

              {formStatus.isError && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600">
                  {formStatus.message}
                </div>
              )}

              <Button
                type="submit"
                disabled={formStatus.isSubmitting}
                className="w-full bg-primary/90 hover:bg-primary text-background font-medium h-14 text-lg tracking-wide group"
              >
                {formStatus.isSubmitting
                  ? "Sending..."
                  : "Schedule Consultation"}
                <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">
                  →
                </span>
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
