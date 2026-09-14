"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, Check } from "lucide-react";
import { Product, Category } from "@/types/commerce";
import { ProductGrid } from "./ProductGrid";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { formatPrice } from "@/lib/utils";

interface ShopCatalogClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export function ShopCatalogClient({ initialProducts, categories }: ShopCatalogClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategoryParam = searchParams.get("category") || "all";
  const initialSort = searchParams.get("sortBy") || "featured";

  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryParam);
  const [activeSort, setActiveSort] = useState<string>(initialSort);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const allMaterials = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => p.materials.forEach((m) => set.add(m)));
    return Array.from(set).sort();
  }, [initialProducts]);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.replace(`/shop?${params.toString()}`, { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (activeCategory !== "all" && product.categorySlug !== activeCategory) {
        return false;
      }
      if (inStockOnly && !product.inStock) {
        return false;
      }
      if (selectedMaterial !== "all" && !product.materials.includes(selectedMaterial)) {
        return false;
      }
      if (product.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (activeSort === "price-asc") return a.price - b.price;
      if (activeSort === "price-desc") return b.price - a.price;
      if (activeSort === "rating") return b.rating - a.rating;
      if (activeSort === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [initialProducts, activeCategory, inStockOnly, selectedMaterial, maxPrice, activeSort]);

  const activeCategoryMeta = categories.find((c) => c.slug === activeCategory);

  const resetFilters = () => {
    setActiveCategory("all");
    setInStockOnly(false);
    setSelectedMaterial("all");
    setMaxPrice(1000);
    setActiveSort("featured");
    router.replace("/shop", { scroll: false });
  };

  const hasActiveFilters =
    activeCategory !== "all" || inStockOnly || selectedMaterial !== "all" || maxPrice < 1000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-ink">
      <Breadcrumbs
        items={[
          { label: "Catalog", href: "/shop" },
          ...(activeCategoryMeta ? [{ label: activeCategoryMeta.name }] : []),
        ]}
      />

      {/* Editorial Category Header */}
      <div className="border-b border-border pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">
              Permanent & Archival Works
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal tracking-tight">
              {activeCategoryMeta ? activeCategoryMeta.name : "Complete Studio Catalog"}
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
              {activeCategoryMeta
                ? activeCategoryMeta.description
                : "An archive of acoustic instruments, domestic vessels, machined tools, and architectural luminaires calibrated for permanence."}
            </p>
          </div>

          <div className="text-xs font-mono uppercase tracking-widest text-ink-muted">
            Displaying <strong className="text-ink font-medium">{filteredProducts.length}</strong> of{" "}
            {initialProducts.length} Works
          </div>
        </div>

        {/* Taxonomy Quick Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 mt-6 border-t border-border">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 whitespace-nowrap transition-colors border shadow-subtle ${
              activeCategory === "all"
                ? "bg-ink text-ink-inverse border-ink font-medium"
                : "bg-surface text-ink-secondary border-border hover:border-ink hover:text-ink"
            }`}
          >
            All Works ({initialProducts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 whitespace-nowrap transition-colors border shadow-subtle ${
                activeCategory === cat.slug
                  ? "bg-ink text-ink-inverse border-ink font-medium"
                  : "bg-surface text-ink-secondary border-border hover:border-ink hover:text-ink"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-border text-xs">
        <button
          onClick={() => setIsFilterOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-1.5 border border-border bg-surface text-ink hover:border-ink transition-colors font-mono uppercase tracking-wider text-[11px] shadow-subtle"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-ink-muted" />
          <span>Filter Parameters</span>
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-accent ml-1" />
          )}
        </button>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted hidden sm:inline">
            Calibration:
          </span>
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="bg-surface border border-border px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none cursor-pointer font-mono shadow-subtle"
          >
            <option value="featured">Curated Studio Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Patron Evaluation</option>
            <option value="newest">Inaugural Releases</option>
          </select>
        </div>
      </div>

      {/* Expandable Filter Panel */}
      {isFilterOpen && (
        <div className="bg-surface border border-border p-6 space-y-6 transition-all shadow-card animate-fadeIn">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-ink font-medium">
              Filter Parameters
            </h3>
            <div className="flex items-center gap-4">
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[10px] font-mono uppercase tracking-wider text-accent hover:underline"
                >
                  Clear All Constraints
                </button>
              )}
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs">
            {/* Stock Availability */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
                Availability
              </span>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded-none accent-ink cursor-pointer"
                />
                <span className="text-ink">Immediate Dispatch Only (In Stock)</span>
              </label>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="uppercase tracking-widest text-ink-muted">Maximum Value</span>
                <span className="text-ink font-medium">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={100}
                max={1000}
                step={25}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-ink cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-ink-muted font-mono">
                <span>$100</span>
                <span>$1,000</span>
              </div>
            </div>

            {/* Materiality */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
                Materiality & Metallurgy
              </span>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full bg-surface border border-border px-3 py-2 text-xs text-ink focus:outline-none focus:border-ink rounded-none cursor-pointer font-mono"
              >
                <option value="all">All Materials</option>
                {allMaterials.map((mat) => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Catalog Grid */}
      <ProductGrid
        products={filteredProducts}
        emptyMessage="No objects match your selected parameters."
      />
    </div>
  );
}
