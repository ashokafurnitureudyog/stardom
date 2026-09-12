/**
 * Section heading. Takes a title and an optional line beneath it, so a section
 * can carry context without an uppercase label above it and without splitting
 * one word of the heading into a second colour.
 *
 * Left-aligned by default: the page reads as a document about a manufacturer,
 * not a deck of centred slides.
 */
export const SectionTitle = ({
  children,
  description,
  align = "left",
}: {
  children: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
}) => (
  <div className={`mb-14 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
    <h2 className="font-serif text-4xl font-normal leading-[1.1] text-foreground md:text-5xl">
      {children}
    </h2>
    {description && (
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">{description}</p>
    )}
  </div>
);
