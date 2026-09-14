import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ConfirmationClient } from "@/components/checkout/ConfirmationClient";

export const metadata: Metadata = {
  title: "Consignment Confirmation",
  description: "Your AUREL acquisition has been authorized and queued for courier dispatch.",
};

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto py-24 text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono tracking-widest text-ink-muted uppercase">
            Retrieving Consignment Receipt...
          </p>
        </div>
      }
    >
      <ConfirmationClient />
    </Suspense>
  );
}
