"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { FormData } from '@/types/ComponentTypes';

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl font-light mb-8">
        Get in <span className="font-serif italic text-primary">Touch</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields */}
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
  );
};
