# Replace code-snippet visuals with anime.js logo draw-on

## Problem

Two homepage sections show fake code/terminal UI aimed at developers
(a typing code snippet in the "Clean, Maintainable Code" bento card, and a
terminal window mockup in the Hero's right panel). The site's actual
audience is non-technical buyers, who may find raw code intimidating rather
than reassuring. Replace both with a simple, on-brand animation instead.

## Approach

Add `animejs` (v4.5.0) and build one shared component,
`src/components/ui/AnimatedLogoDraw.tsx`, that animates the existing brand
mark's strokes drawing on using anime.js's `svg.createDrawable()`. It reuses
the exact path geometry from `LogoMark` (`src/components/ui/Logo.tsx:40-52`)
rather than new artwork, so the animated version stays visually identical to
the static logo used elsewhere (navbar, footer, favicon).

Behavior:
- Animates once when the element scrolls into view (`IntersectionObserver`),
  then holds at the fully-drawn state — no infinite looping.
- Respects `prefers-reduced-motion`: renders the completed mark statically,
  animation skipped entirely.
- Accepts a `size` prop (px) so it can render at different scales.

## Integration points

**`src/components/home/Hero.tsx`** — right panel:
- Remove the terminal window block and the 3-stat grid
  (lines ~228-278 in the current file).
- Keep the floating "v2.4.1 live" badge as-is.
- Keep the 5-star client review card as-is.
- New layout: a glass card containing `<AnimatedLogoDraw size={140} />`,
  then the review card below it, with the live badge still floated
  top-right of the panel as before.

**`src/components/home/WhyChooseUs.tsx`** — "Clean, Maintainable Code" card:
- Delete the `CodeTyper` function and the `codeLines` array entirely.
- Replace its usage (currently rendered inside the dark rounded panel next
  to the card copy) with `<AnimatedLogoDraw size={72} />` inside the same
  panel styling.

## Out of scope

- No changes to card copy, colors, or the rest of the bento grid.
- No changes to Hero content other than the right panel's terminal + stats.
- No new brand artwork — the drawn shape is the existing "A" monogram only.

## Testing

Manual only: run the dev server, view the homepage, confirm the draw-on
animation fires once per element when scrolled into view, confirm no
layout shift, confirm `prefers-reduced-motion` shows the static mark.
