# AUREL — Product & Design Rules Specification

> **MANDATORY INSTRUCTION FOR AGENTS & DEVELOPERS:**
> Before modifying any UI, components, or styles in this project, read this document. Treat it as a persistent product and design specification. Do not override or deviate from it unless explicitly instructed.

---

## 1. Brand & Positioning
- **Brand Name**: AUREL
- **Positioning**: Premium contemporary objects for modern living.
- **Tone & Feeling**: Sophisticated, editorial, quiet, tactile, premium, contemporary, confident, minimal but not empty.
- **Product Categories**:
  1. Furniture
  2. Lighting
  3. Audio
  4. Workspace
  5. Travel
  6. Technology accessories
  7. Home objects
  8. Fragrance
  9. Limited editions

This is an **authentic ecommerce platform**, not an art portfolio, not a tech startup landing page, and not a crypto dashboard.

---

## 2. Visual Direction & Aesthetic Mandate
### Permitted & Required:
- **Canvas & Surfaces**: Warm white / alabaster (`#FBFBF9`, `#F5F4F0`), tactile stone (`#EFECE6`, `#E5E2DC`), charcoal and graphite typography.
- **Accents**: Subtle natural bronze, warm umber, or muted olive (`#8A7356`, `#6E5A44`).
- **Surfaces**: Flat or subtly tactile surfaces with crisp hairline borders (`#E5E2DC`, `#D8D4CC`).
- **Restraint**: Whitespace used as a luxury material. Calm, confident composition.

### Strictly Forbidden:
- **NO** dark crypto/gaming palettes with pitch-black backgrounds and neon/gold glowing borders.
- **NO** purple/blue gradients or generic AI-tech aesthetics.
- **NO** excessive glassmorphism, heavy backdrop blurs, or floaty drop shadows.
- **NO** giant pill-shaped buttons everywhere.
- **NO** cartoon illustrations, 3D floating emojis, or random decorative blobs.
- **NO** techno-jargon labels ("Billet 6063-T6", "Telemetry HUD", "±0.01mm Precision") masquerading as luxury copy. Real luxury communicates craftsmanship, provenance, and material poetry.

---

## 3. Typography & Hierarchy
- **Font Stack**:
  - Primary Sans: Swiss modern neutral grotesque (`Plus Jakarta Sans` / `Inter`).
  - Editorial Display: High-contrast refined editorial serif (`Playfair Display` / `Cormorant`).
  - Technical / Metadata: Crisp tabular monospaced font (`JetBrains Mono`), used sparingly for SKU, dimensions, and specifications only.
- **Rules**:
  - Do not use more than 3 font families.
  - Do not make every heading oversized.
  - Body text must remain quiet, readable, and restrained (14px–16px, line-height 1.6–1.7).
  - Small uppercase metadata with delicate tracking (`tracking-wider`, `text-[10px]`–`text-[11px]`).
  - Prices must be carefully formatted with tabular figures.

---

## 4. Layout & Grid System
- **Desktop**: 12-column conceptual grid with consistent gutters (24px–32px) and max-width (`max-w-7xl` or `1280px`).
- **Mobile**: 4-column grid with 16px margins.
- **Vertical Rhythm**: Deliberate, rhythmic spacing (`space-y-16`, `space-y-24`, `space-y-32`).
- **Containers**: Not everything is a card. Avoid putting every section or product in a floating rounded box. Use whitespace and hairline borders for separation.

---

## 5. UI Primitives & Button Hierarchy
- **Primary**: Solid graphite/black with crisp white text (`bg-[#18181B] text-white hover:bg-black`). Rectangular or subtle 2px radius.
- **Secondary**: Outlined hairline border (`border border-[#D4D1C8] text-[#18181B] hover:bg-[#F2EFEB]`).
- **Tertiary**: Understated text link with animated underline or subtle arrow.
- **Destructive**: Muted crimson, never garish.
- **Icon Buttons**: Clean square or circular subtle hit-targets with accessible `aria-label`.

---

## 6. Mandatory UI States
Every user-facing component must handle:
1. **Loading** (quiet skeletons with matching dimensions, no jumpy spinners).
2. **Empty** (helpful, conversational, with direct recovery action).
3. **Error** (clear message, non-technical, retry or fallback path).
4. **Success** (subtle, non-disruptive confirmation).
5. **Disabled / Unavailable / Out of Stock** (clear visual indication, alternative suggestions).
6. **Validation Error** (inline, high-contrast, associated with input via `aria-describedby`).

---

## 7. Accessibility & Inclusivity (WCAG 2.2 AA)
- Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<figure>`).
- Full keyboard operability (Tab order, Esc closes overlays, Enter/Space activates).
- Visible, high-contrast focus rings (`focus-visible:outline-2 focus-visible:outline-offset-2`).
- Full screen-reader support with `aria-expanded`, `aria-controls`, `aria-label`, `aria-live`.
- Strict respect for `prefers-reduced-motion`: disable auto-animations and smooth transitions when reduced motion is preferred; never disable functionality or replace content with an error banner.

---

## 8. Performance & Motion
- Meaningful motion only: layout transitions, drawer slide-ins, subtle image crossfades.
- No continuous gratuitous spinning or bouncing.
- Next.js `Image` with explicit `sizes`, `priority` on above-the-fold heroes, and lazy loading elsewhere.
- 3D is strictly an enhancement, loaded dynamically with `next/dynamic` (`ssr: false`), and only for products that genuinely have 3D assets.
