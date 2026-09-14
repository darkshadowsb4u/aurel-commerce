"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 z-50 bg-surface/98 backdrop-blur-xl border-b border-border shadow-dropdown transition-all duration-200 animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Disciplines & Taxonomies (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block border-b border-border pb-2">
              Disciplines of Form
            </span>
            <ul className="space-y-3 text-xs">
              <li>
                <Link
                  href="/shop?category=living"
                  onClick={onClose}
                  className="group flex items-center justify-between hover:text-accent transition-colors"
                >
                  <span className="font-serif text-base text-ink group-hover:text-accent">
                    Living & Objects
                  </span>
                  <span className="text-[10px] font-mono text-ink-muted">04 Works</span>
                </Link>
                <p className="text-[11px] text-ink-muted mt-0.5">
                  Carved volcanic basalt, unlacquered brass, domestic incense ritual.
                </p>
              </li>

              <li className="pt-2">
                <Link
                  href="/shop?category=workspace"
                  onClick={onClose}
                  className="group flex items-center justify-between hover:text-accent transition-colors"
                >
                  <span className="font-serif text-base text-ink group-hover:text-accent">
                    Workspace & Tools
                  </span>
                  <span className="text-[10px] font-mono text-ink-muted">04 Works</span>
                </Link>
                <p className="text-[11px] text-ink-muted mt-0.5">
                  Turned Grade 5 titanium, vegetable-tanned Tuscan bridle leather.
                </p>
              </li>

              <li className="pt-2">
                <Link
                  href="/shop?category=acoustics"
                  onClick={onClose}
                  className="group flex items-center justify-between hover:text-accent transition-colors"
                >
                  <span className="font-serif text-base text-ink group-hover:text-accent">
                    Technology & Acoustics
                  </span>
                  <span className="text-[10px] font-mono text-ink-muted">04 Works</span>
                </Link>
                <p className="text-[11px] text-ink-muted mt-0.5">
                  Milled unibody aluminum, custom neodymium balanced-mode drivers.
                </p>
              </li>

              <li className="pt-2">
                <Link
                  href="/shop?category=lighting"
                  onClick={onClose}
                  className="group flex items-center justify-between hover:text-accent transition-colors"
                >
                  <span className="font-serif text-base text-ink group-hover:text-accent">
                    Architectural Lighting
                  </span>
                  <span className="text-[10px] font-mono text-ink-muted">04 Works</span>
                </Link>
                <p className="text-[11px] text-ink-muted mt-0.5">
                  Mouth-blown Murano smoked glass, counterbalanced brass task arms.
                </p>
              </li>
            </ul>
          </div>

          {/* Col 2: Featured Spotlight Object (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block border-b border-border pb-2">
              Atelier Spotlight
            </span>
            <Link
              href="/product/sonus-a1-wireless-speaker"
              onClick={onClose}
              className="group block space-y-3 bg-canvas-subtle border border-border p-3 hover:border-ink transition-all"
            >
              <div className="relative aspect-square w-full bg-canvas-stone overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop"
                  alt="Sonus A1 Speaker"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-editorial"
                  sizes="260px"
                />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent">
                  Permanent Collection
                </p>
                <h4 className="font-serif text-sm text-ink font-normal mt-0.5">
                  Sonus A1 Precision Speaker
                </h4>
                <p className="text-xs font-mono tabular-nums text-ink-secondary font-medium mt-1">
                  {formatPrice(480)} &bull; 3D Model Available
                </p>
              </div>
            </Link>
          </div>

          {/* Col 3: Editorial Spotlight (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block border-b border-border pb-2">
              Monograph In Focus
            </span>
            <Link
              href="/editorial/monolithic-acoustics-machined-aluminum"
              onClick={onClose}
              className="group block space-y-3 bg-canvas-subtle border border-border p-3 hover:border-ink transition-all"
            >
              <div className="relative aspect-[16/10] w-full bg-canvas-stone overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop"
                  alt="Acoustics research"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-editorial"
                  sizes="260px"
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">
                  Materiality &bull; 6 Min Read
                </p>
                <h4 className="font-serif text-xs text-ink font-normal leading-snug group-hover:text-accent">
                  The Metallurgy Behind the Sonus A1
                </h4>
                <p className="text-[11px] text-ink-secondary line-clamp-2">
                  Why single-billet aluminum extrusions eliminate mechanical resonances in high-output drivers.
                </p>
              </div>
            </Link>
          </div>

          {/* Col 4: Archival Commission (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted block border-b border-border pb-2">
              Archival Run
            </span>
            <div className="p-4 bg-canvas-subtle border border-border space-y-3">
              <div className="flex items-center gap-1.5 text-accent text-[10px] font-mono uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Edition 01</span>
              </div>
              <h5 className="font-serif text-xs text-ink font-medium">
                Monolith Concrete Clock
              </h5>
              <p className="text-[11px] text-ink-secondary">
                Serialized run of 50 pieces. 18 remain in allocation.
              </p>
              <Link
                href="/product/archival-edition-01-concrete-clock"
                onClick={onClose}
                className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-ink hover:text-accent transition-colors font-medium pt-1"
              >
                <span>Inspect Plaque</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                onClick={onClose}
                className="block text-center py-2 border border-border text-[11px] font-mono uppercase tracking-wider text-ink-secondary hover:text-ink hover:border-ink/40 transition-colors"
              >
                View All Works &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
