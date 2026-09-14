import { EditorialStory } from "@/types/commerce";

export const EDITORIAL_STORIES: EditorialStory[] = [
  {
    id: "story-01-aluminum-acoustics",
    slug: "monolithic-acoustics-machined-aluminum",
    title: "Monolithic Resonance: The Metallurgy Behind the Sonus A1",
    subtitle: "A journey through five-axis CNC machining, harmonic damping, and Scandinavian wool acoustics.",
    excerpt: "Why we discarded cast plastic speaker housings in favor of single-billet aluminum extrusions, and how natural materials restore warmth to digital audio reproduction.",
    coverImage: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1400&auto=format&fit=crop",
    author: {
      name: "Marcus Lindqvist",
      role: "Head of Industrial Design",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    category: "Materiality",
    publishedAt: "2026-03-08",
    readTime: "6 min read",
    shoppableProductSlugs: ["sonus-a1-wireless-speaker", "aura-walnut-headphone-monolith"],
    content: [
      {
        sectionHeading: "The Elimination of Resonance",
        paragraphs: [
          "In conventional loudspeaker manufacturing, enclosure vibration is treated as an inevitable compromise solved with internal bracing and adhesive damping. But acoustic physics does not negotiate. When a neodymium driver creates rapid air displacement, energy transfers directly into the cabinet walls, muddying mid-range transparency.",
          "Our design studio spent twenty months testing extrusion alloys before settling on 6063 aerospace aluminum. By milling each Sonus A1 cabinet from a 7.8-kilogram raw billet down to an 880-gram continuous unibody, we eliminated seams, mechanical fasteners, and flexural resonances.",
        ],
        pullQuote: "If an object is engineered with absolute truth to materials, decoration becomes not just unnecessary, but offensive.",
        quoteAttribution: "Marcus Lindqvist, Head of Industrial Design",
      },
      {
        sectionHeading: "Tactile Restraint",
        paragraphs: [
          "We also rejected capacitive glass touchscreens. Digital interfaces date an object within three years. Instead, the volume wheel is machined with a micro-knurled diamond grip, resting on silent fluid-damped bearings that offer tactile hydraulic resistance.",
        ],
        image: {
          url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop",
          caption: "Acoustic laboratory testing prototype enclosure in Gothenburg.",
        },
      },
    ],
  },
  {
    id: "story-02-basalt-ritual",
    slug: "geology-of-quiet-carved-basalt",
    title: "The Geology of Quiet: Extracting Form from Volcanic Stone",
    subtitle: "In the volcanic foothills of Nagano, master stonecutters transform cooled magma into domestic shrines of contemplation.",
    excerpt: "An exploration into geologic permanence, slow hand-finishing, and the ancient Japanese ritual of Koh-do (listening to incense).",
    coverImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1400&auto=format&fit=crop",
    author: {
      name: "Emi Tanaka",
      role: "Curator of Craft & Artifacts",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    },
    category: "Studio Visit",
    publishedAt: "2026-02-14",
    readTime: "8 min read",
    shoppableProductSlugs: ["basalt-incense-vessel", "archival-edition-01-concrete-clock"],
    content: [
      {
        sectionHeading: "Listening to the Stone",
        paragraphs: [
          "Basalt is born of violent pressure and sudden atmospheric cooling. Unlike marble or limestone, which can be shaped with uniform ease, basalt possesses dense, micro-crystalline grain structures that demand respect and intense patience.",
          "Our stonecutters carve the ash basin using diamond-tipped water wheels, leaving the exterior perimeter rough-hewn and untreated. No two vessels possess identical textures; each captures the cooling ripples of ancient magma flows.",
        ],
        pullQuote: "We do not make luxury objects to celebrate status. We make objects that help you inhabit the present moment.",
        quoteAttribution: "Emi Tanaka, Curator of Craft",
      },
    ],
  },
];
