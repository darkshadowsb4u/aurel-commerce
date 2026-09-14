"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Shield } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer aria-label="Site Footer" className="bg-surface-stone border-t border-border mt-auto text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Manifesto Col */}
          <div className="lg:col-span-2 space-y-6">
            <span className="font-serif tracking-[0.28em] text-xl text-ink font-normal block select-none">
              A U R E L
            </span>
            <p className="text-xs sm:text-sm leading-relaxed text-ink-secondary max-w-sm font-sans">
              An independent design studio dedicated to the quiet architecture of everyday objects. 
              We engineer acoustic instruments, luminaires, and domestic artifacts calibrated for permanence.
            </p>
            <div className="text-[10px] font-mono tracking-widest text-accent uppercase">
              Atelier &bull; Copenhagen &bull; Tokyo &bull; New York
            </div>
          </div>

          {/* Collection Taxonomy */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.12em] text-accent font-medium">
              Taxonomy
            </h3>
            <ul className="space-y-2.5 text-xs text-ink-secondary">
              <li>
                <Link href="/shop?category=living" className="hover:text-ink transition-colors">
                  Living & Objects
                </Link>
              </li>
              <li>
                <Link href="/shop?category=workspace" className="hover:text-ink transition-colors">
                  Workspace & Tools
                </Link>
              </li>
              <li>
                <Link href="/shop?category=acoustics" className="hover:text-ink transition-colors">
                  Technology & Acoustics
                </Link>
              </li>
              <li>
                <Link href="/shop?category=lighting" className="hover:text-ink transition-colors">
                  Architectural Lighting
                </Link>
              </li>
              <li>
                <Link href="/shop?category=archival" className="hover:text-ink transition-colors">
                  Archival Editions
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-accent transition-colors font-mono text-[11px]">
                  Complete Catalog &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Service */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.12em] text-accent font-medium">
              Client Service
            </h3>
            <ul className="space-y-2.5 text-xs text-ink-secondary">
              <li>
                <Link href="/tracking" className="hover:text-ink transition-colors">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-ink transition-colors">
                  Client Profile
                </Link>
              </li>
              <li>
                <Link href="/account/wishlist" className="hover:text-ink transition-colors">
                  Saved Artifacts
                </Link>
              </li>
              <li>
                <Link href="/editorial" className="hover:text-ink transition-colors">
                  Studio Journal
                </Link>
              </li>
              <li>
                <span className="text-ink-muted cursor-default">
                  Courier Logistics & White Glove
                </span>
              </li>
              <li>
                <span className="text-ink-muted cursor-default">
                  Trade & Contract Inquiries
                </span>
              </li>
            </ul>
          </div>

          {/* Dispatch Journal Signup */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.12em] text-accent font-medium">
              Private Dispatch
            </h3>
            <p className="text-xs text-ink-secondary leading-relaxed font-sans">
              Receive confidential notices on archival releases, material explorations, and studio monographs.
            </p>

            {subscribed ? (
              <div className="p-3 bg-surface border border-border text-xs text-ink flex items-center gap-2 shadow-subtle">
                <Check className="w-3.5 h-3.5 text-accent" />
                <span>You have been registered for private dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="w-full bg-surface border border-border px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-muted focus:outline-none focus:border-ink rounded-none transition-colors font-mono shadow-subtle"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-ink-secondary hover:text-ink transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-ink-muted leading-tight">
                  No automated promotional cadences. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Sub-footer Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ink-muted font-mono">
          <div>
            &copy; {new Date().getFullYear()} AUREL Contemporary Objects. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>WCAG 2.2 AA Compliant</span>
            <span>Worldwide Insured Logistics</span>
            <span>USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
