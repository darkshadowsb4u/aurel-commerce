import {
  Product,
  Category,
  Collection,
  EditorialStory,
  CartItem,
} from "./commerce";

export interface ProductFilterOptions {
  category?: string;
  collection?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: "featured" | "newest" | "price-asc" | "price-desc" | "rating";
  limit?: number;
  offset?: number;
}

export interface SearchResults {
  products: Product[];
  categories: Category[];
  stories: EditorialStory[];
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1-5
  title: string;
  content: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { [star: number]: number };
}

export interface CreateReviewInput {
  author: string;
  rating: number;
  title: string;
  content: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  promoCode?: string;
  discountAmount: number;
  subtotal: number;
  shippingEstimate: number;
  total: number;
  itemCount: number;
  updatedAt: string;
}

export interface AddToCartInput {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CustomerAddress {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
}

export interface CustomerProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: CustomerAddress[];
  savedPaymentMethodsSummary?: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productSlug: string;
  name: string;
  price: number;
  quantity: number;
  variantName: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerEmail: string;
  shippingAddress: CustomerAddress;
  billingAddress: CustomerAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
}

export interface CreateOrderInput {
  email: string;
  shippingAddress: Omit<CustomerAddress, "id">;
  billingAddress: Omit<CustomerAddress, "id">;
  items: CartItem[];
  paymentMethod: {
    type: "credit_card" | "apple_pay" | "google_pay";
    last4?: string;
  };
  promoCode?: string;
}

// ---------------------------------------------------------------------------
// Core Service Repository Interfaces
// ---------------------------------------------------------------------------

export interface IProductRepository {
  getProducts(options?: ProductFilterOptions): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getFeaturedProducts(): Promise<Product[]>;
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getCollections(): Promise<Collection[]>;
  getCollectionBySlug(slug: string): Promise<Collection | null>;
  searchCatalog(query: string): Promise<SearchResults>;
}

export interface ICartRepository {
  getCart(cartId: string): Promise<Cart | null>;
  createCart(): Promise<Cart>;
  addItem(cartId: string, input: AddToCartInput): Promise<Cart>;
  updateQuantity(cartId: string, itemId: string, quantity: number): Promise<Cart>;
  removeItem(cartId: string, itemId: string): Promise<Cart>;
  applyPromo(cartId: string, code: string): Promise<Cart>;
  removePromo(cartId: string): Promise<Cart>;
}

export interface IOrderRepository {
  createOrder(input: CreateOrderInput): Promise<Order>;
  getOrderById(idOrNumber: string): Promise<Order | null>;
  getOrdersByEmail(email: string): Promise<Order[]>;
}

export interface IReviewRepository {
  getReviewsByProductId(productId: string): Promise<ProductReview[]>;
  getSummaryByProductId(productId: string): Promise<ReviewSummary>;
  addReview(productId: string, input: CreateReviewInput): Promise<ProductReview>;
}

export interface ICustomerRepository {
  getProfile(customerId: string): Promise<CustomerProfile | null>;
  updateProfile(customerId: string, data: Partial<CustomerProfile>): Promise<CustomerProfile>;
  getAddresses(customerId: string): Promise<CustomerAddress[]>;
  saveAddress(customerId: string, address: CustomerAddress): Promise<CustomerAddress>;
}
