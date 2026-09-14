"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { searchCatalog } from "@/lib/data";
import { Product, Category, EditorialStory } from "@/types/commerce";
import { formatPrice } from "@/lib/utils";

export function SearchModal() {
  const { activeOverlay, closeSearch } = useUI();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    products: Product[];
    categories: Category[];
    stories: EditorialStory[];
  }>({ products: [], categories: [], stories: [] });
  const [isSearching, setIsSearching] = useState(false);

  const isOpen = activeOverlay === "search";

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults({ products: [], categories: [], stories: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], categories: [], stories: [] });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      const data = await searchCatalog(query);
      setResults(data);
      setIsSearching(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const popularTags = ["Titanium", "Basalt", "Lighting", "Acoustics", "Desk Mat", "Limited Edition"];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
      className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 text-ink"
    >
      {/* Backdrop */}
      <div
        onClick={closeSearch}
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-200"
      />

      {/* Modal Container */}
      <div className="relative max-w-2xl mx-auto bg-surface border border-border shadow-elevated overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-border bg-canvas-subtle">
          <Search className="w-5 h-5 text-ink-muted mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search objects, materials, finishes, or stories..."
            className="w-full bg-transparent text-sm sm:text-base text-ink placeholder:text-ink-muted focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-ink-muted hover:text-ink transition-colors mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="text-[10px] font-mono tracking-wider uppercase text-ink-muted hover:text-ink px-2 py-1 border border-border"
          >
            ESC
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {query.trim() === "" ? (
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-ink-muted mb-3">
                Suggested Inquiries
              </p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs font-mono bg-canvas-subtle hover:bg-canvas-stone text-ink px-3 py-1.5 border border-border transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : isSearching ? (
            <div className="py-12 text-center text-xs text-ink-muted font-mono">
              Querying studio telemetry archive...
            </div>
          ) : results.products.length === 0 &&
            results.categories.length === 0 &&
            results.stories.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-serif text-base text-ink mb-1">No objects matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-ink-secondary font-sans">
                Try searching for materials like &ldquo;titanium&rdquo;, &ldquo;basalt&rdquo;, or browse by taxonomy.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Matched Products */}
              {results.products.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-ink-muted mb-3">
                    Objects ({results.products.length})
                  </h3>
                  <div className="divide-y divide-border">
                    {results.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={closeSearch}
                        className="flex items-center justify-between py-3 group hover:bg-canvas-subtle px-2 -mx-2 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-14 bg-canvas-stone border border-border overflow-hidden flex-shrink-0">
                            <Image
                              src={product.images[0].url}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-ink group-hover:text-accent transition-colors">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-ink-muted">{product.subtitle}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono tabular-nums text-ink font-medium">
                            {formatPrice(product.price)}
                          </span>
                          <CornerDownLeft className="w-3.5 h-3.5 text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Categories */}
              {results.categories.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-ink-muted mb-2">
                    Taxonomies
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        onClick={closeSearch}
                        className="p-3 border border-border bg-canvas-subtle hover:bg-canvas-stone transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <p className="text-xs font-medium text-ink group-hover:text-accent">
                            {cat.name}
                          </p>
                          <p className="text-[10px] text-ink-muted line-clamp-1">{cat.description}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-ink-muted flex-shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Stories */}
              {results.stories.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">
                    Studio Monographs
                  </h3>
                  <div className="divide-y divide-border">
                    {results.stories.map((story) => (
                      <Link
                        key={story.id}
                        href={`/editorial/${story.slug}`}
                        onClick={closeSearch}
                        className="block py-2.5 hover:bg-canvas-subtle px-2 -mx-2 transition-colors group"
                      >
                        <p className="text-xs font-medium text-ink group-hover:text-accent">
                          {story.title}
                        </p>
                        <p className="text-[11px] text-ink-muted line-clamp-1">{story.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
