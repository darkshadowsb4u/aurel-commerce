import { Category } from "@/types/commerce";

export const CATEGORIES: Category[] = [
  {
    id: "cat-living",
    slug: "living",
    name: "Living & Objects",
    description: "Quiet sculptures and tactile utilitarian artifacts engineered for contemplative domestic living.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    featuredProductCount: 4,
    subcategories: ["Vessels", "Tabletop", "Timepieces", "Textiles"],
  },
  {
    id: "cat-workspace",
    slug: "workspace",
    name: "Workspace & Tools",
    description: "Precision instruments, machined writing instruments, and desk architecture for focused creative thought.",
    image: "https://images.unsplash.com/photo-1581291518655-9523c932edcf?q=80&w=1200&auto=format&fit=crop",
    featuredProductCount: 4,
    subcategories: ["Desk Architecture", "Machined Tools", "Leather Goods", "Cable Management"],
  },
  {
    id: "cat-acoustics",
    slug: "acoustics",
    name: "Technology & Acoustics",
    description: "Honest acoustic drivers, machined enclosures, and wireless audio calibrated for purity and spatial depth.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop",
    featuredProductCount: 4,
    subcategories: ["Acoustic Drivers", "Headphone Architecture", "Charging Docks"],
  },
  {
    id: "cat-lighting",
    slug: "lighting",
    name: "Architectural Lighting",
    description: "Diffused atmospheric luminance, CNC-milled aluminum luminaires, and dimmable tactile toggles.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
    featuredProductCount: 4,
    subcategories: ["Linear Desk Lamps", "Atmospheric Orbs", "Pendant Fixtures"],
  },
  {
    id: "cat-archival",
    slug: "archival",
    name: "Archival & Editions",
    description: "Numbered limited production runs, rare material explorations, and commemorative studio releases.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    featuredProductCount: 4,
    subcategories: ["Numbered Editions", "Experimental Metallurgy", "Studio Prototypes"],
  },
];
