import React from "react";
import { Product } from "@/types/commerce";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "No objects match your active filter criteria.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center border border-dashed border-border bg-surface-stone/30 p-8">
        <p className="font-serif text-lg text-ink mb-2">No Artifacts Located</p>
        <p className="text-xs text-ink-secondary max-w-sm mx-auto">
          {emptyMessage} Adjust category filters or clear constraints to inspect our broader archive.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 4} />
      ))}
    </div>
  );
}
