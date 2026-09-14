"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Truck, Clock, ShieldCheck, ArrowRight, PackageCheck, MapPin } from "lucide-react";

interface Milestone {
  id: string;
  step: number;
  label: string;
  location: string;
  date: string;
  status: "completed" | "current" | "pending";
  description: string;
}

const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: "m-1",
    step: 1,
    label: "Acquisition Authorized",
    location: "Studio Central Ledger",
    date: "March 12, 2026 &bull; 09:14 CET",
    status: "completed",
    description: "Patron order verified and committed to metallurgical assembly log.",
  },
  {
    id: "m-2",
    step: 2,
    label: "Studio Calibration & Inspection",
    location: "Copenhagen Workshop",
    date: "March 12, 2026 &bull; 14:30 CET",
    status: "completed",
    description: "Optical tolerance verification, acoustic frequency check, and serialized numbering.",
  },
  {
    id: "m-3",
    step: 3,
    label: "Enclosed in Molded Pulp Casing",
    location: "Copenhagen Logistics Hub",
    date: "March 13, 2026 &bull; 08:20 CET",
    status: "completed",
    description: "Packed in custom dense unbleached plant fiber with numbered wax seal.",
  },
  {
    id: "m-4",
    step: 4,
    label: "Air Courier Transit",
    location: "Leipzig Global Air Hub",
    date: "March 13, 2026 &bull; 21:45 CET",
    status: "current",
    description: "In international transit via dedicated climate-calibrated cargo freighter.",
  },
  {
    id: "m-5",
    step: 5,
    label: "White-Glove Courier Dispatch",
    location: "New York Metro Depot",
    date: "Estimated March 15, 2026",
    status: "pending",
    description: "Scheduled for direct hand delivery with scheduled patron signing.",
  },
  {
    id: "m-6",
    step: 6,
    label: "Domestic Arrival & Placement",
    location: "Patron Residence",
    date: "Estimated March 15, 2026",
    status: "pending",
    description: "Final unboxing and verification.",
  },
];

export function OrderTrackingTimeline({ orderId = "AUR-89241" }: { orderId?: string }) {
  const [activeTab, setActiveTab] = useState<"timeline" | "details">("timeline");

  return (
    <div className="space-y-8">
      {/* Plaque Top Metadata */}
      <div className="bg-surface border border-border p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-ink-muted">
              <span>Consignment Telemetry</span>
              <span>&bull;</span>
              <span className="text-accent font-medium">In Transit</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal mt-1">
              {orderId}
            </h2>
          </div>

          <div className="text-left sm:text-right text-xs">
            <span className="text-ink-muted font-mono uppercase text-[10px] block">
              Estimated Hand Delivery
            </span>
            <strong className="text-ink font-mono text-sm sm:text-base">
              Monday, March 15 &bull; 14:00–18:00
            </strong>
          </div>
        </div>

        {/* Courier Details Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
              Carrier
            </span>
            <span className="font-medium text-ink">DHL Express White-Glove</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
              Tracking Waybill
            </span>
            <span className="font-mono text-ink">9482-1084-2918-01</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
              Origin
            </span>
            <span className="font-medium text-ink">Copenhagen, Denmark</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block">
              Destination
            </span>
            <span className="font-medium text-ink">New York, NY 10013</span>
          </div>
        </div>
      </div>

      {/* Visual Stepping Timeline */}
      <div className="bg-surface border border-border p-6 sm:p-10 space-y-8">
        <h3 className="text-xs font-mono uppercase tracking-widest text-ink font-medium border-b border-border pb-4">
          Milestone Progression
        </h3>

        <div className="relative pl-6 sm:pl-8 space-y-10 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-border">
          {DEFAULT_MILESTONES.map((m) => {
            const isCompleted = m.status === "completed";
            const isCurrent = m.status === "current";

            return (
              <div key={m.id} className="relative group">
                {/* Node icon */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center transition-colors ${
                    isCompleted
                      ? "bg-ink border-ink text-canvas"
                      : isCurrent
                      ? "bg-canvas border-accent text-accent ring-4 ring-accent/10"
                      : "bg-surface border-border text-ink-muted"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-2.5 h-2.5 sm:w-3.5 h-3.5" />
                  ) : isCurrent ? (
                    <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  ) : (
                    <span className="text-[10px] font-mono">{m.step}</span>
                  )}
                </div>

                {/* Milestone copy */}
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4
                      className={`text-sm font-serif ${
                        isCurrent ? "text-accent font-medium" : "text-ink"
                      }`}
                    >
                      {m.label}
                    </h4>
                    <span
                      className="text-[11px] font-mono text-ink-muted"
                      dangerouslySetInnerHTML={{ __html: m.date }}
                    />
                  </div>

                  <p className="text-xs font-mono text-ink-muted">{m.location}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed pt-1">
                    {m.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
