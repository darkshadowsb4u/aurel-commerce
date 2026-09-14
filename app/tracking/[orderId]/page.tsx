import React from "react";
import type { Metadata } from "next";
import { OrderTrackingTimeline } from "@/components/tracking/OrderTrackingTimeline";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

interface TrackingPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export async function generateMetadata({ params }: TrackingPageProps): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: `Consignment Telemetry: ${orderId}`,
    description: `Tracking timeline and dispatch milestones for consignment ${orderId}.`,
  };
}

export default async function TrackingDetailPage({ params }: TrackingPageProps) {
  const { orderId } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <Breadcrumbs
        items={[
          { label: "Consignment Telemetry", href: "/tracking" },
          { label: orderId },
        ]}
      />

      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-ink-muted">
          Consignment Telemetry
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
          Logistics Manifest &bull; {orderId}
        </h1>
      </div>

      <OrderTrackingTimeline orderId={orderId} />
    </div>
  );
}
