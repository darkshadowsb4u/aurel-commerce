"use client";

import React from "react";
import dynamic from "next/dynamic";

const Hero3DObject = dynamic(
  () => import("@/components/3d/Hero3DObject").then((mod) => mod.Hero3DObject),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-surface-stone">
        <div className="text-center space-y-2">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[10px] font-mono tracking-widest text-ink-muted uppercase">
            Calibrating Acoustic Model...
          </p>
        </div>
      </div>
    ),
  }
);

export function Hero3DCanvasWrapper() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Hero3DObject />
    </div>
  );
}
