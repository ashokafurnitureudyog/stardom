import React from 'react';
import { Card } from "@/components/ui/card";

const PortfolioSection = () => {
  const projects = [
    {
      title: "Azure Technologies HQ",
      description: "Complete executive floor furnishing",
      image: "https://miro.medium.com/v2/resize:fit:1400/0*MCsGhkvp8vwPqKFH.png"
    },
    {
      title: "Global Finance Center",
      description: "Premium conference solutions",
      image: "https://images.forbesindia.com/media/images/2022/Sep/img_194683_singaporebg.jpg"
    },
    {
      title: "Nexus Corporate Park",
      description: "Complete office ecosystem",
      image: "https://listingsprod.blob.core.windows.net/ourlistings-aus/10744859-2dc7-4952-8dab-5a35a386d09b/c3ec1f28-d681-4313-89a2-86ad8f374d25-w"
    }
  ];

  const clients = [
    { name: "AZURE TECH" },
    { name: "GLOBAL FIN" },
    { name: "NEXUS CORP" },
    { name: "VERTEX INC" }
  ];

  return (
    <div className="w-full bg-background py-20 md:py-32 font-sans">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="text-center mb-16 md:mb-24 space-y-6">
          <h3 className="text-primary/80 uppercase tracking-widest text-sm font-medium">
            Our Clients
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground font-serif">
            Distinguished Spaces
            <span className="block mt-2 text-primary/90">We&apos;ve Transformed</span>
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore our portfolio of prestigious projects that showcase our commitment to
            excellence in corporate interior solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {projects.map((project, index) => (
            <div key={index} className="group relative">
              {/* Glow effect container */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-75 transition-all duration-700 group-hover:duration-500" />
              
              {/* Inner glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />
              
              <Card className="relative overflow-hidden bg-background/95 border border-primary/10 group-hover:border-primary/30 transition-all duration-500">
                <div className="aspect-[4/3] w-full relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-light text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground/80">{project.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center space-y-8">
          <h4 className="text-lg text-muted-foreground/90">
            Trusted by Industry Leaders
          </h4>
          <div className="flex justify-center items-center gap-16 flex-wrap">
            {clients.map((client, index) => (
              <div
                key={index}
                className="text-primary/60 hover:text-primary/90 transition-colors duration-300 text-lg font-light tracking-wider"
              >
                {client.name}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-3 border border-primary/20 text-primary/90 hover:text-primary hover:border-primary/40 transition-all duration-300 group font-light">
            View Complete Portfolio
            <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;