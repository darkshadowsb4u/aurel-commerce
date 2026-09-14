import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts, getCategories, getCategoryBySlug } from "@/lib/data";
import { ShopCatalogClient } from "@/components/commerce/ShopCatalogClient";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} | AUREL`,
    description: category.description,
    openGraph: {
      title: `${category.name} — AUREL`,
      description: category.description,
      images: [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allProducts = await getProducts();
  const categories = await getCategories();

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono tracking-widest text-ink-muted uppercase">
            Loading {category.name}...
          </p>
        </div>
      }
    >
      <ShopCatalogClient initialProducts={allProducts} categories={categories} />
    </Suspense>
  );
}
