import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

// Credit card Luhn validation helper
function validateCreditCardNumber(cardNumber: string): boolean {
  const cleanNumber = cardNumber.replace(/\D/g, "");
  if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    const body = await request.json();

    const {
      email,
      shippingAddress,
      billingAddress,
      items,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCvc,
      promoCode,
    } = body;

    if (!email || !shippingAddress || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid checkout request payload." },
        { status: 400 }
      );
    }

    // Validate payment instrument if paying by credit card
    if (paymentMethod === "credit_card" || !paymentMethod) {
      if (!cardNumber || !cardExpiry || !cardCvc) {
        return NextResponse.json(
          { error: "Complete payment instrument credentials are required." },
          { status: 400 }
        );
      }

      const cleanCard = cardNumber.replace(/\s/g, "");
      if (!validateCreditCardNumber(cleanCard) && cleanCard !== "4242424242424242") {
        return NextResponse.json(
          { error: "Payment declined: Invalid payment card format." },
          { status: 402 }
        );
      }
    }

    // Calculate totals server-side
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const discount = promoCode === "AUREL10" ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
    const shippingCost = subtotal >= 250 ? 0 : 25;
    const tax = Math.round((subtotal - discount) * 0.19 * 100) / 100;
    const total = Math.round((subtotal - discount + shippingCost + tax) * 100) / 100;

    const orderNumber = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
    const paymentId = `pi_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;

    // Create Order in Database
    const newOrder = await db.order.create({
      data: {
        orderNumber,
        userId: session?.userId || null,
        customerEmail: email.toLowerCase().trim(),
        subtotal,
        discount,
        shippingCost,
        tax,
        total,
        status: "confirmed",
        paymentStatus: "paid",
        paymentMethod: paymentMethod || "credit_card",
        paymentId,
        carrier: "DHL Express Atelier Courier",
        trackingNumber: `DHL-EX-${Math.floor(1000000 + Math.random() * 9000000)}`,
        estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        shippingAddress: JSON.stringify(shippingAddress),
        billingAddress: JSON.stringify(billingAddress || shippingAddress),
        items: {
          create: items.map((item: any) => ({
            productId: item.productId || item.id,
            productSlug: item.productSlug || item.slug || "sonus-a1-wireless-speaker",
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            variantName: item.variantName || item.colorName || "Standard",
            image: item.image,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Payment authorized and consignment confirmed.",
        order: {
          id: newOrder.id,
          orderNumber: newOrder.orderNumber,
          total: newOrder.total,
          status: newOrder.status,
          trackingNumber: newOrder.trackingNumber,
          estimatedDelivery: newOrder.estimatedDelivery,
          paymentId: newOrder.paymentId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Payment authorization error:", error);
    return NextResponse.json(
      { error: "Failed to process payment authorization." },
      { status: 500 }
    );
  }
}
