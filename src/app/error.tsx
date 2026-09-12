"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Route-level error boundary. States what failed and offers the one action that
 * usually fixes it, rather than apologising. Retrying re-renders the segment,
 * including its server components, so a transient database or network fault
 * recovers without a full reload.
 */
const ErrorState = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center bg-background px-6">
      <div className="mx-auto w-full max-w-lg">
        <p className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
          This page didn't load.
        </p>
        <p className="mt-5 text-muted-foreground">
          Something went wrong on our side, not yours. Try again, and if it keeps happening, call
          the works on{" "}
          <a href="tel:+916284673783" className="text-foreground hover:text-primary">
            +91 62846 73783
          </a>
          .
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={reset}
            className="rounded-sm bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Go home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-12 border-t border-border/60 pt-6 text-xs text-muted-foreground">
            Reference {error.digest}
          </p>
        )}
      </div>
    </main>
  );
};

export default ErrorState;
