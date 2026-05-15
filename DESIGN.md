# Design

## Overview

Warm South African earth aesthetic. The dominant surface is warm sandstone cream — not white, not beige, but the specific warmth of Highveld limestone. Dark sections use deep forest olive, not navy, not charcoal. The one pop of accent colour is warm clay-terracotta, used at most once per section as a focal point. The site should feel like it was designed by someone who grew up in Johannesburg and trained in Zurich.

## Theme

Light-dominant. Approximately 75% of the site surface is cream/sandstone. Dark sections are used exactly three times: hero, stats, footer. The terracotta CTA banner is the one bold colour moment per page — it must earn that slot.

## Colour Palette

| Token | Value | Role |
|---|---|---|
| `--color-sand` | `#F6F0E8` | Primary surface — warm sandstone, dominant bg |
| `--color-sand-deep` | `#EDE4D8` | Secondary surface — slightly deeper, alternate sections |
| `--color-white` | `#FFFFFF` | Card backgrounds on sand surfaces |
| `--color-forest` | `#1D2B1D` | Dark sections (hero, stats, footer) — deep South African forest |
| `--color-forest-mid` | `#273527` | Cards and elevated surfaces on dark bg |
| `--color-text` | `#1D2B1D` | Primary text — warm near-black (same hue as forest) |
| `--color-text-mid` | `#5A6A52` | Secondary text — muted sage-olive |
| `--color-text-muted` | `#8A9A82` | Labels, metadata, captions |
| `--color-text-light` | `#F6F0E8` | Text on dark sections |
| `--color-clay` | `#C4763A` | Primary accent — warm clay/terracotta, one use per section |
| `--color-clay-dark` | `#A8612E` | Accent hover state |
| `--color-clay-wash` | `#F0DDD0` | Very pale clay wash for subtle highlights |
| `--color-sage` | `#4A6741` | Secondary accent — mid-depth sage green |
| `--color-sage-light` | `#6B7A5A` | Lighter sage for icons, decorative use |
| `--color-gold` | `#C9A84C` | Reserved exclusively for BBBEE and Black Women Owned badges |
| `--color-border` | `#D8CEC4` | Warm stone borders |
| `--color-border-light` | `#EDE4D8` | Subtle section dividers |

## Typography

**Fonts:** Source Serif 4 (display/headings) + Source Sans 3 (body/UI). Both from Google Fonts. Chosen for screen optimisation, trustworthiness, and warmth without trendiness.

```
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
```

| Role | Family | Weight | Size | Line height |
|---|---|---|---|---|
| Hero headline | Source Serif 4 | 700 | clamp(2.75rem, 5.5vw, 5rem) | 1.05 |
| Section heading | Source Serif 4 | 600 | clamp(2rem, 3.5vw, 3rem) | 1.15 |
| Sub-heading | Source Sans 3 | 600 | 1.25rem | 1.35 |
| Body | Source Sans 3 | 400 | 1rem–1.0625rem | 1.75 |
| UI label | Source Sans 3 | 500 | 0.8125rem | 1.4 |
| Kicker label | Source Sans 3 | 600 | 0.75rem | 1 |

**Max line length:** 65ch for body, 55ch for headings.

**Kicker labels** (e.g. "MPSM SERVICES", "OUR DIVISIONS"): Source Sans 3 600, 0.75rem, letter-spacing 0.1em, uppercase, --color-text-muted. Used maximum 3 times across the entire site. No slashes or symbols.

No monospace. This is a brand site, not a developer tool — monospace reads as costume.

## Elevation and Surfaces

**Cards on sand:** White (#FFFFFF) background, `box-shadow: 0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)`. Radius: 12px. No borders.

**Cards on dark (forest bg):** `#273527` background. `box-shadow: 0 1px 4px rgba(0,0,0,0.2)`. Radius: 12px.

**Hover state (cards):** `translateY(-4px)` + elevated shadow. CSS transition only — no GSAP on hover.

**No glassmorphism. No backdrop-blur on cards. No border-left colour accents.**

## Image Treatment

Images use organic border-radius. Varied values per use: some rectangular-rounded (12–20px), some asymmetric blobs, one or two circular crops. Images sit off-grid where possible — overlapping column boundaries by 20–40px. All images `object-fit: cover`.

For placeholder states: solid warm-tinted divs with subtle SVG texture. Class `.img-placeholder`. Comments mark where photography replaces them.

## Layout

- Max content width: 1200px
- Section padding: `clamp(4rem, 8vw, 8rem)` top and bottom
- Horizontal padding: `clamp(1.5rem, 5vw, 5rem)`
- Asymmetric layouts preferred: hero is 60/40 split (text left, image right), not centered stack
- Content sections alternate: text-left/image-right, then text-right/image-left
- When using CSS Grid for cards: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`

## Motion (GSAP + ScrollTrigger)

All animations wrapped in `prefers-reduced-motion` guard. No animations for users who request reduced motion.

```js
gsap.defaults({ ease: "power2.out", duration: 0.8 });
```

| Pattern | y | opacity | stagger | notes |
|---|---|---|---|---|
| Section content fade-up | 30 | 0→1 | — | Default for headings, paragraphs |
| Card reveal | 30 | 0→1 | 0.1 | On grid containers |
| Hero headline | 40 | 0→1 | 0.06 per word | Immediate on mount |
| Image parallax | yPercent: -8 | — | — | scrub: 1, on decorative images only |
| Stat counter | innerText 0→N | — | — | scrollTrigger, duration 1.5 |
| Navbar bg | — | — | — | CSS transition, not GSAP |

No scale transforms. No rotation. No bounce or elastic easing. No horizontal scroll sections. No page-exit animations.

## Components

### Button

```
Primary:   clay bg, sand text, pill (999px), 0.875rem 2rem padding, min-height 48px
Secondary: forest border, transparent bg, forest text, pill, same padding
Ghost:     no bg, no border, clay text, "→" suffix, underline on hover
```

Hover: darken bg by one stop. No scale. No glow. No box-shadow addition.

### Section kicker label

Used maximum 3 times total across the site. Source Sans 3 600, 0.75rem, uppercase, letter-spacing 0.1em, --color-text-muted. Plain text above the heading, 1.5rem gap below.

### Badge

Pill shape (999px radius). Two variants:
- BBBEE/Black Women Owned: `--color-clay-wash` bg, `--color-clay` text, `--color-clay` border at 30% opacity
- Gold award variant: `--color-gold` at 15% opacity bg, `--color-gold` text

Used only in hero and footer trust areas.

### Dividers

1px warm border (`--color-border`) used sparingly. Prefer spacing and background alternation over visible dividers.
