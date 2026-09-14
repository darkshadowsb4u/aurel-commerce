import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEditorialStories, getEditorialStoryBySlug, getProducts } from "@/lib/data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ArrowLeft } from "lucide-react";

interface EditorialPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const stories = await getEditorialStories();
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: EditorialPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getEditorialStoryBySlug(slug);

  if (!story) {
    return { title: "Monograph Not Found" };
  }

  return {
    title: `${story.title} — Studio Monograph`,
    description: story.excerpt,
    openGraph: {
      title: `${story.title} | AUREL Journal`,
      description: story.excerpt,
      images: [
        {
          url: story.coverImage,
          width: 1400,
          height: 800,
          alt: story.title,
        },
      ],
    },
  };
}

export default async function EditorialArticlePage({ params }: EditorialPageProps) {
  const { slug } = await params;
  const story = await getEditorialStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const allProducts = await getProducts();
  const shoppableObjects = allProducts.filter((p) =>
    story.shoppableProductSlugs.includes(p.slug)
  );

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <Breadcrumbs
        items={[
          { label: "Studio Journal", href: "/editorial" },
          { label: story.title },
        ]}
      />

      {/* Article Header */}
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3 text-[11px] font-mono uppercase tracking-widest text-accent">
          <span>{story.category}</span>
          <span>&bull;</span>
          <span className="text-ink-muted">{story.readTime}</span>
          <span>&bull;</span>
          <span className="text-ink-muted">{story.publishedAt}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-normal leading-[1.12]">
          {story.title}
        </h1>

        <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl mx-auto">
          {story.subtitle}
        </p>

        {/* Author signature line */}
        <div className="pt-6 flex items-center justify-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-surface-stone border border-border">
            <Image
              src={story.author.avatar}
              alt={story.author.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="text-left text-xs">
            <p className="font-medium text-ink">{story.author.name}</p>
            <p className="text-[10px] text-ink-muted font-mono">{story.author.role}</p>
          </div>
        </div>
      </header>

      {/* Full-bleed cover visual */}
      <div className="relative aspect-[16/10] w-full bg-surface-stone border border-border overflow-hidden shadow-card">
        <Image
          src={story.coverImage}
          alt={story.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
        />
      </div>

      {/* Content Body */}
      <div className="max-w-2xl mx-auto space-y-10 text-sm sm:text-base leading-relaxed text-ink-secondary">
        {story.content.map((block, idx) => (
          <div key={idx} className="space-y-6">
            {block.sectionHeading && (
              <h2 className="font-serif text-2xl text-ink font-normal pt-4">
                {block.sectionHeading}
              </h2>
            )}

            {block.paragraphs.map((para, pIdx) => (
              <p key={pIdx}>{para}</p>
            ))}

            {block.pullQuote && (
              <blockquote className="my-8 p-6 sm:p-8 bg-surface border-l-2 border-accent space-y-2">
                <p className="font-serif text-lg sm:text-xl text-ink italic leading-snug">
                  &ldquo;{block.pullQuote}&rdquo;
                </p>
                {block.quoteAttribution && (
                  <footer className="text-xs font-mono uppercase tracking-wider text-ink-muted not-italic">
                    &mdash; {block.quoteAttribution}
                  </footer>
                )}
              </blockquote>
            )}

            {block.image && (
              <figure className="space-y-2 my-8">
                <div className="relative aspect-[16/10] w-full bg-surface-stone border border-border overflow-hidden">
                  <Image
                    src={block.image.url}
                    alt={block.image.caption}
                    fill
                    className="object-cover"
                    sizes="700px"
                  />
                </div>
                <figcaption className="text-[11px] font-mono text-ink-muted text-center">
                  {block.image.caption}
                </figcaption>
              </figure>
            )}
          </div>
        ))}
      </div>

      {/* Shoppable Artifacts Featured in this Monograph */}
      {shoppableObjects.length > 0 && (
        <section className="border-t border-border pt-16 space-y-8">
          <div className="text-center max-w-lg mx-auto space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">
              Tangible Materiality
            </span>
            <h2 className="font-serif text-2xl text-ink font-normal">
              Objects Commissioned In This Study
            </h2>
            <p className="text-xs text-ink-secondary">
              Direct access to examine or acquire the works referenced above.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {shoppableObjects.map((obj) => (
              <ProductCard key={obj.id} product={obj} />
            ))}
          </div>
        </section>
      )}

      {/* Back to index link */}
      <div className="border-t border-border pt-8 flex justify-between items-center text-xs font-mono uppercase tracking-wider">
        <Link
          href="/editorial"
          className="inline-flex items-center gap-2 text-ink-secondary hover:text-ink"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Studio Journal</span>
        </Link>
        <Link href="/shop" className="text-ink hover:text-accent">
          Browse Complete Archive &rarr;
        </Link>
      </div>
    </article>
  );
}
