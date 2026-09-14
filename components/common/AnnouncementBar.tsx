"use client";

import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="relative z-30 bg-canvas-subtle text-ink-secondary border-b border-border py-2 px-4 text-center transition-all select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:block w-6" aria-hidden="true" />

        <div className="flex items-center gap-2 mx-auto">
          <span className="w-1 h-1 rounded-full bg-accent" />
          <p className="text-[10px] sm:text-[11px] tracking-[0.08em] font-mono uppercase text-ink-secondary">
            Complimentary Courier Delivery on Orders Over $250 &bull;{" "}
            <span className="text-ink font-medium">
              Inaugural Code: AUREL10 (-10%)
            </span>
          </p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-ink-muted hover:text-ink transition-colors p-1 -mr-1"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
