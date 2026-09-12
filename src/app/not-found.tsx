import Link from "next/link";
import BaseLayout from "@/components/layout/BaseLayout";
import {
  PRODUCT_CATEGORIES,
  SERIES_SUMMARY,
  seriesHref,
  seriesName,
} from "@/lib/constants/ProductCategories";

export const metadata = {
  title: "Page not found | Stardom",
  robots: { index: false, follow: true },
};

/**
 * 404. An empty screen is an invitation to act, so this one offers the range
 * rather than apologising and leaving the visitor at a dead end.
 */
const NotFound = () => (
  <BaseLayout className="bg-background">
    <main className="mx-auto w-full max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
      <p className="font-serif text-5xl leading-tight text-foreground md:text-6xl">
        This page isn't here.
      </p>
      <p className="mt-5 max-w-md text-muted-foreground">
        The link may be old, or the product may have been retired. The seven series are below.
      </p>

      <ul className="mt-16 grid gap-x-12 gap-y-6 border-t border-border/60 pt-10 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCT_CATEGORIES.map((category) => (
          <li key={category}>
            <Link href={seriesHref(category)} className="group block">
              <span className="font-serif text-2xl text-foreground transition-colors group-hover:text-primary">
                {seriesName(category)}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {SERIES_SUMMARY[category]}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        <Link
          href="/"
          className="text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          The whole catalogue
        </Link>
        <Link
          href="/contact"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Ask us where it went
        </Link>
      </div>
    </main>
  </BaseLayout>
);

export default NotFound;
