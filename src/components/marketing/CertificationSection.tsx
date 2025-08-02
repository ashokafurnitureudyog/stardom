import { GlobeIcon, PenToolIcon, ShieldCheckIcon } from "lucide-react";
import { Marquee } from "../ui/marquee";
import { cn } from "@/lib/utils/utils";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import { FlickeringGrid } from "../ui/flickering-grid";
import { Ripple } from "../ui/ripple";
import { BackgroundBeams } from "../ui/background-beams";

const CertificationsSection: React.FC = () => {
  const certifications = [
    {
      Icon: ShieldCheckIcon,
      name: "ISO 9001:2015",
      description: "Quality Management System",
      detail: "Ensuring Consistent Excellence",
      href: "/certifications/iso-9001-2015.pdf",
      cta: "View Certificate",
      className: "col-span-3 lg:col-span-2",
      background: (
        <Marquee
          pauseOnHover
          className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
        >
          {[
            {
              name: "Quality Control",
              body: "Rigorous testing at every stage",
            },
            {
              name: "Process Optimization",
              body: "Continuous improvement methodology",
            },
            {
              name: "Global Standards",
              body: "Benchmarked against international best practices",
            },
          ].map((f, idx) => (
            <figure
              key={idx}
              className={cn(
                "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
              )}
            >
              <figcaption className="text-sm font-medium">{f.name}</figcaption>
              <blockquote className="mt-2 text-xs">{f.body}</blockquote>
            </figure>
          ))}
        </Marquee>
      ),
    },
    {
      Icon: GlobeIcon,
      name: "Global Standards",
      description: "International Quality Benchmarks",
      detail: "International Design Standards",
      href: "/certifications/iso-9001-2015.pdf",
      cta: "View Standards",
      className: "col-span-3 lg:col-span-1",
      background: (
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
          height={800}
          width={800}
        />
      ),
    },
    {
      Icon: PenToolIcon,
      name: "BIFMA Certification",
      description: "Furniture Industry Standards",
      detail: "Quality & Performance Testing",
      href: "/certifications/bifma.pdf",
      cta: "View Certificate",
      className: "col-span-3 lg:col-span-1",
      background: <Ripple />,
    },
    {
      Icon: ShieldCheckIcon,
      name: "ISO 14001:2015",
      description: "Environmental Management System",
      detail: "Sustainable Manufacturing",
      href: "/certifications/iso-14001-2015.pdf",
      cta: "View Certificate",
      className: "col-span-3 lg:col-span-2",
      background: <BackgroundBeams />,
    },
  ];

  return (
    <BentoGrid>
      {certifications.map((cert, idx) => (
        <BentoCard
          key={idx}
          {...cert}
          className={`${cert.className} group overflow-hidden  shadow-lg hover:shadow-xl transition-all duration-500`}
        />
      ))}
    </BentoGrid>
  );
};

export default CertificationsSection;
