import {
  IOrderRepository,
  Order,
  CreateOrderInput,
  OrderItem,
} from "@/types/repositories";

// In-memory persistent order store for server session
const ORDERS_DB: Order[] = [
  {
    id: "ord-89241",
    orderNumber: "AUR-89241",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    customerEmail: "elena.rostova@atelier.de",
    shippingAddress: {
      id: "addr-01",
      firstName: "Elena",
      lastName: "Rostova",
      address1: "Auguststraße 42",
      city: "Berlin",
      state: "BE",
      postalCode: "10117",
      country: "DE",
    },
    billingAddress: {
      id: "addr-01",
      firstName: "Elena",
      lastName: "Rostova",
      address1: "Auguststraße 42",
      city: "Berlin",
      state: "BE",
      postalCode: "10117",
      country: "DE",
    },
    items: [
      {
        id: "item-01",
        productId: "prod-sonus-a1",
        productSlug: "sonus-a1-wireless-speaker",
        name: "Sonus A1 Precision Speaker",
        price: 480,
        quantity: 1,
        variantName: "Matte Obsidian",
        image:
          "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    subtotal: 480,
    discount: 0,
    shippingCost: 0,
    tax: 91.2,
    total: 571.2,
    status: "shipped",
    trackingNumber: "DHL-EX-9921840",
    carrier: "DHL Express Atelier Courier",
    estimatedDelivery: "September 18, 2026",
  },
];

export class MockOrderRepository implements IOrderRepository {
  async createOrder(input: CreateOrderInput): Promise<Order> {
    const subtotal = input.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const discount = input.promoCode === "AUREL10" ? subtotal * 0.1 : 0;
    const shippingCost = subtotal >= 250 ? 0 : 25;
    const tax = Math.round((subtotal - discount) * 0.19 * 100) / 100;
    const total = subtotal - discount + shippingCost + tax;

    const orderNumber = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customerEmail: input.email,
      shippingAddress: {
        ...input.shippingAddress,
        id: `addr-${Date.now()}-ship`,
      },
      billingAddress: {
        ...input.billingAddress,
        id: `addr-${Date.now()}-bill`,
      },
      items: input.items.map((item) => ({
        id: `item-${Date.now()}-${item.id}`,
        productId: item.productId,
        productSlug: item.productSlug,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        variantName: item.variantName,
        image: item.image,
      })),
      subtotal,
      discount,
      shippingCost,
      tax,
      total,
      status: "confirmed",
      estimatedDelivery: "3-5 Business Days",
    };

    ORDERS_DB.unshift(newOrder);
    return newOrder;
  }

  async getOrderById(idOrNumber: string): Promise<Order | null> {
    const match = ORDERS_DB.find(
      (o) =>
        o.id === idOrNumber ||
        o.orderNumber.toLowerCase() === idOrNumber.toLowerCase()
    );
    return match || null;
  }

  async getOrdersByEmail(email: string): Promise<Order[]> {
    return ORDERS_DB.filter(
      (o) => o.customerEmail.toLowerCase() === email.toLowerCase()
    );
  }
}

export const orderRepository = new MockOrderRepository();
