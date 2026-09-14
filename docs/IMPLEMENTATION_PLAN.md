# AUREL — Master Implementation Roadmap

Implementation tracker following the strict phase-by-phase execution sequence.

- [x] Foundation (Phase 0)
- [x] Design tokens (Phase 1)
- [x] UI primitives (Phase 1)
- [x] Navigation & Global Shell (Phase 2)
- [x] Homepage (Phase 3)
- [x] Product data (Phase 4)
- [x] Catalog (Phase 4)
- [x] Product page (Phase 5)
- [x] Reviews (Phase 5)
- [x] Cart (Phase 6)
- [x] Checkout (Phase 7)
- [x] Account (Phase 8)
- [x] Orders (Phase 8)
- [x] Wishlist (Phase 8)
- [x] Editorial (Phase 10)
- [x] 3D (Phase 11)
- [x] SEO (Phase 12)
- [x] Accessibility (Phase 12)
- [x] Performance (Phase 12)
- [x] QA & Polish (Phase 12)

---

## Phase Execution Log
- **Phase 0 (Foundation)**: Architecture, repositories (`IProductRepository`, `IOrderRepository`, `IReviewRepository`), domain types, and Zod schemas (`lib/validation/checkout.ts`).
- **Phase 1 (Design Tokens & UI Primitives)**: Warm stone/alabaster tokens, hairline borders, serif/mono/sans typography, `Button`, `Badge`, `Input`, `Skeleton`.
- **Phase 2 (Navigation & Global Shell)**: `AnnouncementBar`, `SiteHeader`, `MegaMenu` 4-column dropdown, `Footer`, `MobileNav`, `SearchModal`.
- **Phase 3 (Homepage)**: Architectural gallery hero, Disciplines of Form, Permanent Roster, Monograph feature, New Releases, Serialized Commission, Materiality Manifesto.
- **Phase 4 (Catalog & Categories)**: `/shop` faceted filters, URL sync, and dedicated dynamic `/category/[slug]` routes with static generation.
- **Phase 5 (Product Detail Page & Reviews)**: 2-column gallery, finish swatches, technical spec table, accordions, verified review ledger, sticky add-to-bag bar.
- **Phase 6 (Cart)**: `CartDrawer` with free courier meter and promo codes, full `/cart` page with gift inscriptions.
- **Phase 7 (Checkout & Confirmation)**: Step-by-step encrypted checkout (`/checkout`), instant order persistence, `/checkout/confirmation` receipt, and `/tracking/[orderId]` live dispatch timeline.
- **Phase 8 (Account & Patron Records)**: `/account`, `/account/orders`, `/account/wishlist`, `/account/addresses`.
- **Phase 9 (Search & Faceting)**: Search modal with keyboard shortcuts (`Cmd+K`), faceted multi-attribute filters.
- **Phase 10 (Editorial / Journal)**: `/editorial`, `/editorial/[slug]`, plus seamless aliases at `/journal` and `/journal/[slug]`.
- **Phase 11 (3D)**: High-performance Three.js lighting rig, unibody geometry, contact shadows, pointer drag, fallback graphic, and prefers-reduced-motion compliance.
- **Phase 12 (QA & Build)**: Clean Next.js 15 production build with 33 statically rendered pages, zero lint/type errors, production server running on port 3000.
