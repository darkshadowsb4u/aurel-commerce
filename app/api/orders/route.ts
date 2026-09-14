import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-static";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");
    const orderNumber = searchParams.get("orderNumber");

    if (orderId || orderNumber) {
      const order = await db.order.findFirst({
        where: {
          OR: [
            ...(orderId ? [{ id: orderId }] : []),
            ...(orderNumber ? [{ orderNumber: orderNumber.toUpperCase() }] : []),
          ],
        },
        include: { items: true },
      });

      if (!order) {
        return NextResponse.json({ error: "Order record not found." }, { status: 404 });
      }

      return NextResponse.json({ order }, { status: 200 });
    }

    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const orders = await db.order.findMany({
      where: { userId: session.userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ error: "Failed to fetch order ledger." }, { status: 500 });
  }
}
