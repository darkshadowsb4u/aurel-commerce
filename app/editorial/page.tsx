import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getEditorialStories } from "@/lib/data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Studio Journal & Monographs",
  description:
    "Investigations into industrial design, acoustic physics, Nordic metallurgy, and geologic rituals.",
};

export default async function EditorialIndexPage() {
  const stories = await getEditorialStories();
  const leadStory = stories[0];
  const secondaryStories = stories.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <Breadcrumbs items={[{ label: "Studio Journal" }]} />

      {/* Editorial Header */}
      <div className="border-b border-border pb-8 max-w-2xl">
        <span className="text-xs font-mono uppercase tracking-widest text-ink-muted block mb-2">
          Studio Archive & Journal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight">
          Monographs on Materiality
        </h1>
        <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mt-2">
          Essays, acoustic research papers, and studio visits exploring the tension between honest raw matter and quiet domestic utility.
        </p>
      </div>

      {/* Lead Story Spread */}
      {leadStory && (
        <article className="border border-border bg-surface overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative aspect-[16/11] lg:aspect-auto bg-surface-stone min-h-[360px]">
              <Image
                src={leadStory.coverImage}
                alt={leadStory.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-accent">
                  <span>{leadStory.category}</span>
                  <span>&bull;</span>
                  <span className="text-ink-muted">{leadStory.readTime}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal leading-tight">
                  <Link href={`/editorial/${leadStory.slug}`} className="hover:text-accent transition-colors">
                    {leadStory.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {leadStory.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-surface-stone border border-border">
                    <Image
                      src={leadStory.author.avatar}
                      alt={leadStory.author.name}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-ink">{leadStory.author.name}</p>
                    <p className="text-[10px] text-ink-muted font-mono">{leadStory.author.role}</p>
                  </div>
                </div>

                <Link
                  href={`/editorial/${leadStory.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink hover:text-accent"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Secondary Stories Grid */}
      {secondaryStories.length > 0 && (
        <div className="space-y-8">
          <h3 className="text-xs font-mono uppercase tracking-widest text-ink-muted border-b border-border pb-3">
            Recent Publications & Field Notes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondaryStories.map((story) => (
              <article
                key={story.id}
                className="border border-border bg-surface flex flex-col justify-between overflow-hidden group hover:border-ink transition-colors"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-surface-stone overflow-hidden">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-ink-muted">
                      <span className="text-accent">{story.category}</span>
                      <span>&bull;</span>
                      <span>{story.readTime}</span>
                    </div>

                    <h4 className="font-serif text-xl text-ink font-normal leading-snug group-hover:text-accent transition-colors">
                      <Link href={`/editorial/${story.slug}`}>{story.title}</Link>
                    </h4>

                    <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                      {story.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-border/40 text-xs text-ink">
                  <span className="text-ink-muted text-[11px] font-mono">{story.author.name}</span>
                  <Link
                    href={`/editorial/${story.slug}`}
                    className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider group-hover:text-accent"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
