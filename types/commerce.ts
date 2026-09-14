export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  colorName?: string;
  colorHex?: string;
  size?: string;
  finish?: string;
  inStock: boolean;
  stockCount: number;
  price: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isHero?: boolean;
  isContextual?: boolean;
  caption?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  categorySlug: string;
  collection?: string;
  collectionSlug?: string;
  price: number;
  compareAtPrice?: number;
  isNew?: boolean;
  isLimitedEdition?: boolean;
  editionTotal?: number;
  editionNumber?: number;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  description: string;
  editorialBlurb: string;
  images: ProductImage[];
  variants: ProductVariant[];
  materials: string[];
  dimensions: {
    height: string;
    width: string;
    depth: string;
    weight: string;
  };
  specifications: ProductSpecification[];
  careInstructions: string[];
  sustainability: string[];
  shippingInfo: string;
  has3DViewer?: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  featuredProductCount: number;
  subcategories?: string[];
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  heroProductSlug?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  variantId: string;
  variantName: string;
  colorName?: string;
  colorHex?: string;
  quantity: number;
  maxStock: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discountCode?: string;
  discountAmount: number;
  shippingEstimate: number;
  total: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface OrderMilestone {
  status: "placed" | "confirmed" | "processing" | "shipped" | "in_transit" | "delivered";
  label: string;
  date: string;
  completed: boolean;
  current: boolean;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "placed" | "processing" | "shipped" | "delivered";
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  shippingMethod: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
  };
  milestones: OrderMilestone[];
}

export interface EditorialStory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: "Architectural Spotlight" | "Materiality" | "Studio Visit" | "Design Philosophy";
  publishedAt: string;
  readTime: string;
  shoppableProductSlugs: string[];
  content: {
    sectionHeading?: string;
    paragraphs: string[];
    pullQuote?: string;
    quoteAttribution?: string;
    image?: {
      url: string;
      caption: string;
    };
  }[];
}
