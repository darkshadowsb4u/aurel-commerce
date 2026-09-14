import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Archival Record Not Found",
  description: "The requested object or monograph reference does not exist in the studio ledger.",
};

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 text-ink">
      <div className="max-w-md w-full text-center space-y-6 border border-border bg-surface p-8 sm:p-12 shadow-card">
        <div className="w-12 h-12 bg-surface-stone border border-border flex items-center justify-center mx-auto text-accent">
          <Compass className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">
            404 &bull; Ledger Exception
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
            Archival Record Vacant
          </h1>
          <p className="text-xs text-ink-secondary leading-relaxed">
            The object reference, monograph, or category route you requested does not exist in the studio archive.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/shop"
            className="w-full sm:w-auto bg-ink text-ink-inverse hover:opacity-90 text-xs uppercase tracking-widest font-mono py-3 px-6 transition-colors shadow-subtle"
          >
            Explore Catalog
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto border border-border bg-surface text-ink text-xs uppercase tracking-widest font-mono py-3 px-6 hover:border-accent transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Flagship</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
