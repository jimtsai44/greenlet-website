---
name: Greenlet
description: NZ cat-grass doll homepage in a lamplit attic-bedroom visual system, on white
colors:
  wall-cream: "#FFFFFF"
  wall-sage: "#7C8A63"
  wood: "#6B4630"
  wood-line: "#6B4630"
  ink: "#2E2A22"
  ink-soft: "#5C5544"
  rose: "#9C4F56"
  rose-hover: "#7E3B41"
  blush: "#D99BA0"
  sage: "#6F8F5B"
  sage-dark: "#4C6B3B"
  gold: "#C99A45"
  slate: "#7E97A3"
  paper: "#F7F1E1"
  clay: "#B98354"
  cat-black: "#2E2A22"
typography:
  display:
    fontFamily: "'Yeseva One', Georgia, serif"
    fontWeight: 400
  body:
    fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.7
  hand:
    fontFamily: "'Caveat', 'Segoe UI', cursive"
    fontWeight: 700
rounded:
  xs: "3px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 5vw, 64px)"
  section: "clamp(48px, 7vw, 88px)"
components:
  button-primary:
    backgroundColor: "{colors.rose}"
    textColor: "#FBF6E9"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
  button-primary-hover:
    backgroundColor: "{colors.rose-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
---

# Design System: Greenlet

## Overview

**Creative North Star: "The Lamplit Windowsill, on a Clear Page"**

This is a redesign, replacing the earlier "Rural Delivery Route" system, then refined a second time to rename the brand (KiKis Green → **Greenlet**, both to shed a trademark risk and to anchor the new bird mascot — a greenlet is a real genus of small olive-green songbirds) and to open the page up onto white. The client supplied a Studio Ghibli reference frame (a girl's attic bedroom) for palette and mood only — no character, composition, or specific scene from that image is reproduced; the attic-bedroom *world* is original. The homepage lives inside a cozy, lamplit attic window nook rather than on a delivery road: the doll grows on a windowsill, an original black-cat mascot and an original green-bird mascot share the scene, and the site's sections are corners of the same room (windowsill, craft desk, bookshelf) rather than mailbox waypoints. The cart's signature interaction is a small hanging lamp that lights up once something is waiting.

**Key Characteristics:**
- Storybook, not industrial: a warm serif display face and handwritten accent labels.
- One softened accent (deep dusty rose) rather than a bright saturated color — the mood is muted and lamplit, not high-contrast.
- White page ground with deliberate negative space: decoration (the wallpaper stripe, in particular) now lives only inside the hero illustration itself, never spread across the page as a texture.
- Two original mascots — a black cat and a green bird — appear together in the hero and again in the Story section; neither reproduces the client's reference character.
- Single fixed theme, by client decision: the page no longer adapts to the visitor's OS dark-mode preference. It renders the same white/light design for everyone. (A `prefers-color-scheme: dark` variant existed briefly and was removed after it revealed a real bug — see Cat Black below.)

## Colors

A muted, lamplit attic palette: sage-and-cream stripes, warm wood, dusty rose, with a soft blue-grey for quiet moments and brass gold reserved for the lamp glow.

### Primary
- **Dusty Rose** (`#9C4F56`, hover `#7E3B41`): the one committed accent — primary CTA, cart-count badge, "Bestseller" tag. Deliberately deepened from the reference image's paler pink so it still carries enough weight to read as text-bearing UI, not just a mood swatch.

### Secondary
- **Garden Sage** (`#6F8F5B` decorative / `#4C6B3B` functional-dark): the growth color — route markers, "New" badge, story-section block, fact tags.

### Tertiary
- **Window Slate** (`#7E97A3`): quiet accent, used only in the hero's glass panes and a craft-desk icon.
- **Lamp Gold** (`#C99A45`): reserved for the lit-lamp glow and its toast/form-note accent — never a general UI color.

### Neutral
- **Page White** (`#FFFFFF`): page background — deliberately plain; leave it empty rather than filling it with texture.
- **Wallpaper Sage Stripe** (`#7C8A63`): a whisper of decorative stripe *inside the hero illustration only* (low opacity, confined to the window's width), never a page-wide fill and never a text or button surface.
- **Window Wood** (`#6B4630`): badge/fill role needing light text on top.
- **Wood Line** (same hex): every structural border/divider — header rule, card edges, dividers. Kept as a separate token from Window Wood on principle (dividers vs. fill-with-text roles), even though both currently share one value.
- **Ink** (`#2E2A22`): primary text on the page ground.
- **Ink Soft** (`#5C5544`): secondary text on the page ground.
- **Shelf Paper** (`#F7F1E1`): card/tag/cart-drawer surface.
- **Terracotta Clay** (`#B98354`): the doll illustration's material color.
- **Cat Black** (`#2E2A22`, same value as Ink): a dedicated fixed token for the cat mascot's silhouette, kept separate from Ink so the mascot's identity color can never accidentally shift if theming is reconsidered later — the bug this guards against actually happened once (the cat rendered white under a since-removed dark-mode override) and is why the token exists.

### Named Rules
**The Paper Room Rule.** Any component with a Shelf Paper background (product cards, audience cards, FAQ items, cart drawer) pins its own text color to the fixed light-mode ink values via a local CSS custom-property override *and* an explicit `color` declaration on the container — paper doesn't turn dark at night, and inherited (not re-declared) text must still resolve against the pinned value, not the page's flipped ink.

**The One Lamp Rule.** Lamp Gold appears only as the lit/unlit state of the cart lamp (header + hero) and its toast/form accent — it is a state signal, not a decorative color.

**The Meaningful Ink Rule.** White stays white. Illustration, pattern, and color are spent only on the two spots that carry brand meaning — the hero window scene and the Story mascots — never as ambient page texture.

## Typography

**Display Font:** Yeseva One (with Georgia fallback)
**Body Font:** Nunito (with Segoe UI, system-ui fallback)
**Handwritten accent:** Caveat (with Segoe UI, cursive fallback)

**Character:** A warm, rounded storybook serif for headings paired with a soft rounded-geometric body sans, with handwritten diary-style captions doing the work the previous system gave to uppercase stencil labels.

### Hierarchy
- **Display/H1** (400, `clamp(2.3rem, 5vw, 3.4rem)`, 1.15 line-height): hero headline only.
- **H2** (400, `clamp(1.7rem, 3.4vw, 2.3rem)`): section titles.
- **H3** (400, `1.2–1.25rem`, reduced to ~1.0–1.1rem in cards): card/sub-section titles.
- **Body** (400, 16px, 1.7 line-height): running copy.
- **Eyebrow/label** (Caveat 700, 1.15rem, no letter-spacing): section kickers — handwritten, not uppercase-tracked like the old stencil system.

## Layout

Content max-width 1160px, fluid gutter (`clamp(20px, 5vw, 64px)`), full-bleed chrome sections (header, story, footer) via negative-margin/re-padding. Responsive breakpoints at 980px and 640px.

**Multi-page structure.** The header nav is the site's directory, not a same-page anchor list for everything: `Shop` / `Growing Up` / `Our Story` stay same-page anchors into `index.html`, but `FAQ` and `Newsletter` are separate pages (`faq.html`, `subscribe.html`) reached only by clicking the nav — set up this way because the client plans to keep publishing articles, and a growing single page can't hold that. Each standalone page opens with a `.page-hero` (centered eyebrow + H1 + lede, no illustration) in place of the homepage's big hero, and repeats the same header/footer/cart-panel markup verbatim (no shared templating exists yet — keep these three files' chrome in sync by hand when editing one). The current page's nav link carries `aria-current="page"` (styled in Dusty Rose) rather than any visual "active tab" treatment. Below 980px the nav collapses behind a hamburger (`.nav-toggle`, `#navToggle`) that toggles `#mainNav`'s `.is-open` class into a full-width dropdown anchored under the sticky header — added after the multi-page split made the nav load-bearing (FAQ and Newsletter are otherwise unreachable on a phone, where there's no room to scroll to an anchor that doesn't exist on the current page).

## Elevation & Depth

Flat, as before — no shadows except the hero's grounding ellipse and the cart drawer's dim overlay. Depth now comes from paper/wood/wallpaper material contrast rather than tin/timber.

## Shapes

Rounder than the previous system: 6–14px radii on cards and panels (vs. the old 3–4px "tin" language), plus full pill radius on buttons, badges, and the newsletter card — reads as soft storybook furniture rather than stamped metal. Rounded scale: `xs 3px / sm 6px / md 8px / lg 10px / xl 14px / pill 999px`.

## Components

### Buttons
- **Shape:** pill radius.
- **Primary:** Dusty Rose fill, light cream text, 13px/26px padding.
- **Hover:** darkens to `#7E3B41`, lifts 1px.
- **Ghost:** transparent fill, ink text and wood-line border; inverts to solid wood fill on hover.

### Cards
- **Corner style:** 8–10px radius (audience/product cards), 8px (FAQ items).
- **Background:** Shelf Paper, always — see the Paper Room Rule.
- **Border:** 2px Wood Line.
- **Shadow:** none.

### Badges / Tags
- **Style:** pill radius, plain-weight uppercase label.
- **Color assignment:** rose for "Bestseller", sage-dark for "New", a fixed neutral brown-grey for plain tags, fixed Window Wood for "Limited".

### Inputs
- **Style:** Shelf Paper background, 2px Wood Line border, pill radius, fixed dark ink text.

### Navigation
- **Style:** plain-weight Nunito links, ink-soft default, rose on hover; collapses below 980px.

### Signature Component: the Lamp
The cart toggle and the hero's hanging lamp share one state: unlit (outline only) at an empty cart, lit (gold fill, soft opacity fade-in) once an item is added — the "one state, two locations" device carried over from the prior direction, translated into this world's own object.

### Signature Component: the Growth Cycle
The doll's ceramic pot in the hero is static; only its "hair" cycles, every 5 seconds, through three stacked SVG groups (`.grass-scene`, cross-faded via opacity) telling the real product story in miniature: bare seed dots → short sprouts → the full trimmed style shown elsewhere on the page. The hand-written caption beneath the illustration updates in lockstep with each stage. Starts on the fullest/prettiest stage on page load, then loops. Respects `prefers-reduced-motion` by not auto-advancing at all — the page shows the static grown stage only, matching the Named Rule below.

**The Paused-by-Default Rule.** Any auto-advancing content (currently: only the hero growth cycle) must check `prefers-reduced-motion` before starting its timer, not just before animating a transition — a visitor who asked for less motion shouldn't get content that changes on its own on a fixed clock, even smoothly.

### Mascots: the Cat and the Bird
Two original characters, always shown together, never reproducing the client's reference image: a curled black-cat silhouette and a small sage-green bird (beak and eye in Lamp Gold and Shelf Paper). They appear in the hero (bird perched on the window frame, looking down at the cat and the growing doll) and again as a small paired vignette beside the Story heading. Built from the same simple flat-shape language as the doll illustrations — no new rendering technique introduced for the mascots.

## Do's and Don'ts

### Do:
- **Do** pin both a local `--ink`/`--ink-soft` custom-property override *and* an explicit `color` on any new Shelf-Paper-background component — inherited color does not pick up a local pin declared between it and the page root.
- **Do** keep Lamp Gold exclusive to the lamp/cart state signal.
- **Do** keep card corners in the 6–14px range; sharper corners break the storybook-furniture read.

### Don't:
- **Don't** reproduce the client's reference image's specific character, composition, or copyrighted scene — palette and mood only.
- **Don't** use Wallpaper Sage Stripe as a text or button background; it's decorative-only (use Garden Sage functional-dark for that).
- **Don't** add a shadow to cards — flat paper-and-wood stays flat.
- **Don't** revive the old stencil/mono/industrial type system on this surface; it belongs to the superseded direction.
