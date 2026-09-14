"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Product } from "@/types/commerce";

interface ProductAccordionsProps {
  product: Product;
}

export function ProductAccordions({ product }: ProductAccordionsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const sections = [
    {
      title: "Materiality & Metallurgy",
      content: (
        <div className="space-y-3">
          <p className="text-xs text-ink-secondary leading-relaxed">
            Constructed exclusively from authentic raw matter without surface laminates or faux patinas:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-xs text-ink-secondary">
            {product.materials.map((mat, i) => (
              <li key={i}>{mat}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "Physical Dimensions & Mass",
      content: (
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-surface border border-border">
            <span className="text-[10px] font-mono text-ink-muted uppercase block">Height</span>
            <span className="font-mono text-ink font-medium">{product.dimensions.height}</span>
          </div>
          <div className="p-3 bg-surface border border-border">
            <span className="text-[10px] font-mono text-ink-muted uppercase block">Width</span>
            <span className="font-mono text-ink font-medium">{product.dimensions.width}</span>
          </div>
          <div className="p-3 bg-surface border border-border">
            <span className="text-[10px] font-mono text-ink-muted uppercase block">Depth</span>
            <span className="font-mono text-ink font-medium">{product.dimensions.depth}</span>
          </div>
          <div className="p-3 bg-surface border border-border">
            <span className="text-[10px] font-mono text-ink-muted uppercase block">Total Mass</span>
            <span className="font-mono text-ink font-medium">{product.dimensions.weight}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Studio Care & Maintenance Ritual",
      content: (
        <ul className="list-disc pl-4 space-y-1.5 text-xs text-ink-secondary">
          {product.careInstructions.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Sustainability & Circularity",
      content: (
        <ul className="list-disc pl-4 space-y-1.5 text-xs text-ink-secondary">
          {product.sustainability.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Courier Dispatch & Quiet Returns",
      content: (
        <div className="space-y-2 text-xs text-ink-secondary leading-relaxed">
          <p>{product.shippingInfo}</p>
          <p>
            We offer 30-day quiet returns. If the object does not harmonize with your domestic space, return it in original unbleached pulp packaging for an immediate refund.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="divide-y divide-border border-y border-border">
      {sections.map((section, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={section.title} className="py-4">
            <button
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between text-left text-xs font-mono uppercase tracking-wider text-ink hover:text-accent transition-colors"
            >
              <span>{section.title}</span>
              <ChevronDown
                className={`w-4 h-4 text-ink-muted transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-ink" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="pt-4 pb-2 transition-all animate-fadeIn">
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
