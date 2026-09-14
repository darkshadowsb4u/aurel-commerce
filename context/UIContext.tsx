"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/types/commerce";

type OverlayType = "cart" | "search" | "mobile_nav" | "quick_add" | null;

interface UIContextType {
  activeOverlay: OverlayType;
  quickAddProduct: Product | null;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  openQuickAdd: (product: Product) => void;
  closeQuickAdd: () => void;
  closeAllOverlays: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);

  // Synchronize body scroll-locking safely without layout shifting
  useEffect(() => {
    if (activeOverlay) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [activeOverlay]);

  // Global escape key handler to dismiss any active overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeOverlay) {
        setActiveOverlay(null);
        setQuickAddProduct(null);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setActiveOverlay((prev) => (prev === "search" ? null : "search"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeOverlay]);

  const openCart = useCallback(() => setActiveOverlay("cart"), []);
  const closeCart = useCallback(() => setActiveOverlay(null), []);
  const openSearch = useCallback(() => setActiveOverlay("search"), []);
  const closeSearch = useCallback(() => setActiveOverlay(null), []);
  const openMobileNav = useCallback(() => setActiveOverlay("mobile_nav"), []);
  const closeMobileNav = useCallback(() => setActiveOverlay(null), []);
  const openQuickAdd = useCallback((product: Product) => {
    setQuickAddProduct(product);
    setActiveOverlay("quick_add");
  }, []);
  const closeQuickAdd = useCallback(() => {
    setActiveOverlay(null);
    setQuickAddProduct(null);
  }, []);
  const closeAllOverlays = useCallback(() => {
    setActiveOverlay(null);
    setQuickAddProduct(null);
  }, []);

  return (
    <UIContext.Provider
      value={{
        activeOverlay,
        quickAddProduct,
        openCart,
        closeCart,
        openSearch,
        closeSearch,
        openMobileNav,
        closeMobileNav,
        openQuickAdd,
        closeQuickAdd,
        closeAllOverlays,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
