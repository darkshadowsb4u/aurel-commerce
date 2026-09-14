"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderTrackingTimeline } from "@/components/tracking/OrderTrackingTimeline";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Search, ArrowRight } from "lucide-react";

export default function TrackingPage() {
  const router = useRouter();
  const [inputCode, setInputCode] = useState("");
  const [activeCode, setActiveCode] = useState("AUR-89241");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    setActiveCode(inputCode.trim().toUpperCase());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs items={[{ label: "Consignment Telemetry" }]} />

      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-ink-muted">
          Logistics Portal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
          Track Consignment Telemetry
        </h1>
        <p className="text-xs sm:text-sm text-ink-secondary max-w-xl leading-relaxed">
          Monitor your commissioned objects in real time as they progress through optical inspection, unbleached pulp packaging, and white-glove international transit.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Enter Order Reference (e.g. AUR-89241)"
          className="flex-1 bg-surface border border-border px-3.5 py-3 text-xs text-ink placeholder:text-ink-subtle uppercase focus:outline-none focus:border-ink rounded-none font-mono"
        />
        <button
          type="submit"
          className="bg-ink text-canvas text-xs uppercase tracking-widest font-mono px-6 py-3 hover:bg-ink-secondary transition-colors inline-flex items-center gap-1.5"
        >
          <span>Query</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Active Timeline */}
      <OrderTrackingTimeline orderId={activeCode} />
    </div>
  );
}
