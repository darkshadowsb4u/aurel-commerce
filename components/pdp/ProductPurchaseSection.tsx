"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product, ProductVariant } from "@/types/commerce";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { KineticText } from "@/components/common/KineticTypography";
import { Check, Minus, Plus, Bookmark, Truck, ShieldCheck, Clock, ArrowRight, Sparkles } from "lucide-react";

interface ProductPurchaseSectionProps {
  product: Product;
}

export function ProductPurchaseSection({ product }: ProductPurchaseSectionProps) {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleWishlist, isMounted } = useWishlist();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentVariant: ProductVariant =
    product.variants[selectedVariantIndex] || product.variants[0];
  const isSaved = isMounted && isInWishlist(product.id);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToBag = () => {
    setIsAdding(true);
    addItem({
      productId: product.id,
      productSlug: product.slug,
      name: product.name,
      price: currentVariant.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images[0].url,
      variantId: currentVariant.id,
      variantName: currentVariant.name,
      colorName: currentVariant.colorName,
      colorHex: currentVariant.colorHex,
      quantity,
      maxStock: currentVariant.stockCount,
    });

    setTimeout(() => {
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
      openCart();
    }, 300);
  };

  const handleInstantBuyNow = () => {
    addItem({
      productId: product.id,
      productSlug: product.slug,
      name: product.name,
      price: currentVariant.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images[0].url,
      variantId: currentVariant.id,
      variantName: currentVariant.name,
      colorName: currentVariant.colorName,
      colorHex: currentVariant.colorHex,
      quantity,
      maxStock: currentVariant.stockCount,
    });
    router.push("/checkout");
  };

  return (
    <div ref={containerRef} className="space-y-8 text-ink">
      {/* Header Info */}
      <div className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">
            {product.category} &bull; {product.collection || "Permanent Collection"}
          </span>
          {product.isLimitedEdition && (
            <span className="text-[9px] font-mono tracking-widest uppercase bg-ink text-canvas-pure border border-ink/40 px-2 py-0.5 flex items-center gap-1 shadow-subtle">
              <Sparkles className="w-2.5 h-2.5 text-accent" />
              <span>Edition {product.editionNumber}/{product.editionTotal}</span>
            </span>
          )}
        </div>

        <KineticText
          text={product.name}
          as="h1"
          className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink font-normal leading-tight"
        />

        <p className="text-sm text-ink-secondary leading-relaxed font-sans">
          {product.subtitle}
        </p>

        {/* Rating and Price */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-secondary">
            <span className="text-accent">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="text-ink font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-ink-muted">({product.reviewCount} Reviews)</span>
          </div>

          <div className="text-right">
            {product.compareAtPrice && product.compareAtPrice > currentVariant.price && (
              <span className="line-through text-xs font-mono text-ink-muted mr-2">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="font-mono text-xl sm:text-2xl text-ink tabular-nums font-medium">
              {formatPrice(currentVariant.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Finish / Variant Selector */}
      {product.variants.length > 1 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="uppercase tracking-wider text-ink-muted text-[10px]">Selected Finish</span>
            <span className="text-ink font-medium">{currentVariant.name}</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {product.variants.map((variant, idx) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantIndex(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 border text-xs transition-all shadow-subtle ${
                  selectedVariantIndex === idx
                    ? "border-ink bg-surface shadow-card ring-1 ring-ink"
                    : "border-border bg-canvas-subtle hover:border-ink/60"
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-border"
                  style={{ backgroundColor: variant.colorHex || "#333" }}
                />
                <span className="text-ink font-mono text-[11px]">{variant.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & CTA Action Block */}
      <div className="space-y-3 pt-2">
        <div className="flex items-stretch gap-3">
          {/* Stepper */}
          <div className="flex items-center border border-border bg-surface shadow-subtle">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="p-3 text-ink-muted hover:text-ink transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-4 text-xs font-mono tabular-nums text-ink font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(currentVariant.stockCount, q + 1))}
              aria-label="Increase quantity"
              disabled={quantity >= currentVariant.stockCount}
              className="p-3 text-ink-muted hover:text-ink transition-colors disabled:opacity-30"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary Magnetic Add to Bag CTA */}
          <MagneticButton
            onClick={handleAddToBag}
            disabled={!currentVariant.inStock || isAdding}
            className={`flex-1 py-3.5 px-6 text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2 transition-all font-medium shadow-subtle ${
              addedSuccess
                ? "bg-ink text-canvas-pure"
                : currentVariant.inStock
                ? "bg-ink text-ink-inverse hover:opacity-90"
                : "bg-canvas-stone text-ink-muted cursor-not-allowed border border-border"
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Object Added to Bag</span>
              </>
            ) : isAdding ? (
              <span>Registering Acquisition...</span>
            ) : currentVariant.inStock ? (
              <span>Add to Bag &bull; {formatPrice(currentVariant.price * quantity)}</span>
            ) : (
              <span>Sold Out</span>
            )}
          </MagneticButton>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            className="p-3.5 border border-border bg-surface hover:border-ink transition-colors text-ink shadow-subtle"
          >
            <Bookmark
              className={`w-4 h-4 ${isSaved ? "fill-ink text-ink" : "text-ink-muted"}`}
            />
          </button>
        </div>

        {/* Instant Buy Now Button */}
        {currentVariant.inStock && (
          <MagneticButton
            onClick={handleInstantBuyNow}
            className="w-full py-3.5 border border-border bg-canvas-subtle hover:bg-surface text-ink hover:border-ink text-xs uppercase tracking-widest font-mono transition-colors font-medium shadow-subtle"
          >
            Instant Dispatch Checkout
          </MagneticButton>
        )}
      </div>

      {/* Trust & Dispatch Signals */}
      <div className="border-t border-border pt-6 space-y-3 text-xs text-ink-secondary">
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-accent flex-shrink-0" />
          <span>
            {currentVariant.inStock
              ? "In stock at Copenhagen Archive. Dispatches within 24 hours."
              : "Pre-order allocation in production."}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Truck className="w-4 h-4 text-accent flex-shrink-0" />
          <span>Complimentary insured courier on orders over $250.</span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
          <span>Lifetime studio mechanical warranty &bull; 30-day quiet return policy.</span>
        </div>
      </div>

      {/* FLOATING STICKY ACQUISITION BAR */}
      <aside
        aria-label="Quick Acquisition Bar"
        className={`fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-border py-3 px-4 sm:px-8 shadow-elevated transition-all duration-300 ${
          showStickyBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-11 h-11 bg-canvas-stone border border-border overflow-hidden hidden sm:block">
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
            <div>
              <p className="text-xs font-serif font-normal text-ink leading-tight truncate max-w-xs">
                {product.name}
              </p>
              <p className="text-[10px] font-mono text-ink-muted">
                Finish: {currentVariant.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-sm tabular-nums text-ink font-medium">
              {formatPrice(currentVariant.price)}
            </span>
            <MagneticButton
              onClick={handleAddToBag}
              disabled={!currentVariant.inStock}
              className="bg-ink text-ink-inverse hover:opacity-90 py-2.5 px-6 text-xs uppercase tracking-widest font-mono font-medium inline-flex items-center gap-2 transition-all shadow-subtle"
            >
              <span>Add to Bag</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>
        </div>
      </aside>
    </div>
  );
}
