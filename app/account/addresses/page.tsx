"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { MapPin, Plus, Check } from "lucide-react";

export default function AccountAddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      label: "Studio Residence (Default)",
      recipient: "Julian Vance",
      address1: "482 Mercer Street",
      address2: "Floor 4",
      city: "New York",
      state: "NY",
      postalCode: "10013",
      country: "United States",
      phone: "+1 (555) 382-9014",
      isDefault: true,
    },
    {
      id: "addr-2",
      label: "Copenhagen Design Studio",
      recipient: "Julian Vance",
      address1: "Bredgade 28",
      address2: "2. sal",
      city: "Copenhagen",
      state: "Hovedstaden",
      postalCode: "1260",
      country: "Denmark",
      phone: "+45 33 12 44 80",
      isDefault: false,
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <Breadcrumbs
        items={[
          { label: "Patron Profile", href: "/account" },
          { label: "Dispatch Destinations" },
        ]}
      />

      <div className="border-b border-border pb-6 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted block mb-1">
            Logistics Registry
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
            Dispatch Destinations
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-6 sm:p-8 border bg-surface flex flex-col justify-between space-y-6 ${
              addr.isDefault ? "border-ink shadow-subtle" : "border-border"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg text-ink">{addr.label}</span>
                {addr.isDefault && (
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent bg-accent-light px-2 py-0.5 border border-accent/20">
                    Default Destination
                  </span>
                )}
              </div>

              <div className="text-xs text-ink-secondary space-y-1">
                <p className="font-medium text-ink">{addr.recipient}</p>
                <p>{addr.address1}</p>
                {addr.address2 && <p>{addr.address2}</p>}
                <p>
                  {addr.city}, {addr.state} {addr.postalCode}
                </p>
                <p>{addr.country}</p>
                <p className="text-ink-muted font-mono pt-1">{addr.phone}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex gap-4 text-xs font-mono uppercase tracking-wider">
              <button className="text-ink hover:underline">Edit Destination</button>
              {!addr.isDefault && (
                <button
                  onClick={() =>
                    setAddresses(
                      addresses.map((a) => ({
                        ...a,
                        isDefault: a.id === addr.id,
                      }))
                    )
                  }
                  className="text-ink-muted hover:text-ink"
                >
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
