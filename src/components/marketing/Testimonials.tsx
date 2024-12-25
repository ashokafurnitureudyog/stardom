import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon} from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      author: "Sarah Chen",
      role: "Chief Architect, Azure Design Co.",
      quote: "Stardom's attention to detail and commitment to quality has transformed our office space into a masterpiece of design and functionality.",
      avatar: "https://avatar.iran.liara.run/public"
    },
    {
      author: "James Morrison",
      role: "CEO, Global Finance Corp",
      quote: "The level of craftsmanship and personalized service we received from Stardom exceeded all our expectations.",
      avatar: "https://avatar.iran.liara.run/public"
    },
    {
      author: "Priya Patel",
      role: "Interior Designer, Nexus Interiors",
      quote: "Working with Stardom has been a revelation. Their pieces are not just furniture, they're statements of luxury and sophistication.",
      avatar: "https://avatar.iran.liara.run/public"
    }
  ];

  const stats = [
    { value: "98%", label: "Client Satisfaction", icon: "★" },
    { value: "250+", label: "Projects Completed", icon: "✦" },
    { value: "15+", label: "Design Awards", icon: "✧" }
  ];

  return (
    <div className="w-full bg-background py-20 md:py-32 px-8 md:px-16 font-sans relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border border-primary/10 rotate-45" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border border-primary/10 rotate-45" />
      
      <div className="max-w-7xl mx-auto space-y-16 relative">
        <div className="text-center space-y-6">
          <h3 className="text-primary/80 uppercase tracking-widest text-sm font-medium">
            Client Testimonials
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground font-serif">
            Voices of <span className="text-primary/90">Excellence</span>
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover why discerning corporations trust Stardom for their premium office furniture needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-br from-accent/5 to-primary/5 hover:from-accent/10 hover:to-primary/10 transition-all duration-500 border-primary/10"
            >
              <CardContent className="p-8 space-y-6 relative">
                <QuoteIcon className="h-10 w-10 text-primary/20 absolute top-6 right-6" />
                <p className="text-foreground/90 italic text-lg leading-relaxed">
                &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-primary/10">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="rounded-full w-12 h-12 border-2 border-primary/10"
                  />
                  <div>
                    <h4 className="font-medium text-foreground">{testimonial.author}</h4>
                    <p className="text-sm text-primary/80">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-primary/10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-3">
              <span className="text-primary/40 text-2xl">{stat.icon}</span>
              <h4 className="text-4xl md:text-5xl font-extralight text-foreground font-serif">
                {stat.value}
              </h4>
              <p className="text-sm text-primary/80 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;