"use client";

import React from "react";
import Link from "next/link";
import { X, ArrowRight, Bookmark, ShoppingBag, Truck, User } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

import { ThemeToggle } from "./ThemeToggle";

export function MobileNav() {
  const { activeOverlay, closeMobileNav, openCart } = useUI();
  const { itemCount } = useCart();
  const { wishlistIds } = useWishlist();

  const isOpen = activeOverlay === "mobile_nav";
  if (!isOpen) return null;

  const categories = [
    { name: "Living & Objects", href: "/shop?category=living" },
    { name: "Workspace & Tools", href: "/shop?category=workspace" },
    { name: "Technology & Acoustics", href: "/shop?category=acoustics" },
    { name: "Architectural Lighting", href: "/shop?category=lighting" },
    { name: "Archival Editions", href: "/shop?category=archival" },
    { name: "Complete Catalog", href: "/shop" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 overflow-hidden lg:hidden"
    >
      <div
        onClick={closeMobileNav}
        className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <aside className="w-screen max-w-xs bg-canvas border-r border-border shadow-elevated flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <span className="font-serif tracking-[0.2em] text-lg text-ink font-normal">
                A U R E L
              </span>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  onClick={closeMobileNav}
                  aria-label="Close menu"
                  className="p-1 text-ink-secondary hover:text-ink transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Links */}
            <nav className="p-6 space-y-5">
              <p className="text-[11px] font-mono tracking-widest uppercase text-ink-muted">
                Collections
              </p>
              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li key={cat.href}>
                    <Link
                      href={cat.href}
                      onClick={closeMobileNav}
                      className="text-base text-ink font-serif hover:text-accent transition-colors flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-ink-muted" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-border/80 space-y-3">
                <p className="text-[11px] font-mono tracking-widest uppercase text-ink-muted">
                  Studio & Journal
                </p>
                <Link
                  href="/editorial"
                  onClick={closeMobileNav}
                  className="block text-sm text-ink-secondary hover:text-ink"
                >
                  Editorial & Monographs
                </Link>
                <Link
                  href="/tracking"
                  onClick={closeMobileNav}
                  className="block text-sm text-ink-secondary hover:text-ink flex items-center gap-2"
                >
                  <Truck className="w-3.5 h-3.5 text-ink-muted" />
                  <span>Track Consignment</span>
                </Link>
                <Link
                  href="/account"
                  onClick={closeMobileNav}
                  className="block text-sm text-ink-secondary hover:text-ink flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-ink-muted" />
                  <span>Client Profile</span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Bottom actions */}
          <div className="p-5 border-t border-border bg-canvas-subtle space-y-3">
            <div className="flex items-center justify-between">
              <Link
                href="/account/wishlist"
                onClick={closeMobileNav}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink"
              >
                <Bookmark className="w-4 h-4 text-ink-muted" />
                <span>Saved ({wishlistIds.length})</span>
              </Link>

              <button
                onClick={() => {
                  closeMobileNav();
                  openCart();
                }}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink"
              >
                <ShoppingBag className="w-4 h-4 text-ink-muted" />
                <span>Bag ({itemCount})</span>
              </button>
            </div>

            <div className="text-[11px] text-ink-muted pt-2 border-t border-border/40 flex justify-between">
              <span>Currency: USD ($)</span>
              <span>Region: Global Courier</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
