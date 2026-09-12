import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { CompanyInfo } from "@/types/ComponentTypes";
import type { MediaItem } from "@/types/MediaTypes";
import { HeroSlideshow } from "./HeroSlideshow";

const BUTTON_CLASS = "h-14 min-w-[220px] text-base";

/**
 * Landing hero. Rendered on the server with its media and company details
 * already resolved, so the headline and first slide are in the initial HTML
 * instead of waiting on two client fetches.
 */
const HeroSection = ({
  mediaItems,
  companyInfo,
}: {
  mediaItems: MediaItem[];
  companyInfo: CompanyInfo | null;
}) => (
  <section className="relative flex min-h-screen items-center justify-center overflow-hidden font-sans text-white">
    <HeroSlideshow mediaItems={mediaItems} />

    <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-2">
      <div className="text-center lg:text-left">
        <div className="mb-4">
          <span className="font-serif text-sm tracking-[0.2em] text-primary">
            {companyInfo ? `Since ${companyInfo.established}` : "Established"}
          </span>
        </div>

        <h1 className="mb-4 text-6xl font-extralight tracking-tight lg:text-7xl">
          {companyInfo?.name?.toUpperCase() || "STARDOM"}
        </h1>
        <div className="my-6 mx-auto h-px w-24 bg-primary lg:mx-0" />
        <span className="font-serif text-xl italic text-white/80">by</span>
        <p className="mt-2 font-serif text-2xl text-white/90">
          {companyInfo?.parentCompany || "Ashoka Furniture Udyog"}
        </p>

        <p className="mt-6 font-serif text-lg italic tracking-wide text-primary/90">
          Where Excellence Takes a Seat
        </p>
      </div>

      <div className="text-center lg:border-l lg:border-white/20 lg:pl-16 lg:text-left">
        <h2 className="mb-8 text-3xl font-light leading-tight lg:text-4xl">
          Elevate Your Workspace with Timeless Design
        </h2>

        <p className="mb-12 text-lg leading-relaxed text-white/80">
          Experience the fusion of artisanal craftsmanship and contemporary luxury in every piece.
          Creating distinguished office environments for those who demand excellence.
        </p>

        <div className="flex flex-col justify-center gap-6 sm:flex-row lg:justify-start">
          <Button size="lg" className={BUTTON_CLASS} asChild>
            <Link href="/products">View Collection</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className={`${BUTTON_CLASS} border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white`}
            asChild
          >
            <Link href="/contact">Book Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
