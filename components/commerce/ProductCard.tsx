"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Plus, Sparkles } from "lucide-react";
import { Product } from "@/types/commerce";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist, isMounted } = useWishlist();
  const { openQuickAdd } = useUI();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const isSaved = isMounted && isInWishlist(product.id);

  const primaryImage = product.images[0]?.url || "";
  const contextualImage = product.images[1]?.url || primaryImage;

  return (
    <article
      className="group relative flex flex-col bg-surface border border-border hover:border-border-strong transition-all duration-300 shadow-subtle hover:shadow-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Pedestal Canvas */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-canvas-subtle">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isLimitedEdition && (
            <span className="bg-ink text-canvas-pure border border-ink/40 text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-accent" />
              <span>Edition {product.editionNumber ? `${product.editionNumber}/${product.editionTotal}` : "Limited"}</span>
            </span>
          )}
          {product.isNew && !product.isLimitedEdition && (
            <span className="bg-surface text-ink border border-border text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 shadow-subtle">
              New
            </span>
          )}
          {!product.inStock && (
            <span className="bg-canvas-stone text-ink-muted border border-border text-[9px] font-mono tracking-widest uppercase px-2 py-0.5">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute top-3 right-3 z-10 p-2 bg-surface/90 backdrop-blur-xs text-ink-secondary hover:text-ink border border-border transition-all shadow-subtle"
        >
          <Bookmark
            className={`w-3.5 h-3.5 transition-colors ${
              isSaved ? "fill-ink text-ink" : "text-ink-muted hover:text-ink"
            }`}
          />
        </button>

        {/* Image Link */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-opacity duration-700 ease-editorial ${
              isHovered && contextualImage !== primaryImage ? "opacity-0" : "opacity-100"
            }`}
          />

          {contextualImage !== primaryImage && (
            <Image
              src={contextualImage}
              alt={`${product.name} contextual lifestyle view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover transition-opacity duration-700 ease-editorial absolute inset-0 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </Link>

        {/* Quick Add Slide-Up Trigger */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <button
            onClick={() => openQuickAdd(product)}
            className="w-full bg-ink text-ink-inverse hover:opacity-90 text-[10px] font-mono uppercase tracking-widest py-2.5 px-3 border border-ink flex items-center justify-center gap-1.5 transition-all shadow-subtle font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Metadata & Pricing Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-surface">
        <div>
          <div className="flex items-center justify-between text-[10px] text-ink-muted font-mono uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            {product.has3DViewer && (
              <span className="text-[9px] border border-border px-1 py-0.2 text-ink-secondary font-mono">
                3D View
              </span>
            )}
          </div>

          <h3 className="font-serif text-sm text-ink font-normal leading-snug group-hover:text-accent transition-colors">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          <p className="text-[11px] text-ink-muted line-clamp-1 mt-0.5 font-sans">
            {product.subtitle}
          </p>
        </div>

        {/* Swatches & Price Row */}
        <div className="pt-2 border-t border-border flex items-center justify-between">
          {/* Finish Swatches */}
          <div className="flex items-center gap-1.5">
            {product.variants.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantIndex(idx)}
                aria-label={`Select finish: ${v.name}`}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedVariantIndex === idx
                    ? "ring-1 ring-ink ring-offset-2 ring-offset-surface scale-110"
                    : "border-border hover:border-ink"
                }`}
                style={{ backgroundColor: v.colorHex || "#444" }}
                title={v.name}
              />
            ))}
          </div>

          {/* Price */}
          <div className="text-xs font-mono tabular-nums text-right">
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="line-through text-ink-muted mr-1.5 text-[11px]">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-ink font-medium">
              {formatPrice(activeVariant.price)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
