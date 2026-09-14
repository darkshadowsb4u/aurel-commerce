import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/data";
import { ShopCatalogClient } from "@/components/commerce/ShopCatalogClient";

export const metadata: Metadata = {
  title: "Catalog & Archive",
  description:
    "Explore our complete inventory of machined aluminum acoustic instruments, volcanic basalt vessels, and architectural lighting.",
};

export default async function ShopPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono tracking-widest text-ink-muted uppercase">
            Loading Studio Archive...
          </p>
        </div>
      }
    >
      <ShopCatalogClient initialProducts={products} categories={categories} />
    </Suspense>
  );
}
