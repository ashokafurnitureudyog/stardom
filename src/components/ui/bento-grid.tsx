import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

type BentoCardProps = {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: LucideIcon;
  description: string;
  href: string;
  cta: string;
};

const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl border bg-card text-card-foreground shadow-md transition-all duration-500 hover:shadow-xl",
      className,
    )}
  >
    <div className="overflow-hidden">{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-7 transition-all duration-500 ease-out group-hover:-translate-y-10">
      <Icon className="h-9 w-9 origin-left mb-6 transform-gpu text-primary transition-all duration-500 ease-out group-hover:scale-75 group-hover:text-primary/90" />
      <h3 className="text-2xl font-semibold font-serif tracking-tight">
        {name}
      </h3>
      <p className="max-w-lg text-sm/relaxed text-muted-foreground">
        {description}
      </p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button
        variant="ghost"
        asChild
        size="sm"
        className="pointer-events-auto hover:bg-primary/10 transition-colors"
      >
        <a href={href} className="flex items-center gap-2 font-medium">
          {cta}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />
  </div>
);

export { BentoCard, BentoGrid };
