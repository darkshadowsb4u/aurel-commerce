"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, Minus, Plus, ArrowRight } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function QuickAddModal() {
  const { activeOverlay, quickAddProduct, closeQuickAdd, openCart } = useUI();
  const { addItem } = useCart();

  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const isOpen = activeOverlay === "quick_add" && !!quickAddProduct;
  if (!isOpen || !quickAddProduct) return null;

  const currentVariant =
    quickAddProduct.variants.find((v) => v.id === selectedVariantId) ||
    quickAddProduct.variants[0];

  const handleAddToCart = () => {
    addItem({
      productId: quickAddProduct.id,
      productSlug: quickAddProduct.slug,
      name: quickAddProduct.name,
      price: currentVariant.price,
      compareAtPrice: quickAddProduct.compareAtPrice,
      image: quickAddProduct.images[0].url,
      variantId: currentVariant.id,
      variantName: currentVariant.name,
      colorName: currentVariant.colorName,
      colorHex: currentVariant.colorHex,
      quantity,
      maxStock: currentVariant.stockCount,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeQuickAdd();
      openCart();
    }, 450);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick acquisition: ${quickAddProduct.name}`}
      className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center"
    >
      <div
        onClick={closeQuickAdd}
        className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="relative w-full max-w-lg bg-canvas border border-border shadow-elevated p-6 sm:p-8 overflow-hidden">
        <button
          onClick={closeQuickAdd}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-1 text-ink-muted hover:text-ink transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex gap-6">
          {/* Thumbnail */}
          <div className="relative w-28 h-36 bg-surface-stone border border-border flex-shrink-0 overflow-hidden">
            <Image
              src={quickAddProduct.images[0].url}
              alt={quickAddProduct.name}
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-mono tracking-widest uppercase text-ink-muted">
              {quickAddProduct.category}
            </p>
            <h3 className="font-serif text-lg text-ink font-normal leading-snug mt-0.5">
              {quickAddProduct.name}
            </h3>
            <p className="text-sm font-mono tabular-nums text-ink font-medium mt-1">
              {formatPrice(currentVariant.price)}
            </p>

            {/* Variant Swatches */}
            {quickAddProduct.variants.length > 1 && (
              <div className="mt-4">
                <span className="text-[11px] text-ink-secondary block mb-1.5">
                  Finish: <strong className="text-ink">{currentVariant.name}</strong>
                </span>
                <div className="flex items-center gap-2">
                  {quickAddProduct.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      title={variant.name}
                      aria-label={`Select ${variant.name}`}
                      className={`w-5 h-5 rounded-full border transition-all ${
                        (selectedVariantId || quickAddProduct.variants[0].id) === variant.id
                          ? "ring-2 ring-accent ring-offset-2 scale-110"
                          : "border-border opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: variant.colorHex || "#333" }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center gap-3">
          {/* Stepper */}
          <div className="flex items-center border border-border bg-surface w-full sm:w-auto justify-between">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="px-3 py-2.5 text-ink-muted hover:text-ink"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-4 text-xs font-mono tabular-nums">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(currentVariant.stockCount, q + 1))}
              aria-label="Increase quantity"
              disabled={quantity >= currentVariant.stockCount}
              className="px-3 py-2.5 text-ink-muted hover:text-ink disabled:opacity-30"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Bag CTA */}
          <button
            onClick={handleAddToCart}
            disabled={!currentVariant.inStock}
            className={`flex-1 w-full py-3 px-6 text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2 transition-colors ${
              added
                ? "bg-accent text-canvas"
                : currentVariant.inStock
                ? "bg-ink text-canvas hover:bg-ink-secondary"
                : "bg-surface-stone text-ink-muted cursor-not-allowed"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Object Added to Bag</span>
              </>
            ) : currentVariant.inStock ? (
              <span>Acquire &bull; {formatPrice(currentVariant.price * quantity)}</span>
            ) : (
              <span>Archival Exhausted</span>
            )}
          </button>
        </div>

        {/* View full PDP link */}
        <div className="mt-4 text-center">
          <Link
            href={`/product/${quickAddProduct.slug}`}
            onClick={closeQuickAdd}
            className="text-[11px] text-ink-muted hover:text-ink inline-flex items-center gap-1 border-b border-border/80 pb-0.5"
          >
            <span>View Full Materiality & Specifications</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
