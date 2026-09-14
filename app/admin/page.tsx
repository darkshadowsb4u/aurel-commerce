import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { AlertCircle, CheckCircle2, TrendingUp, Package, Truck, Users, ShieldAlert, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Studio Operations & Fulfillment Console",
  description: "Internal inventory telemetry, consignment logistics, and patron allocation management.",
};

export default function AdminDashboardPage() {
  const lowStockThreshold = 6;
  const lowStockItems = PRODUCTS.filter((p) => p.stockCount <= lowStockThreshold);
  const totalCatalogValue = PRODUCTS.reduce((sum, p) => sum + p.price * p.stockCount, 0);

  const mockRecentOrders = [
    {
      id: "AUR-89241",
      patron: "Julian Vance (New York)",
      items: "Sonus A1 (Obsidian) x1",
      total: 480,
      status: "In Air Transit",
      carrier: "DHL Express",
      time: "4 hours ago",
    },
    {
      id: "AUR-89240",
      patron: "Clara Bergström (Stockholm)",
      items: "Basalt Incense Vessel x2",
      total: 290,
      status: "Studio Inspection",
      carrier: "PostNord Priority",
      time: "6 hours ago",
    },
    {
      id: "AUR-89239",
      patron: "Arthur Pendelton (Tokyo)",
      items: "Edition 01 Clock (04/50)",
      total: 680,
      status: "Customs Clearance",
      carrier: "Yamato Transport",
      time: "11 hours ago",
    },
    {
      id: "AUR-89238",
      patron: "Camille Dupont (Paris)",
      items: "Lumen Linear Luminaire x1",
      total: 360,
      status: "Delivered",
      carrier: "Colissimo White Glove",
      time: "Yesterday",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Admin Header */}
      <div className="border-b border-border pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>Studio Operations Node &bull; Copenhagen HQ</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            Fulfillment & Inventory Telemetry
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/shop"
            className="px-4 py-2 border border-border bg-surface text-ink hover:border-ink transition-colors"
          >
            Public Catalog View
          </Link>
          <span className="px-3 py-2 bg-surface-stone text-ink-muted border border-border">
            Ledger Synchronized
          </span>
        </div>
      </div>

      {/* Operational KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 border border-border bg-surface space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
            30-Day Consignment Volume
          </span>
          <p className="font-mono text-2xl font-medium text-ink">$84,320</p>
          <div className="flex items-center gap-1 text-[11px] font-mono text-accent">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs previous cadence</span>
          </div>
        </div>

        <div className="p-6 border border-border bg-surface space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
            Active International Dispatches
          </span>
          <p className="font-mono text-2xl font-medium text-ink">18 Shipments</p>
          <p className="text-[11px] text-ink-muted font-mono">
            Zero transit exceptions reported
          </p>
        </div>

        <div className="p-6 border border-border bg-surface space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
            Total Inventory Valuation
          </span>
          <p className="font-mono text-2xl font-medium text-ink">
            {formatPrice(totalCatalogValue)}
          </p>
          <p className="text-[11px] text-ink-muted font-mono">
            Across 8 production series
          </p>
        </div>

        <div className="p-6 border border-border bg-surface space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
            Metallurgical Stock Warnings
          </span>
          <p className="font-mono text-2xl font-medium text-accent">
            {lowStockItems.length} Series
          </p>
          <p className="text-[11px] text-accent font-mono">
            Requires billet re-order
          </p>
        </div>
      </div>

      {/* Low Stock Telemetry Table */}
      <div className="border border-border bg-surface p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-accent" />
            <h2 className="font-serif text-xl text-ink font-normal">
              Production Allocation Alerts
            </h2>
          </div>
          <span className="text-xs font-mono text-ink-muted">
            Threshold: &le; {lowStockThreshold} Units Remaining
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-[10px] font-mono uppercase tracking-wider text-ink-muted">
                <th className="pb-3 font-normal">Object Name</th>
                <th className="pb-3 font-normal">Category</th>
                <th className="pb-3 font-normal">Stock Remaining</th>
                <th className="pb-3 font-normal">Unit Value</th>
                <th className="pb-3 font-normal">Production Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {PRODUCTS.map((prod) => {
                const isLow = prod.stockCount <= lowStockThreshold;
                return (
                  <tr key={prod.id} className="hover:bg-canvas-subtle transition-colors">
                    <td className="py-3.5 pr-4 font-medium text-ink">
                      <Link href={`/product/${prod.slug}`} className="hover:text-accent flex items-center gap-1.5">
                        <span>{prod.name}</span>
                        <ArrowUpRight className="w-3 h-3 text-ink-muted" />
                      </Link>
                    </td>
                    <td className="py-3.5 pr-4 text-ink-muted font-mono">{prod.category}</td>
                    <td className="py-3.5 pr-4 font-mono tabular-nums">
                      <span
                        className={`px-2 py-0.5 border ${
                          isLow
                            ? "bg-accent-light text-accent border-accent/30 font-medium"
                            : "bg-surface-stone text-ink border-border"
                        }`}
                      >
                        {prod.stockCount} Units
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-mono tabular-nums">{formatPrice(prod.price)}</td>
                    <td className="py-3.5 text-ink-secondary">
                      {isLow ? "CNC Milling Batch Scheduled" : "Nominal Production Reserve"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Dispatches Feed */}
      <div className="border border-border bg-surface p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="font-serif text-xl text-ink font-normal">
            Recent Consignment Dispatches
          </h2>
          <span className="text-xs font-mono text-ink-muted">Live Courier Feed</span>
        </div>

        <div className="divide-y divide-border/60">
          {mockRecentOrders.map((ord) => (
            <div
              key={ord.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-medium text-ink">{ord.id}</span>
                  <span className="text-ink-muted">&bull;</span>
                  <span className="text-ink font-medium">{ord.patron}</span>
                </div>
                <p className="text-ink-secondary">{ord.items}</p>
                <p className="text-[11px] font-mono text-ink-muted">
                  Dispatched via {ord.carrier} &bull; {ord.time}
                </p>
              </div>

              <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2">
                <span className="font-mono font-medium text-ink tabular-nums">
                  {formatPrice(ord.total)}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-accent bg-accent-light px-2 py-0.5 border border-accent/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{ord.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
