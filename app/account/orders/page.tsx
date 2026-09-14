"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { formatPrice } from "@/lib/utils";
import { Truck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AccountOrdersPage() {
  const [recentOrder, setRecentOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aurel_recent_order");
      if (saved) {
        setRecentOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed reading order", e);
    }
  }, []);

  const orders = [
    ...(recentOrder ? [recentOrder] : []),
    {
      orderNumber: "AUR-78192",
      date: "2026-01-14",
      status: "Delivered",
      total: 680,
      deliverySpeed: "Dedicated White-Glove Courier",
      itemsCount: 1,
      name: "Archival Edition 01: Monolith Clock",
    },
    {
      orderNumber: "AUR-65201",
      date: "2025-11-08",
      status: "Delivered",
      total: 355,
      deliverySpeed: "Standard Insured Dispatch",
      itemsCount: 2,
      name: "Basalt Incense Vessel + Caliber Blotter",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs
        items={[
          { label: "Patron Profile", href: "/account" },
          { label: "Commission History" },
        ]}
      />

      <div className="border-b border-border pb-6 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted block mb-1">
            Historical Records
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            Commission History
          </h1>
        </div>
        <span className="text-xs font-mono text-ink-muted">
          ({orders.length} Consignments)
        </span>
      </div>

      <div className="space-y-6">
        {orders.map((ord, idx) => (
          <div
            key={ord.orderNumber || idx}
            className="border border-border bg-surface p-6 sm:p-8 flex flex-col md:flex-row justify-between gap-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-medium text-ink">
                  {ord.orderNumber}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-accent bg-accent-light px-2 py-0.5 border border-accent/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{ord.status || "In Transit"}</span>
                </span>
              </div>

              <p className="font-serif text-base text-ink">
                {ord.name || ord.items?.[0]?.name || "Permanent Collection Objects"}
              </p>

              <div className="flex items-center gap-6 text-xs text-ink-muted font-mono">
                <span>Authorized: {ord.date?.split("T")[0] || "2026-03-12"}</span>
                <span>Tier: {ord.deliverySpeed}</span>
              </div>
            </div>

            <div className="flex flex-col md:items-end justify-between gap-4">
              <span className="font-mono text-base tabular-nums font-medium text-ink">
                {formatPrice(ord.total)}
              </span>

              <Link
                href={`/tracking/${ord.orderNumber}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink hover:text-accent font-medium"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Track Telemetry</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
