"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlistIds, removeFromWishlist, isMounted } = useWishlist();
  const { addItem, openCart } = useCart();

  const savedProducts = isMounted
    ? PRODUCTS.filter((p) => wishlistIds.includes(p.id))
    : [];

  const handleMoveToBag = (product: (typeof PRODUCTS)[0]) => {
    const variant = product.variants[0];
    addItem({
      productId: product.id,
      productSlug: product.slug,
      name: product.name,
      price: variant.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images[0].url,
      variantId: variant.id,
      variantName: variant.name,
      colorName: variant.colorName,
      colorHex: variant.colorHex,
      quantity: 1,
      maxStock: variant.stockCount,
    });
    removeFromWishlist(product.id);
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs
        items={[
          { label: "Patron Profile", href: "/account" },
          { label: "Archival Wishlist" },
        ]}
      />

      <div className="border-b border-border pb-6 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted block mb-1">
            Curated Intent
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            Archival Wishlist
          </h1>
        </div>
        <span className="text-xs font-mono text-ink-muted">
          ({savedProducts.length} Saved {savedProducts.length === 1 ? "Object" : "Objects"})
        </span>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-border p-8 max-w-lg mx-auto space-y-4">
          <p className="font-serif text-xl text-ink">No Saved Artifacts</p>
          <p className="text-xs text-ink-secondary leading-relaxed">
            Bookmark objects as you explore the catalog to curate your private acquisition registry.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-ink text-canvas text-xs uppercase tracking-widest font-mono py-3.5 px-6 hover:bg-ink-secondary transition-colors"
            >
              <span>Explore Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-surface border border-border flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/5] w-full bg-surface-stone overflow-hidden border-b border-border">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="absolute top-3 right-3 p-2 bg-canvas/90 backdrop-blur-xs text-ink-muted hover:text-ink border border-border transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-base text-ink font-normal leading-snug">
                    <Link href={`/product/${product.slug}`} className="hover:text-accent">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-xs font-mono tabular-nums text-ink font-medium pt-1">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => handleMoveToBag(product)}
                  className="w-full py-2.5 bg-ink text-canvas hover:bg-ink-secondary text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Transfer to Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
