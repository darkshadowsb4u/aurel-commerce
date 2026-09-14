"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { User, Package, Bookmark, MapPin, Shield, ArrowRight, Clock, LogOut, KeyRound } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AccountOverviewPage() {
  const { user, isLoading, login, register, logout } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetch("/api/orders")
        .then((res) => res.json())
        .then((data) => {
          if (data.orders) setOrders(data.orders);
        })
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [user]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsSubmitting(true);

    if (mode === "login") {
      const result = await login(email, password);
      if (!result.success) setAuthError(result.error || "Authentication failed.");
    } else {
      const result = await register(name, email, password);
      if (!result.success) setAuthError(result.error || "Registration failed.");
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto py-32 px-4 text-center text-xs font-mono text-ink-muted">
        Authenticating studio session...
      </div>
    );
  }

  // If user is not authenticated, render Login / Registration Form
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
        <Breadcrumbs items={[{ label: "Client Authentication" }]} />

        <div className="max-w-md mx-auto border border-border bg-surface p-8 sm:p-10 shadow-card space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-surface-stone border border-border flex items-center justify-center mx-auto text-accent mb-2">
              <KeyRound className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
              Confidential Studio Portal
            </span>
            <h1 className="font-serif text-2xl text-ink font-normal">
              {mode === "login" ? "Patron Sign In" : "Register Patron Account"}
            </h1>
            <p className="text-xs text-ink-secondary">
              {mode === "login"
                ? "Access saved consignments, address ledgers, and priority allocations."
                : "Establish your profile for white-glove logistics and inaugural releases."}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authError && (
              <div className="p-3 bg-rose-950/20 border border-rose-800/40 text-xs text-rose-600 dark:text-rose-400 font-mono">
                {authError}
              </div>
            )}

            {mode === "register" && (
              <div className="space-y-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-ink-muted">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Julian Vance"
                  className="w-full bg-canvas-subtle border border-border px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-muted focus:outline-none focus:border-ink font-sans"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-ink-muted">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patron@studio-residence.com"
                className="w-full bg-canvas-subtle border border-border px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-muted focus:outline-none focus:border-ink font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-ink-muted">
                Security Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-canvas-subtle border border-border px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-muted focus:outline-none focus:border-ink font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-ink text-ink-inverse hover:opacity-90 py-3.5 px-6 text-xs uppercase tracking-widest font-mono font-medium transition-colors shadow-subtle mt-2"
            >
              {isSubmitting
                ? "Authorizing..."
                : mode === "login"
                ? "Authenticate Session"
                : "Register Patron Credentials"}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-border">
            {mode === "login" ? (
              <p className="text-xs text-ink-secondary">
                First-time studio patron?{" "}
                <button
                  onClick={() => {
                    setMode("register");
                    setAuthError("");
                  }}
                  className="text-ink font-medium hover:text-accent underline underline-offset-2"
                >
                  Create account
                </button>
              </p>
            ) : (
              <p className="text-xs text-ink-secondary">
                Already registered?{" "}
                <button
                  onClick={() => {
                    setMode("login");
                    setAuthError("");
                  }}
                  className="text-ink font-medium hover:text-accent underline underline-offset-2"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Patron View
  const activeOrder = orders[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 text-ink">
      <Breadcrumbs items={[{ label: "Patron Profile" }]} />

      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink-muted mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Authenticated Studio Patron</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            {user.name}
          </h1>
          <p className="text-xs text-ink-secondary mt-1 font-mono">
            {user.email} &bull; Member Tier: Archival Circle
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => logout()}
            className="px-4 py-2 border border-border bg-surface text-xs font-mono uppercase tracking-wider text-ink hover:border-rose-600 hover:text-rose-600 transition-colors inline-flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
          <Link
            href="/account/orders"
            className="px-4 py-2 bg-ink text-ink-inverse text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-colors"
          >
            Consignment Ledger
          </Link>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex gap-4 border-b border-border text-xs font-mono uppercase tracking-wider overflow-x-auto no-scrollbar">
        <Link href="/account" className="py-2 border-b-2 border-ink text-ink font-medium">
          Overview
        </Link>
        <Link href="/account/orders" className="py-2 text-ink-secondary hover:text-ink">
          Consignments ({orders.length})
        </Link>
        <Link href="/account/wishlist" className="py-2 text-ink-secondary hover:text-ink">
          Archival Wishlist
        </Link>
        <Link href="/account/addresses" className="py-2 text-ink-secondary hover:text-ink">
          Dispatch Destinations
        </Link>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 border border-border bg-surface space-y-1 shadow-subtle">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
            Consignment Ledger
          </span>
          <p className="font-serif text-xl text-ink">
            {orders.length} Registered {orders.length === 1 ? "Order" : "Orders"}
          </p>
          <p className="text-xs text-ink-secondary pt-1">
            {activeOrder ? `Latest: ${activeOrder.orderNumber}` : "No active orders"}
          </p>
        </div>

        <div className="p-6 border border-border bg-surface space-y-1 shadow-subtle">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
            Patron Allocation Tier
          </span>
          <p className="font-serif text-xl text-ink">Archival Circle</p>
          <p className="text-xs text-ink-secondary pt-1">
            Priority allocation on numbered runs
          </p>
        </div>

        <div className="p-6 border border-border bg-surface space-y-1 shadow-subtle">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
            Authentication Security
          </span>
          <p className="font-serif text-xl text-ink">256-Bit Encrypted</p>
          <p className="text-xs text-ink-secondary pt-1">Session Cookie Active</p>
        </div>
      </div>

      {/* Recent Consignment Spotlight */}
      {activeOrder ? (
        <div className="border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                Latest Consignment
              </span>
              <h2 className="font-serif text-xl text-ink font-normal">
                {activeOrder.orderNumber} &bull; {formatPrice(activeOrder.total)}
              </h2>
            </div>
            <Link
              href={`/tracking/${activeOrder.orderNumber}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink hover:text-accent font-medium"
            >
              <span>View Telemetry &bull; {activeOrder.status}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs text-ink-secondary font-mono">
            <Clock className="w-4 h-4 text-accent" />
            <span>
              Dispatched via {activeOrder.carrier || "DHL Express Courier"}. Delivery estimate:{" "}
              {activeOrder.estimatedDelivery || "4 Business Days"}.
            </span>
          </div>
        </div>
      ) : (
        <div className="border border-border bg-canvas-subtle p-8 text-center space-y-3">
          <p className="font-serif text-base text-ink">No consignment records in your ledger.</p>
          <p className="text-xs text-ink-secondary max-w-sm mx-auto font-sans">
            Explore our architectural taxonomies and discover objects crafted for permanence.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-ink text-ink-inverse text-xs uppercase tracking-widest font-mono py-2.5 px-5 hover:opacity-90 transition-colors mt-2"
          >
            Explore Catalog &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
