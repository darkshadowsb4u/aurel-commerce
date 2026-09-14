"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/types/commerce";
import { Box, Image as ImageIcon, ZoomIn } from "lucide-react";
import { Hero3DCanvasWrapper } from "@/components/3d/Hero3DCanvasWrapper";
import { AcousticWaveformCanvas } from "@/components/3d/AcousticWaveformCanvas";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  has3DViewer?: boolean;
}

export function ProductGallery({ images, productName, has3DViewer = false }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"image" | "3d">("image");
  const [isZoomed, setIsZoomed] = useState(false);

  const activeImage = images[activeIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Visual Canvas Container */}
      <div className="relative aspect-[4/5] w-full bg-canvas-subtle border border-border overflow-hidden shadow-card">
        {viewMode === "3d" && has3DViewer ? (
          <div className="w-full h-full relative">
            <div className="absolute inset-0 z-0">
              <AcousticWaveformCanvas opacity={0.25} />
            </div>
            <div className="relative z-10 w-full h-full">
              <Hero3DCanvasWrapper />
            </div>
          </div>
        ) : (
          <div
            className={`relative w-full h-full cursor-zoom-in transition-transform duration-500 ease-editorial ${
              isZoomed ? "scale-125 cursor-zoom-out" : "scale-100"
            }`}
            onClick={() => setIsZoomed((prev) => !prev)}
          >
            <Image
              src={activeImage.url}
              alt={activeImage.alt || productName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {activeImage.caption && (
              <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md border border-border px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-ink shadow-subtle">
                {activeImage.caption}
              </div>
            )}
          </div>
        )}

        {/* Mode Switcher: 2D Photography vs 3D Inspection */}
        {has3DViewer && (
          <div className="absolute top-4 right-4 z-10 flex items-center bg-surface/90 backdrop-blur-md border border-border p-1 gap-1 shadow-subtle">
            <button
              onClick={() => {
                setViewMode("image");
                setIsZoomed(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors ${
                viewMode === "image"
                  ? "bg-ink text-ink-inverse font-medium shadow-subtle"
                  : "text-ink-secondary hover:text-ink"
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span>Studio View</span>
            </button>
            <button
              onClick={() => {
                setViewMode("3d");
                setIsZoomed(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors ${
                viewMode === "3d"
                  ? "bg-ink text-ink-inverse font-medium shadow-subtle"
                  : "text-ink-secondary hover:text-ink"
              }`}
            >
              <Box className="w-3 h-3 text-ink-muted" />
              <span>3D Model</span>
            </button>
          </div>
        )}

        {/* Zoom Hint */}
        {viewMode === "image" && (
          <div className="absolute bottom-4 right-4 pointer-events-none text-ink-muted bg-surface/80 backdrop-blur-xs p-1.5 border border-border shadow-subtle">
            <ZoomIn className="w-3.5 h-3.5 text-ink-muted" />
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => {
                setActiveIndex(idx);
                setViewMode("image");
                setIsZoomed(false);
              }}
              className={`relative aspect-square bg-canvas-stone border overflow-hidden transition-all shadow-subtle ${
                activeIndex === idx && viewMode === "image"
                  ? "border-ink ring-1 ring-ink opacity-100"
                  : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${productName} thumbnail ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
