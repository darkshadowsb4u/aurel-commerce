"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Bookmark, Menu, ChevronDown, User } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { MegaMenu } from "./MegaMenu";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { openCart, openSearch, openMobileNav } = useUI();
  const { itemCount } = useCart();
  const { wishlistIds, isMounted: isWishlistMounted } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMegaOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMegaOpen(false);
    }, 220);
  };

  const navLinks = [
    { label: "Living", href: "/shop?category=living", hasMega: true },
    { label: "Workspace", href: "/shop?category=workspace", hasMega: true },
    { label: "Acoustics", href: "/shop?category=acoustics", hasMega: true },
    { label: "Lighting", href: "/shop?category=lighting", hasMega: true },
    { label: "Archival", href: "/shop?category=archival", hasMega: true },
    { label: "Editorial", href: "/editorial", hasMega: false },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 bg-canvas border-b border-border",
        isScrolled ? "shadow-subtle" : ""
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={openMobileNav}
            aria-label="Open navigation menu"
            className="p-2 -ml-2 text-ink hover:text-accent transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-7"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[12px] tracking-[0.08em] uppercase font-mono transition-colors hover:text-ink relative py-1 flex items-center gap-1.5",
                pathname === link.href ? "text-ink font-medium" : "text-ink-secondary"
              )}
            >
              <span>{link.label}</span>
              {link.hasMega && (
                <ChevronDown className="w-2.5 h-2.5 text-ink-muted opacity-60" />
              )}
            </Link>
          ))}
        </nav>

        {/* Brand Wordmark */}
        <div className="flex-1 lg:flex-initial text-center">
          <Link
            href="/"
            className="inline-block group focus:outline-none"
            aria-label="AUREL Homepage"
          >
            <span className="font-serif tracking-[0.28em] text-xl sm:text-2xl font-normal text-ink group-hover:text-accent transition-colors select-none">
              A U R E L
            </span>
          </Link>
        </div>

        {/* Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button with Cmd+K */}
          <button
            onClick={openSearch}
            aria-label="Search catalog (Press Command K)"
            className="flex items-center gap-2 p-2 text-ink-secondary hover:text-ink transition-colors group"
          >
            <Search className="w-4 h-4" />
            <span className="hidden xl:inline-flex text-[10px] font-mono uppercase text-ink-muted border border-border px-1.5 py-0.5 rounded-none group-hover:border-ink group-hover:text-ink transition-colors">
              ⌘K
            </span>
          </button>

          {/* Account Link */}
          <Link
            href="/account"
            aria-label="Client Account"
            className="p-2 text-ink-secondary hover:text-ink transition-colors hidden sm:inline-flex"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Wishlist Link */}
          <Link
            href="/account/wishlist"
            aria-label={`Wishlist (${isWishlistMounted ? wishlistIds.length : 0} items)`}
            className="relative p-2 text-ink-secondary hover:text-ink transition-colors hidden sm:inline-flex"
          >
            <Bookmark className="w-4 h-4" />
            {isWishlistMounted && wishlistIds.length > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-ink text-canvas-pure text-[9px] font-mono font-medium flex items-center justify-center rounded-full leading-none">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          {/* Day / Night Theme Toggle */}
          <ThemeToggle />

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            aria-label={`Shopping bag with ${isMounted ? itemCount : 0} items`}
            className="relative flex items-center gap-2 p-2 text-ink hover:text-accent transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs tracking-wider font-mono tabular-nums text-ink">
              ({isMounted ? itemCount : 0})
            </span>
            {isMounted && itemCount > 0 && (
              <span className="sm:hidden absolute top-1 right-1 w-3.5 h-3.5 bg-ink text-canvas-pure text-[9px] font-mono font-medium flex items-center justify-center rounded-full leading-none">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Editorial Mega Menu Dropdown */}
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <MegaMenu isOpen={isMegaOpen} onClose={() => setIsMegaOpen(false)} />
      </div>
    </header>
  );
}
