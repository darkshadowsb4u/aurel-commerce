"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Check, Truck, ArrowRight, ShieldCheck, Download, Printer } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export function ConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "AUR-89241";

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aurel_recent_order");
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not read order from localStorage", e);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header Plaque */}
      <div className="text-center space-y-4 max-w-lg mx-auto">
        <div className="w-12 h-12 bg-surface-stone border border-border flex items-center justify-center mx-auto text-accent">
          <Check className="w-6 h-6" />
        </div>
        <span className="text-xs font-mono uppercase tracking-widest text-ink-muted block">
          Consignment Authorized
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
          Thank you for your patronage.
        </h1>
        <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
          Your acquisition is now assigned to our studio dispatch ledger under reference{" "}
          <strong className="text-ink font-mono">{orderId}</strong>. A signed confirmation notice has been dispatched to your email.
        </p>
      </div>

      {/* Primary Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
          href={`/tracking/${orderId}`}
          className="w-full sm:w-auto bg-ink text-canvas py-3.5 px-8 text-xs font-mono uppercase tracking-widest hover:bg-ink-secondary transition-colors inline-flex items-center justify-center gap-2"
        >
          <Truck className="w-4 h-4 text-accent" />
          <span>Track Consignment Telemetry</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/shop"
          className="w-full sm:w-auto border border-border bg-surface text-ink py-3.5 px-8 text-xs font-mono uppercase tracking-widest hover:bg-canvas transition-colors text-center"
        >
          Return to Studio Catalog
        </Link>
      </div>

      {/* Manifest Plaque */}
      {order && (
        <div className="bg-surface border border-border p-6 sm:p-10 space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">
                Order Reference
              </p>
              <p className="font-mono text-sm text-ink font-medium">{order.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">
                Dispatch Status
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>Studio Preparation</span>
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs border-b border-border pb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block mb-1">
                Destination
              </span>
              <p className="font-medium text-ink">
                {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
              </p>
              <p className="text-ink-secondary">
                {order.shippingAddress?.address1}
                {order.shippingAddress?.address2 ? `, ${order.shippingAddress.address2}` : ""}
              </p>
              <p className="text-ink-secondary">
                {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                {order.shippingAddress?.postalCode}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block mb-1">
                Logistics Tier
              </span>
              <p className="font-medium text-ink">{order.deliverySpeed}</p>
              <p className="text-ink-muted text-[11px] mt-0.5">
                Copenhagen Air Express &bull; Signature Required
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block mb-1">
                Payment Verification
              </span>
              <p className="font-medium text-ink">{order.paymentMethod}</p>
              <p className="text-ink-muted text-[11px] mt-0.5">
                Tokenized Transaction Confirmed
              </p>
            </div>
          </div>

          {/* Ordered items */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
              Manifest Content ({order.items?.length} Items)
            </span>
            <div className="divide-y divide-border/60">
              {order.items?.map((item: any) => (
                <div key={item.variantId} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-16 bg-surface-stone border border-border flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-ink">{item.name}</p>
                      <p className="text-[11px] text-ink-muted">
                        Finish: {item.colorName || item.variantName} &bull; Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-ink font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-border pt-4 flex justify-between items-center text-xs">
            <span className="text-ink-muted font-mono uppercase">Total Authorized Amount</span>
            <span className="font-mono text-base font-medium text-ink">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
