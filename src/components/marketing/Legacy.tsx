import React from 'react';
import { Button } from "@/components/ui/button";
import { AwardIcon } from "lucide-react"; // Changed to AwardIcon for more premium feel

const LegacySection = () => {
    return (
        <div className="w-full bg-background py-20 md:py-32 px-8 md:px-16 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h3 className="text-primary/80 uppercase tracking-widest text-sm font-medium">
                                Heritage of Excellence
                            </h3>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground font-serif">
                                Crafting Elegance
                                <span className="block mt-2 text-primary/90">Since 1985</span>
                            </h2>
                            <p className="text-muted-foreground/90 max-w-2xl text-lg leading-relaxed">
                                From our inception as Ashoka Furniture Udyog to our position as an 
                                industry leader in luxury office furniture, we have maintained an 
                                unwavering dedication to artistry and innovation.
                            </p>
                        </div>

                        <div className="flex gap-16">
                            <div className="border-l-2 border-primary/20 pl-6">
                                <h4 className="text-5xl font-extralight text-foreground">27+</h4>
                                <p className="text-muted-foreground/80 mt-2">Years of Excellence</p>
                            </div>
                            <div className="border-l-2 border-primary/20 pl-6">
                                <h4 className="text-5xl font-extralight text-foreground">1000+</h4>
                                <p className="text-muted-foreground/80 mt-2">Premium Projects</p>
                            </div>
                        </div>

                        <div>
                            <Button
                                variant="ghost"
                                className="text-lg hover:bg-primary/5 group px-0"
                            >
                                Explore Our Legacy
                                <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                            </Button>
                        </div>
                    </div>

                    <div className="relative hidden md:block">
                        <div className="absolute -top-12 -left-12 w-32 h-32 border border-primary/10 rotate-45 transition-transform duration-500 hover:rotate-90" />
                        <div className="absolute -bottom-12 -right-12 w-32 h-32 border border-primary/10 rotate-45 transition-transform duration-500 hover:-rotate-90" />
                        <div className="aspect-square w-full bg-gradient-to-br from-accent/5 to-primary/5 flex items-center justify-center transition-all duration-500 hover:from-accent/10 hover:to-primary/10">
                            <AwardIcon className="w-32 h-32 text-primary/30 transition-opacity duration-300 hover:text-primary/40" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegacySection;