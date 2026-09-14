import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Compass, SlidersHorizontal, Eye, Box, ArrowUpRight } from "lucide-react";
import { getProducts, getCategories, getEditorialStories } from "@/lib/data";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Hero3DCanvasWrapper } from "@/components/3d/Hero3DCanvasWrapper";
import { AcousticWaveformCanvas } from "@/components/3d/AcousticWaveformCanvas";
import { KineticText, ParallaxScroll } from "@/components/common/KineticTypography";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { formatPrice } from "@/lib/utils";

export default async function HomePage() {
  const products = await getProducts();
  const categories = await getCategories();
  const stories = await getEditorialStories();

  const heroProduct = products[0]; // Sonus A1 Precision Speaker
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);
  const archivalProduct = products.find((p) => p.isLimitedEdition) || products[4];
  const leadStory = stories[0];

  return (
    <div className="space-y-24 sm:space-y-36 pb-28 text-ink">
      {/* 1. EDITORIAL FLAGSHIP HERO WITH KINETIC TYPOGRAPHY & ACOUSTIC WAVEFORM */}
      <section className="relative min-h-[calc(100vh-6rem)] flex items-center border-b border-border bg-canvas overflow-hidden">
        {/* WebGL Acoustic Waveform & Ambient Lighting Mesh */}
        <div className="absolute inset-0 z-0">
          <AcousticWaveformCanvas opacity={0.35} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content (6 cols) */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-stone border border-border text-[10px] font-mono uppercase tracking-[0.14em] text-ink-secondary shadow-subtle">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>Atelier Edition &bull; Monolith Precision</span>
                </div>

                <KineticText
                  text="Objects sculpted for permanence."
                  as="h1"
                  className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink font-normal tracking-tight leading-[1.08]"
                />
              </div>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-lg font-sans">
                Engineered from 5-axis CNC-machined Grade 5 titanium, Tuscan bridle leather, and hand-hewn volcanic basalt stone. Zero cosmetic veneers. Pure physical authority.
              </p>

              {/* Action Block - Magnetic Cursor Tracking CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link href="/shop">
                  <MagneticButton className="w-full sm:w-auto bg-ink text-ink-inverse hover:opacity-90 text-xs uppercase tracking-widest font-mono font-medium py-4 px-8 text-center transition-colors inline-flex items-center justify-center gap-2 shadow-subtle">
                    <span>Explore Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </MagneticButton>
                </Link>
                <Link href={`/product/${heroProduct.slug}`}>
                  <MagneticButton className="w-full sm:w-auto bg-surface border border-border text-ink text-xs uppercase tracking-widest font-mono py-4 px-8 text-center hover:border-accent hover:bg-surface-subtle transition-colors shadow-subtle">
                    <span>Inspect Flagship</span>
                  </MagneticButton>
                </Link>
              </div>

              {/* Physical Material Provenance Strip */}
              <div className="pt-8 border-t border-border grid grid-cols-3 gap-6 text-[11px] font-mono">
                <div>
                  <span className="text-ink-muted uppercase block text-[10px]">Chassis</span>
                  <strong className="text-ink font-medium">Titanium Billet</strong>
                </div>
                <div>
                  <span className="text-ink-muted uppercase block text-[10px]">Tolerances</span>
                  <strong className="text-ink font-medium">&plusmn;0.005mm Fit</strong>
                </div>
                <div>
                  <span className="text-ink-muted uppercase block text-[10px]">Acoustic Field</span>
                  <strong className="text-accent font-medium">360&deg; Spatial</strong>
                </div>
              </div>
            </div>

            {/* Right Interactive 3D Showcase (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] sm:aspect-square w-full bg-surface-stone/80 backdrop-blur-xs border border-border overflow-hidden shadow-card group">
                {/* 3D Canvas */}
                <Hero3DCanvasWrapper />

                {/* Technical HUD Plaque */}
                <div className="absolute top-4 left-4 z-10 bg-canvas/90 backdrop-blur-md border border-border p-3 pointer-events-none max-w-[220px] shadow-subtle">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <p className="text-[9px] font-mono uppercase tracking-widest text-ink-muted">
                      Physical Model &bull; Interactive
                    </p>
                  </div>
                  <p className="font-serif text-xs text-ink font-normal">
                    {heroProduct.name}
                  </p>
                  <p className="text-[11px] font-mono tabular-nums text-ink-secondary mt-0.5">
                    {formatPrice(heroProduct.price)} &bull; Anodized Obsidian
                  </p>
                </div>

                {/* Interaction Instruction Overlay */}
                <div className="absolute bottom-4 left-4 z-10 text-[9px] font-mono text-ink-muted uppercase tracking-widest flex items-center gap-1.5 bg-canvas/90 backdrop-blur-xs px-2.5 py-1 border border-border shadow-subtle">
                  <Box className="w-3 h-3 text-accent" />
                  <span>Drag to rotate 3D view</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURATED TAXONOMIES / CATEGORY DISCOVERY WITH PARALLAX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-2 block">
              Disciplines of Form
            </span>
            <KineticText
              text="Architectural Taxonomies"
              as="h2"
              className="font-serif text-2xl sm:text-3xl text-ink font-normal"
            />
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-widest text-ink hover:text-accent inline-flex items-center gap-1.5 transition-colors"
          >
            <span>View All Works</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category, index) => (
            <ParallaxScroll key={category.id} speed={index % 2 === 0 ? 15 : -15}>
              <Link
                href={`/shop?category=${category.slug}`}
                className="group relative flex flex-col bg-surface border border-border overflow-hidden hover:border-ink transition-all shadow-subtle hover:shadow-card"
              >
                <div className="relative aspect-[16/10] w-full bg-canvas-stone overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-[#FAF9F5]">
                    <span className="text-[9px] font-mono tracking-widest uppercase text-[#D6C7B2] block mb-1">
                      Taxonomy 0{index + 1}
                    </span>
                    <h3 className="font-serif text-lg font-normal leading-snug">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-ink-secondary line-clamp-2 leading-relaxed font-sans">
                    {category.description}
                  </p>
                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-[11px] font-mono text-ink">
                    <span className="group-hover:text-accent font-medium">Explore Category</span>
                    <ArrowRight className="w-3 h-3 text-ink-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </ParallaxScroll>
          ))}
        </div>
      </section>

      {/* 3. FOUNDATIONAL ROSTER / FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-2 block">
              Permanent Roster
            </span>
            <KineticText
              text="Foundational Studio Works"
              as="h2"
              className="font-serif text-2xl sm:text-3xl text-ink font-normal"
            />
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-widest text-ink hover:text-accent inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Complete Inventory &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. EDITORIAL STORY / MONOGRAPH IN FOCUS */}
      <section className="bg-canvas-subtle border-y border-border py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Visual */}
            <div className="lg:col-span-7 relative">
              <ParallaxScroll speed={20}>
                <div className="relative aspect-[16/11] w-full bg-canvas-stone border border-border overflow-hidden shadow-card">
                  <Image
                    src={leadStory.coverImage}
                    alt={leadStory.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              </ParallaxScroll>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="text-[10px] font-mono tracking-widest uppercase text-ink-muted">
                  Studio Monograph &bull; {leadStory.category}
                </div>
                <KineticText
                  text={leadStory.title}
                  as="h2"
                  className="font-serif text-2xl sm:text-3xl text-ink font-normal leading-tight"
                />
              </div>

              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                {leadStory.excerpt}
              </p>

              <blockquote className="pl-4 border-l-2 border-accent text-xs italic text-ink-secondary font-serif">
                &ldquo;{leadStory.content[0].pullQuote}&rdquo;
                <footer className="not-italic text-[10px] font-mono text-ink-muted uppercase mt-1">
                  &mdash; {leadStory.content[0].quoteAttribution}
                </footer>
              </blockquote>

              <div className="pt-4">
                <Link href={`/editorial/${leadStory.slug}`}>
                  <MagneticButton className="inline-flex items-center gap-2 bg-ink text-ink-inverse hover:opacity-90 text-xs uppercase tracking-widest font-mono py-3.5 px-6 transition-colors shadow-subtle font-medium">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-2 block">
              Recent Additions
            </span>
            <KineticText
              text="New Studio Releases"
              as="h2"
              className="font-serif text-2xl sm:text-3xl text-ink font-normal"
            />
          </div>
          <Link
            href="/shop?sort=newest"
            className="text-xs font-mono uppercase tracking-widest text-ink hover:text-accent inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Explore All Releases &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. SERIALIZED ARCHIVAL COMMISSION SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface border border-border p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-canvas-subtle border border-border text-[10px] font-mono uppercase tracking-widest text-ink shadow-subtle">
                <Sparkles className="w-3 h-3 text-accent" />
                <span>Serialized Archival Run</span>
              </div>

              <div className="space-y-2">
                <KineticText
                  text={archivalProduct.name}
                  as="h2"
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink font-normal"
                />
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                  {archivalProduct.editorialBlurb}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border text-xs font-mono">
                <div>
                  <span className="text-[10px] text-ink-muted uppercase block">Edition</span>
                  <strong className="text-ink font-medium">
                    {archivalProduct.editionNumber}/{archivalProduct.editionTotal} Pieces
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted uppercase block">Material</span>
                  <strong className="text-ink font-medium">Pozzolanic Basalt</strong>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted uppercase block">Allocation</span>
                  <strong className="text-ink font-medium tabular-nums">
                    {formatPrice(archivalProduct.price)}
                  </strong>
                </div>
              </div>

              <div className="pt-2">
                <Link href={`/product/${archivalProduct.slug}`}>
                  <MagneticButton className="inline-flex items-center gap-2 bg-ink text-ink-inverse hover:opacity-90 text-xs uppercase tracking-widest font-mono font-medium py-3.5 px-6 transition-colors shadow-subtle">
                    <span>Examine Commission Plaque</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </MagneticButton>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-square w-full bg-canvas-stone border border-border overflow-hidden shadow-subtle">
                <Image
                  src={archivalProduct.images[0].url}
                  alt={archivalProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BRAND STORY & MATERIALITY MANIFESTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border pt-20">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted">
            Ethos & Calibration
          </span>
          <KineticText
            text="Designed for Generational Permanence"
            as="h2"
            className="font-serif text-2xl sm:text-3xl text-ink font-normal justify-center"
          />
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
            In an era of manufactured obsolescence and disposable consumer plastic, AUREL operates with deliberate friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="p-6 border border-border bg-surface shadow-subtle space-y-3">
            <span className="font-mono text-xs text-accent">01.</span>
            <h3 className="font-serif text-base text-ink font-medium">Honesty of Matter</h3>
            <p className="text-xs text-ink-secondary leading-relaxed font-sans">
              If an element appears to be aluminum, it is machined from solid billet. If it appears to be stone, it is hand-quarried volcanic basalt. We use zero simulated textures.
            </p>
          </div>

          <div className="p-6 border border-border bg-surface shadow-subtle space-y-3">
            <span className="font-mono text-xs text-accent">02.</span>
            <h3 className="font-serif text-base text-ink font-medium">Mechanical Serviceability</h3>
            <p className="text-xs text-ink-secondary leading-relaxed font-sans">
              Every electronic and mechanical component uses standard metric fasteners. Drivers, batteries, and LED modules are designed for effortless user servicing.
            </p>
          </div>

          <div className="p-6 border border-border bg-surface shadow-subtle space-y-3">
            <span className="font-mono text-xs text-accent">03.</span>
            <h3 className="font-serif text-base text-ink font-medium">Aesthetic Restraint</h3>
            <p className="text-xs text-ink-secondary leading-relaxed font-sans">
              We reject transient design trends, loud neon accents, and decorative gimmicks. An object is finished only when nothing more can be removed without compromising utility.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
