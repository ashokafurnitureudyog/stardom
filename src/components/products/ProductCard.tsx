"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types/ComponentTypes";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1610513320995-1ad4bbf25e55";

/**
 * Catalogue entry. The whole card is the link, the photograph does the selling,
 * and the series is stated in words rather than as a badge. Hover lifts the
 * image only: a card that glows is a card that looks like software.
 */
export const ProductCard = ({ product }: { product: Product }) => {
  const { id, name, description, images, category, product_collection } = product;
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Link
      href={`/products/${id}`}
      className="group flex h-full flex-col border-t border-border/60 pt-5 transition-colors hover:border-primary focus-visible:border-primary"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-card">
        <Image
          src={imageFailed || !images?.[0] ? FALLBACK_IMAGE : images[0]}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImageFailed(true)}
        />
      </div>

      <div className="flex grow flex-col pt-5">
        <h3 className="font-serif text-2xl leading-tight text-foreground transition-colors group-hover:text-primary">
          {name}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          {category}
          {product_collection ? ` · ${product_collection}` : ""}
        </p>

        <p className="mt-4 line-clamp-2 grow text-sm leading-relaxed text-muted-foreground/80">
          {description}
        </p>
      </div>
    </Link>
  );
};
