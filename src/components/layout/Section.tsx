import { cn } from "@/lib/utils/utils";

export const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={cn("py-24", className)}>
    <div className="max-w-7xl mx-auto px-6">{children}</div>
  </section>
);
