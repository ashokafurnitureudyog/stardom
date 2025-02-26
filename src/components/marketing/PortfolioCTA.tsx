import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "next-view-transitions";

export const PortfolioCTA = () => (
  <section className="bg-background py-32 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl md:text-6xl font-light mb-8 font-serif">
        Ready to Create Something{" "}
        <span className="italic text-primary">Extraordinary?</span>
      </h2>
      <p className="text-muted-foreground mb-12 text-lg">
        Let&apos;s collaborate to transform your vision into reality. Our team
        of expert craftsmen and designers are ready to bring your project to
        life.
      </p>
      <Button
        size="lg"
        className="min-w-[240px] h-14 text-lg tracking-wide"
        asChild
      >
        <Link href="/contact">
          Start Your Project
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Button>
    </div>
  </section>
);
