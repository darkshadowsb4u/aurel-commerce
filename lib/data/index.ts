import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { EDITORIAL_STORIES } from "@/data/stories";
import { Product, Category, EditorialStory } from "@/types/commerce";

export async function getProducts(options?: {
  category?: string;
  collection?: string;
  sortBy?: string;
  limit?: number;
}): Promise<Product[]> {
  let list = [...PRODUCTS];

  if (options?.category) {
    list = list.filter(
      (p) => p.categorySlug.toLowerCase() === options.category?.toLowerCase()
    );
  }

  if (options?.collection) {
    list = list.filter(
      (p) => p.collectionSlug?.toLowerCase() === options.collection?.toLowerCase()
    );
  }

  if (options?.sortBy) {
    switch (options.sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Default editorial curation order
        break;
    }
  }

  if (options?.limit) {
    list = list.slice(0, options.limit);
  }

  return list;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const found = PRODUCTS.find((p) => p.slug === slug);
  return found || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return PRODUCTS.slice(0, 4);
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const found = CATEGORIES.find((c) => c.slug === slug);
  return found || null;
}

export async function getEditorialStories(): Promise<EditorialStory[]> {
  return EDITORIAL_STORIES;
}

export async function getEditorialStoryBySlug(slug: string): Promise<EditorialStory | null> {
  const found = EDITORIAL_STORIES.find((s) => s.slug === slug);
  return found || null;
}

export async function searchCatalog(query: string): Promise<{
  products: Product[];
  categories: Category[];
  stories: EditorialStory[];
}> {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { products: [], categories: [], stories: [] };
  }

  const matchedProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.materials.some((m) => m.toLowerCase().includes(q)) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );

  const matchedCategories = CATEGORIES.filter(
    (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
  );

  const matchedStories = EDITORIAL_STORIES.filter(
    (s) => s.title.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q)
  );

  return {
    products: matchedProducts,
    categories: matchedCategories,
    stories: matchedStories,
  };
}
