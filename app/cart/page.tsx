"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck, Tag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export default function CartPage() {
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

  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [giftNote, setGiftNote] = useState("");
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const res = applyDiscount(promoCodeInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoCodeInput("");
    }
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Breadcrumbs items={[{ label: "Shopping Bag" }]} />

      <div className="border-b border-border pb-6 flex items-baseline justify-between">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
          Shopping Bag
        </h1>
        <span className="text-xs font-mono text-ink-muted">
          ({itemCount} {itemCount === 1 ? "Object" : "Objects"})
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-border p-8 max-w-xl mx-auto space-y-4">
          <p className="font-serif text-xl text-ink">Your bag is currently vacant.</p>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Every AUREL object is crafted in limited batches to ensure strict metallurgical and acoustic tolerances.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-ink text-canvas text-xs uppercase tracking-widest font-mono py-3.5 px-6 hover:bg-ink-secondary transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Items Table (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free shipping banner */}
            <div className="p-4 bg-canvas-subtle border border-border space-y-2">
              <div className="flex justify-between text-xs text-ink">
                <span>
                  {subtotal >= freeShippingThreshold ? (
                    <strong className="text-ink font-medium">
                      Complimentary White-Glove Courier Delivery Unlocked
                    </strong>
                  ) : (
                    <span>
                      Add <strong className="text-ink">{formatPrice(remainingForFreeShipping)}</strong> for complimentary courier
                    </span>
                  )}
                </span>
                <span className="font-mono text-ink-muted">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-500 ease-editorial"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Item Rows */}
            <div className="divide-y divide-border border-y border-border">
              {items.map((item) => (
                <div key={item.variantId} className="py-6 flex gap-6 items-start">
                  <div className="relative w-24 h-32 bg-surface-stone border border-border flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <Link
                        href={`/product/${item.productSlug}`}
                        className="font-serif text-base text-ink hover:text-accent transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-ink-muted">
                        Finish: {item.colorName || item.variantName}
                      </p>
                      <p className="text-xs font-mono tabular-nums text-ink pt-1">
                        {formatPrice(item.price)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Stepper */}
                      <div className="flex items-center border border-border bg-surface">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-2 text-ink-muted hover:text-ink"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-mono tabular-nums text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          disabled={item.quantity >= item.maxStock}
                          className="p-2 text-ink-muted hover:text-ink disabled:opacity-30"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total */}
                      <span className="font-mono text-sm tabular-nums text-ink font-medium min-w-[70px] text-right">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.variantId)}
                        aria-label="Remove item"
                        className="text-ink-muted hover:text-ink transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift note toggle */}
            <div className="border border-border p-4 bg-surface space-y-3">
              <button
                onClick={() => setIsGiftOpen((prev) => !prev)}
                className="text-xs font-mono uppercase tracking-wider text-ink flex items-center justify-between w-full"
              >
                <span>Add Handwritten Studio Inscription or Gift Packaging</span>
                <span className="text-ink-muted">{isGiftOpen ? "−" : "+"}</span>
              </button>
              {isGiftOpen && (
                <div className="pt-2">
                  <textarea
                    rows={3}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Enter your personal inscription to be printed on handmade letterpress cardstock..."
                    className="w-full bg-canvas border border-border p-3 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                  />
                  <p className="text-[10px] text-ink-muted mt-1">
                    Complimentary for all acquisitions. Included inside the unbleached box.
                  </p>
                </div>
              )}
            </div>

            <div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-secondary hover:text-ink"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Browsing Archive</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-surface border border-border p-6 sm:p-8 space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-ink font-medium border-b border-border pb-3">
              Dispatch Summary
            </h2>

            {/* Promo code */}
            <div>
              {discountCode ? (
                <div className="flex items-center justify-between p-2.5 bg-canvas border border-accent/40 text-xs">
                  <div className="flex items-center gap-1.5 text-accent font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{discountCode} (-{formatPrice(discountAmount)})</span>
                  </div>
                  <button
                    onClick={removeDiscount}
                    className="text-[11px] text-ink-muted hover:text-ink underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Promo Code"
                    className="flex-1 bg-canvas border border-border px-3 py-2 text-xs text-ink placeholder:text-ink-subtle uppercase focus:outline-none focus:border-ink rounded-none"
                  />
                  <button
                    type="submit"
                    className="bg-surface-stone border border-border text-xs px-3.5 py-2 text-ink hover:bg-canvas font-mono uppercase"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoFeedback && (
                <p
                  className={`text-[10px] mt-1 ${
                    promoFeedback.success ? "text-accent" : "text-red-700"
                  }`}
                >
                  {promoFeedback.message}
                </p>
              )}
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5 text-xs text-ink-secondary border-t border-border pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-ink">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-accent">
                  <span>Privilege Credit</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Courier</span>
                <span className="font-mono tabular-nums text-ink">
                  {shippingEstimate === 0 ? "Complimentary" : formatPrice(shippingEstimate)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium text-ink pt-3 border-t border-border">
                <span>Estimated Total</span>
                <span className="font-mono text-base tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full bg-ink text-canvas py-4 text-xs tracking-widest uppercase font-mono flex items-center justify-center gap-2 hover:bg-ink-secondary transition-colors"
            >
              <span>Proceed to Dispatch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-ink-muted text-center pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-ink-secondary" />
              <span>Direct Bank-Grade 256-Bit SSL Protection</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
