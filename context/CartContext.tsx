"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/types/commerce";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discountCode: string | null;
  discountAmount: number;
  shippingEstimate: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 250;
const STANDARD_SHIPPING_RATE = 20;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCart = localStorage.getItem("aurel_cart_v1");
      const savedCode = localStorage.getItem("aurel_discount_v1");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      if (savedCode) {
        setDiscountCode(savedCode);
      }
    } catch (e) {
      console.warn("Failed to load cart from localStorage", e);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("aurel_cart_v1", JSON.stringify(items));
      if (discountCode) {
        localStorage.setItem("aurel_discount_v1", discountCode);
      } else {
        localStorage.removeItem("aurel_discount_v1");
      }
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [items, discountCode, isMounted]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Discount logic
  let discountAmount = 0;
  if (discountCode === "AUREL10") {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (discountCode === "ARCHIVAL25") {
    discountAmount = 25;
  }

  const shippingEstimate = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : STANDARD_SHIPPING_RATE;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const total = Math.max(0, subtotal - discountAmount + shippingEstimate);

  const addItem = (newItem: Omit<CartItem, "id">) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.variantId === newItem.variantId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const newQty = Math.min(existing.maxStock, existing.quantity + newItem.quantity);
        updated[existingIndex] = { ...existing, quantity: newQty };
        return updated;
      }
      const uniqueId = `${newItem.productId}-${newItem.variantId}-${Date.now()}`;
      return [...prev, { ...newItem, id: uniqueId }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.variantId === variantId ? { ...i, quantity: Math.min(i.maxStock, quantity) } : i))
    );
  };

  const applyDiscount = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === "AUREL10") {
      setDiscountCode("AUREL10");
      return { success: true, message: "10% privilege discount applied." };
    }
    if (formatted === "ARCHIVAL25") {
      setDiscountCode("ARCHIVAL25");
      return { success: true, message: "$25 archival collector credit applied." };
    }
    return { success: false, message: "Invalid or expired promotional code." };
  };

  const removeDiscount = () => {
    setDiscountCode(null);
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discountCode,
        discountAmount,
        shippingEstimate,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
        total,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
        addItem,
        removeItem,
        updateQuantity,
        applyDiscount,
        removeDiscount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
