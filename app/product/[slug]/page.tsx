import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { ProductPurchaseSection } from "@/components/pdp/ProductPurchaseSection";
import { ProductAccordions } from "@/components/pdp/ProductAccordions";
import { ProductReviews } from "@/components/pdp/ProductReviews";
import { ProductCard } from "@/components/commerce/ProductCard";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Object Not Found",
    };
  }

  return {
    title: `${product.name} — ${product.subtitle}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | AUREL`,
      description: product.editorialBlurb,
      images: [
        {
          url: product.images[0].url,
          width: 1200,
          height: 900,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Catalog", href: "/shop" },
          { label: product.category, href: `/shop?category=${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      {/* Main 2-Column Editorial Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Visual Gallery & 3D (7 cols) */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            productName={product.name}
            has3DViewer={product.has3DViewer}
          />
        </div>

        {/* Right Column: Acquisition Architecture & Narrative (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <ProductPurchaseSection product={product} />
          <ProductAccordions product={product} />
        </div>
      </div>

      {/* Editorial Long-Form Description & Specs Table */}
      <section className="border-t border-border pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted">
            Architectural Intent
          </span>
          <h2 className="font-serif text-2xl text-ink font-normal">
            Design Philosophy & Ergonomics
          </h2>
          <p className="text-sm text-ink-secondary leading-relaxed">
            {product.description}
          </p>
          <p className="text-xs text-ink-muted italic border-l-2 border-accent pl-3 mt-4">
            &ldquo;{product.editorialBlurb}&rdquo;
          </p>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted">
            Calibrated Metrics
          </span>
          <h3 className="font-serif text-xl text-ink font-normal">
            Technical Tolerances
          </h3>

          <div className="border border-border divide-y divide-border bg-surface text-xs">
            {product.specifications.map((spec) => (
              <div key={spec.label} className="flex justify-between p-3">
                <span className="font-mono text-ink-muted uppercase">{spec.label}</span>
                <span className="font-medium text-ink text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Evaluations / Reviews */}
      <ProductReviews
        productId={product.id}
        initialRating={product.rating}
        initialReviewCount={product.reviewCount}
      />

      {/* Related Studio Works */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border pt-16 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-ink-muted">
                Harmonious Pairings
              </span>
              <h2 className="font-serif text-2xl text-ink font-normal mt-1">
                Complementary Domestic Objects
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
