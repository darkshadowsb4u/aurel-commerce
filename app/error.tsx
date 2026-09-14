"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Uncaught application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 text-ink">
      <div className="max-w-md w-full text-center space-y-6 border border-border bg-surface p-8 sm:p-12 shadow-card">
        <div className="w-12 h-12 bg-surface-stone border border-border flex items-center justify-center mx-auto text-red-500">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">
            Telemetry Exception
          </span>
          <h1 className="font-serif text-2xl text-ink font-normal">
            Studio Service Interrupted
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            An unforeseen runtime exception occurred. The telemetry state has been safely logged.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-ink text-ink-inverse hover:opacity-90 text-xs uppercase tracking-widest font-mono py-3 px-6 transition-colors flex items-center justify-center gap-2 shadow-subtle"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-initialize State</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto border border-border bg-surface text-ink text-xs uppercase tracking-widest font-mono py-3 px-6 hover:border-accent transition-colors"
          >
            Return Flagship
          </Link>
        </div>
      </div>
    </div>
  );
}
