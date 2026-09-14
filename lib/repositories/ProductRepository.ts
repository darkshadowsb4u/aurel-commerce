import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { EDITORIAL_STORIES } from "@/data/stories";
import { Product, Category, Collection } from "@/types/commerce";
import {
  IProductRepository,
  ProductFilterOptions,
  SearchResults,
} from "@/types/repositories";

export class MockProductRepository implements IProductRepository {
  async getProducts(options?: ProductFilterOptions): Promise<Product[]> {
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

    if (options?.material) {
      const mat = options.material.toLowerCase();
      list = list.filter((p) =>
        p.materials.some((m) => m.toLowerCase().includes(mat))
      );
    }

    if (options?.minPrice !== undefined) {
      list = list.filter((p) => p.price >= (options.minPrice ?? 0));
    }

    if (options?.maxPrice !== undefined) {
      list = list.filter((p) => p.price <= (options.maxPrice ?? Infinity));
    }

    if (options?.inStockOnly) {
      list = list.filter((p) => p.inStock);
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
        case "featured":
        default:
          break;
      }
    }

    if (options?.offset) {
      list = list.slice(options.offset);
    }

    if (options?.limit) {
      list = list.slice(0, options.limit);
    }

    return list;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const product = PRODUCTS.find((p) => p.slug === slug);
    return product || null;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return PRODUCTS.slice(0, 4);
  }

  async getCategories(): Promise<Category[]> {
    return CATEGORIES;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const category = CATEGORIES.find((c) => c.slug === slug);
    return category || null;
  }

  async getCollections(): Promise<Collection[]> {
    return [
      {
        id: "col-permanent",
        slug: "permanent",
        title: "The Permanent Collection",
        tagline: "Essential forms engineered for generational continuity.",
        description: "Objects distilled to their functional essence, manufactured without synthetic veneers.",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "col-archival",
        slug: "archival",
        title: "Archival Commissions",
        tagline: "Numbered editions in hand-hewn basalt and sand-cast bronze.",
        description: "Limited atelier issues numbered and accompanied by signed physical certificates of authenticity.",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
      },
    ];
  }

  async getCollectionBySlug(slug: string): Promise<Collection | null> {
    const collections = await this.getCollections();
    return collections.find((c) => c.slug === slug) || null;
  }

  async searchCatalog(query: string): Promise<SearchResults> {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { products: [], categories: [], stories: [] };
    }

    const products = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );

    const categories = CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );

    const stories = EDITORIAL_STORIES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.excerpt.toLowerCase().includes(q) ||
        s.author.name.toLowerCase().includes(q)
    );

    return { products, categories, stories };
  }
}

export const productRepository = new MockProductRepository();
