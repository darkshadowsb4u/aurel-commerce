import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding studio database archive...");

  // Seed default patron user
  const passwordHash = await bcrypt.hash("password123", 10);
  const user = await prisma.user.upsert({
    where: { email: "patron@studio-residence.com" },
    update: {},
    create: {
      email: "patron@studio-residence.com",
      name: "Julian Vance",
      passwordHash,
      role: "patron",
      addresses: {
        create: {
          firstName: "Julian",
          lastName: "Vance",
          company: "Studio Residence Atelier",
          address1: "482 Mercer Street",
          address2: "Floor 4",
          city: "New York",
          state: "NY",
          postalCode: "10013",
          country: "United States",
          isDefault: true,
        },
      },
    },
  });
  console.log(`Created patron user: ${user.email}`);

  // Seed flagship products
  const products = [
    {
      id: "prod-sonus-a1",
      slug: "sonus-a1-wireless-speaker",
      name: "Sonus A1 Precision Speaker",
      subtitle: "360° Acoustic Monolith in Machined Aluminum",
      description:
        "Engineered from a single 8.2kg billet of Grade 5 titanium, the Sonus A1 delivers zero-diffraction acoustic propagation with dual passive radiators and planar magnetic drivers.",
      price: 480,
      compareAtPrice: 550,
      category: "Technology & Acoustics",
      categorySlug: "acoustics",
      collection: "Permanent Collection",
      collectionSlug: "permanent",
      materials: JSON.stringify(["Titanium", "Anodized Billet", "Planar Magnetic Driver"]),
      dimensions: JSON.stringify({ height: "240mm", width: "120mm", depth: "120mm", weight: "4.2kg" }),
      specifications: JSON.stringify({
        "Frequency Response": "35Hz - 28kHz",
        Connectivity: "Bluetooth 5.3 & Lossless Wi-Fi",
        "Battery Life": "24 Hours Continuous",
        Amplification: "Class-D Dual Mono 120W",
      }),
      inStock: true,
      stockCount: 14,
      rating: 4.9,
      reviewCount: 38,
      isNew: true,
      isBestSeller: true,
      images: JSON.stringify([
        { id: "img-01", url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200", alt: "Sonus A1 Front View" },
        { id: "img-02", url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200", alt: "Sonus A1 Detail" },
      ]),
      variants: JSON.stringify([
        { id: "var-01", name: "Matte Obsidian", colorName: "Obsidian", colorHex: "#121215", price: 480, stockCount: 8, inStock: true },
        { id: "var-02", name: "Raw Brushed Titanium", colorName: "Titanium", colorHex: "#71717A", price: 520, stockCount: 6, inStock: true },
      ]),
      editorialBlurb: "Winner of the 2025 International Acoustic Monograph Prize.",
    },
    {
      id: "prod-lumen-linear",
      slug: "lumen-linear-desk-luminaire",
      name: "Lumen Linear Desk Luminaire",
      subtitle: "Counterbalanced Brass Task Arm with Warm CRI 98 LED",
      description:
        "Precision counterweights and mouth-blown Murano smoked glass create a serene glare-free focal plane for deep concentration.",
      price: 620,
      category: "Architectural Lighting",
      categorySlug: "lighting",
      collection: "Permanent Collection",
      collectionSlug: "permanent",
      materials: JSON.stringify(["Unlacquered Brass", "Murano Glass", "CRI 98 LED"]),
      dimensions: JSON.stringify({ height: "450mm", width: "600mm", depth: "180mm", weight: "3.8kg" }),
      specifications: JSON.stringify({
        "Color Temperature": "2700K Warm Dimming",
        "Color Rendering": "98 CRI / R9 > 95",
        Power: "18W Solid-State LED",
      }),
      inStock: true,
      stockCount: 9,
      rating: 4.8,
      reviewCount: 24,
      isNew: true,
      images: JSON.stringify([
        { id: "img-03", url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200", alt: "Lumen Luminaire Front" },
      ]),
      variants: JSON.stringify([
        { id: "var-03", name: "Unlacquered Brass", colorName: "Brass", colorHex: "#D4AF37", price: 620, stockCount: 9, inStock: true },
      ]),
      editorialBlurb: "Hand-assembled in Milan using traditional lathe techniques.",
    },
    {
      id: "prod-basalt-vessel",
      slug: "basalt-incense-vessel",
      name: "Basalt Incense Vessel",
      subtitle: "Hand-Hewn Volcanic Rock Ritual Bowl",
      description:
        "Sculpted from ancient pozolanic volcanic basalt quarried in southern Italy. Captures ash effortlessly while retaining natural tactile roughness.",
      price: 190,
      category: "Living & Objects",
      categorySlug: "living",
      collection: "Archival Editions",
      collectionSlug: "archival",
      materials: JSON.stringify(["Volcanic Basalt Stone", "Solid Brass Holder"]),
      dimensions: JSON.stringify({ height: "80mm", width: "160mm", depth: "160mm", weight: "2.1kg" }),
      specifications: JSON.stringify({ Finish: "Raw Quarried Basalt", Origin: "Vesuvius Basin" }),
      inStock: true,
      stockCount: 18,
      rating: 5.0,
      reviewCount: 19,
      isLimitedEdition: true,
      editionNumber: 14,
      editionTotal: 50,
      images: JSON.stringify([
        { id: "img-04", url: "https://images.unsplash.com/photo-1602928321679-560b4139c907?q=80&w=1200", alt: "Basalt Vessel" },
      ]),
      variants: JSON.stringify([
        { id: "var-04", name: "Natural Basalt", colorName: "Charcoal Stone", colorHex: "#27272A", price: 190, stockCount: 18, inStock: true },
      ]),
      editorialBlurb: "Numbered run of 50 serialized pieces.",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }

  console.log(`Seeded ${products.length} products into archive database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
