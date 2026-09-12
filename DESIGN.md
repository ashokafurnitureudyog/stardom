# Design

Tokens live in `src/app/globals.css` as CSS custom properties, exposed to Tailwind 4 through
`@theme inline`. Read them from there; this file records what they mean and how to use them.

## Color

Warm near-black ground with a brass accent. Every neutral is tinted to hue 36, so nothing in the
palette is a true grey and nothing is `#000` or `#fff`.

| Token | Dark | Role |
|---|---|---|
| `--background` | `hsl(36 50% 5%)` | Page ground |
| `--card` | `hsl(36 50% 0%)` | Recessed panels, the darkest surface |
| `--foreground` | `hsl(36 5% 90%)` | Body text |
| `--muted-foreground` | `hsl(36 5% 60%)` | Secondary text, captions |
| `--primary` | `hsl(36 36% 51.6%)` | Brass. The only accent |
| `--border` | `hsl(36 30% 18%)` | Hairlines |

Strategy: restrained. Brass carries well under 10% of any surface. It marks the current thing, the
one action that matters, and the brand mark. It is not a decoration to sprinkle.

The light theme is the same hues inverted and is the secondary case; the site is designed dark.

## Typography

Two families, both loaded through `next/font` in the root layout.

- **Playfair Display** (`font-serif`, `--font-playfair`): the name, section titles, anything that
  carries the brand. Often in its italic, which is the house's most recognisable mark.
- **Montserrat** (`font-sans`, `--font-montserrat`): every word meant to be read. Navigation, body,
  labels, forms.

Scale runs on a ~1.3 ratio. Headline weights stay light (300–400) at large sizes: the contrast comes
from size, not from bold. Body copy caps at 75ch.

Avoid: tracked-out uppercase eyebrow labels above headings, and accenting one word of a headline in
a second colour. Both are already over-used on this site.

## Structure

- Page width `max-w-7xl`, side padding 1.5rem rising to 4rem.
- Section rhythm varies deliberately: a hero is full height, an editorial section is `py-24`, a
  dense one is `py-16`. Uniform section padding reads as a template.
- Radius is small (`--radius: 0.3rem`). This is furniture, not software: corners are cut, not
  rounded.
- Hairlines over boxes. Prefer a rule and space to a bordered card. Cards are for products, where
  the card genuinely maps to a physical object.

## Motion

Entrances are for content that has just arrived, not for every section on scroll. Ease out on
exponential curves, 200–700ms. Never animate layout properties: opacity, transform, filter, and mask
only. Everything decorative honours `prefers-reduced-motion`.

## Imagery

Real factory and product photography, full-bleed, with a dark gradient scrim for text contrast.
Product shots sit on the recessed `--card` ground. No illustration, no 3D renders, no stock offices.
