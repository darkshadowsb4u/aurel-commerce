"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { activeOverlay, closeCart } = useUI();
  const {
    items,
    itemCount,
    subtotal,
    discountCode,
    discountAmount,
    shippingEstimate,
    freeShippingThreshold,
    freeShippingProgress,
    total,
    removeItem,
    updateQuantity,
    applyDiscount,
    removeDiscount,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const isOpen = activeOverlay === "cart";
  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = applyDiscount(promoInput);
    setPromoFeedback(result);
    if (result.success) {
      setPromoInput("");
    }
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-50 overflow-hidden text-ink"
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-surface border-l border-border shadow-elevated flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-mono tracking-widest uppercase text-ink font-medium">
                Shopping Bag
              </h2>
              <span className="text-xs font-mono text-ink-muted">
                ({itemCount} {itemCount === 1 ? "work" : "works"})
              </span>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close bag"
              className="p-1.5 -mr-1.5 text-ink-secondary hover:text-ink transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-canvas-subtle px-6 py-3.5 border-b border-border">
            <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
              <span className="text-ink-secondary">
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-ink font-medium">
                    Complimentary Courier Delivery Unlocked
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-ink">{formatPrice(remainingForFreeShipping)}</strong> for complimentary courier
                  </span>
                )}
              </span>
              <span className="text-ink font-medium">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1 bg-border rounded-none overflow-hidden">
              <div
                className="h-full bg-ink transition-all duration-500 ease-editorial"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <p className="font-serif text-lg text-ink mb-2">Your bag is currently empty.</p>
                <p className="text-xs text-ink-secondary max-w-xs mb-8 font-sans">
                  Discover our permanent collection of acoustic instruments, desk tools, and domestic vessels.
                </p>
                <button
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 bg-ink text-ink-inverse hover:opacity-90 text-xs uppercase tracking-widest font-mono font-medium px-6 py-3.5 transition-colors shadow-subtle"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-4 pb-6 border-b border-border last:border-0 last:pb-0"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 bg-canvas-stone border border-border flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/product/${item.productSlug}`}
                          onClick={closeCart}
                          className="text-xs font-medium text-ink hover:text-accent transition-colors leading-snug"
                        >
                          {item.name}
                        </Link>
                        <span className="text-xs font-mono tabular-nums text-ink font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-ink-muted mt-0.5">
                        Finish: {item.colorName || item.variantName}
                      </p>
                    </div>

                    {/* Stepper and Delete */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border bg-surface shadow-subtle">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-ink-muted hover:text-ink transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono tabular-nums text-ink font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          disabled={item.quantity >= item.maxStock}
                          className="p-1.5 text-ink-muted hover:text-ink transition-colors disabled:opacity-30"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.variantId)}
                        aria-label="Remove item"
                        className="p-1 text-ink-muted hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border bg-canvas-subtle space-y-4">
              {/* Promo Code Input */}
              <div>
                {discountCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-surface border border-border text-xs shadow-subtle">
                    <div className="flex items-center gap-1.5 text-ink font-medium">
                      <Tag className="w-3.5 h-3.5 text-accent" />
                      <span>Code: {discountCode} (-{formatPrice(discountAmount)})</span>
                    </div>
                    <button
                      onClick={removeDiscount}
                      className="text-[10px] font-mono text-ink-muted hover:text-ink underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. AUREL10)"
                      className="flex-1 bg-surface border border-border px-3 py-2 text-xs text-ink placeholder:text-ink-muted uppercase focus:outline-none focus:border-ink rounded-none font-mono shadow-subtle"
                    />
                    <button
                      type="submit"
                      className="bg-surface border border-border text-xs px-3.5 py-2 text-ink hover:border-ink transition-colors font-mono uppercase shadow-subtle"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoFeedback && (
                  <p
                    className={`text-[10px] mt-1 font-mono ${
                      promoFeedback.success ? "text-accent" : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {promoFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-ink-secondary border-t border-border pt-3 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-ink">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>Privilege Discount</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Courier</span>
                  <span className="tabular-nums text-ink">
                    {shippingEstimate === 0 ? "Complimentary" : formatPrice(shippingEstimate)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border text-sm font-medium text-ink">
                  <span>Total Amount</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-ink text-ink-inverse hover:opacity-90 text-xs uppercase tracking-widest font-mono font-medium py-3.5 px-4 text-center transition-colors flex items-center justify-center gap-2 shadow-subtle"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full bg-surface border border-border text-ink hover:border-ink text-[11px] uppercase tracking-wider font-mono py-2.5 px-4 text-center transition-colors block shadow-subtle"
                >
                  View Full Bag Details
                </Link>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-ink-muted">
                <ShieldCheck className="w-3 h-3 text-accent" />
                <span>Encrypted 256-Bit Checkout Security</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
