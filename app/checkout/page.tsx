"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { ShieldCheck, Check, ArrowRight, ArrowLeft, Lock, Truck, CreditCard } from "lucide-react";

type CheckoutStep = "contact" | "shipping" | "delivery" | "payment" | "review";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discountAmount, discountCode, shippingEstimate, total, clearCart } =
    useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("contact");

  // Form states
  const [email, setEmail] = useState("patron@studio-residence.com");
  const [phone, setPhone] = useState("+1 (555) 382-9014");
  const [firstName, setFirstName] = useState("Julian");
  const [lastName, setLastName] = useState("Vance");
  const [address1, setAddress1] = useState("482 Mercer Street");
  const [address2, setAddress2] = useState("Floor 4");
  const [city, setCity] = useState("New York");
  const [state, setState] = useState("NY");
  const [postalCode, setPostalCode] = useState("10013");
  const [country, setCountry] = useState("United States");
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "white_glove">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple_pay" | "wire">("card");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExp, setCardExp] = useState("11/28");
  const [cardCvc, setCardCvc] = useState("892");
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty and not processing
  if (items.length === 0 && !isProcessing) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="font-serif text-2xl text-ink">Your bag is vacant</h1>
        <p className="text-xs text-ink-secondary">
          Add objects to your bag before proceeding to consignment dispatch.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-ink text-canvas text-xs uppercase tracking-widest font-mono py-3 px-6 hover:bg-ink-secondary transition-colors"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const deliveryPrice = deliverySpeed === "white_glove" ? 45 : shippingEstimate;
  const finalGrandTotal = Math.max(0, subtotal - discountAmount + deliveryPrice);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch("/api/checkout/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          shippingAddress: {
            firstName,
            lastName,
            address1,
            address2,
            city,
            state,
            postalCode,
            country,
          },
          billingAddress: {
            firstName,
            lastName,
            address1,
            address2,
            city,
            state,
            postalCode,
            country,
          },
          items: items.map((i) => ({
            productId: i.productId,
            productSlug: i.productSlug,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            variantName: i.colorName || i.variantName,
            image: i.image,
          })),
          paymentMethod: paymentMethod === "card" ? "credit_card" : paymentMethod,
          cardNumber,
          cardExpiry: cardExp,
          cardCvc,
          promoCode: discountCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Payment authorization failed.");
        setIsProcessing(false);
        return;
      }

      localStorage.setItem("aurel_recent_order", JSON.stringify(data.order));
      clearCart();
      router.push(`/checkout/confirmation?orderId=${data.order.orderNumber}`);
    } catch (err) {
      console.error("Order processing error:", err);
      setIsProcessing(false);
    }
  };

  const steps = [
    { id: "contact", label: "01 Contact" },
    { id: "shipping", label: "02 Destination" },
    { id: "delivery", label: "03 Logistics" },
    { id: "payment", label: "04 Payment" },
    { id: "review", label: "05 Confirmation" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Checkout Minimal Header */}
      <div className="border-b border-border pb-6 flex items-center justify-between">
        <Link href="/" className="font-serif tracking-[0.25em] text-xl text-ink font-normal">
          A U R E L
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
          <Lock className="w-3.5 h-3.5 text-accent" />
          <span>Encrypted Consignment Dispatch</span>
        </div>
      </div>

      {/* Progress Steps */}
      <nav aria-label="Checkout Progress" className="py-6 border-b border-border/60">
        <ol className="flex items-center justify-between sm:justify-start sm:gap-8 overflow-x-auto text-[11px] font-mono uppercase tracking-wider">
          {steps.map((s, idx) => (
            <li
              key={s.id}
              className={`flex items-center gap-2 ${
                currentStep === s.id
                  ? "text-ink font-medium"
                  : "text-ink-muted"
              }`}
            >
              <span>{s.label}</span>
              {idx < steps.length - 1 && <span className="text-border hidden sm:inline">&bull;</span>}
            </li>
          ))}
        </ol>
      </nav>

      {/* Main 2-Col Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-10 items-start">
        {/* Left Form Flow (7 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* STEP 1: CONTACT */}
            {currentStep === "contact" && (
              <div className="space-y-6">
                <div className="border-b border-border pb-3">
                  <h2 className="font-serif text-2xl text-ink font-normal">
                    Patron Identification
                  </h2>
                  <p className="text-xs text-ink-secondary">
                    Your email will be used exclusively for consignment dispatch telemetry.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1.5">
                      Client Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1.5">
                      Contact Telephone (For Courier Dispatch)
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-surface border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("shipping")}
                    className="bg-ink text-canvas py-3.5 px-8 text-xs font-mono uppercase tracking-widest hover:bg-ink-secondary transition-colors inline-flex items-center gap-2"
                  >
                    <span>Continue to Destination</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SHIPPING DESTINATION */}
            {currentStep === "shipping" && (
              <div className="space-y-6">
                <div className="border-b border-border pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl text-ink font-normal">
                      Consignment Destination
                    </h2>
                    <p className="text-xs text-ink-secondary">
                      Specify residential or studio delivery address.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep("contact")}
                    className="text-[11px] font-mono uppercase tracking-wider text-ink-muted hover:text-ink"
                  >
                    Edit Contact
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-surface border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-surface border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1.5">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      className="w-full bg-surface border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1.5">
                      Apartment, Studio, Suite, Unit (Optional)
                    </label>
                    <input
                      type="text"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      className="w-full bg-surface border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-surface border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1.5">
                        State / Province
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-surface border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1.5">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full bg-surface border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("contact")}
                    className="text-xs font-mono uppercase tracking-wider text-ink-secondary hover:text-ink flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep("delivery")}
                    className="bg-ink text-canvas py-3.5 px-8 text-xs font-mono uppercase tracking-widest hover:bg-ink-secondary transition-colors inline-flex items-center gap-2"
                  >
                    <span>Continue to Logistics</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: LOGISTICS & DELIVERY METHOD */}
            {currentStep === "delivery" && (
              <div className="space-y-6">
                <div className="border-b border-border pb-3">
                  <h2 className="font-serif text-2xl text-ink font-normal">
                    Courier Logistics Calibration
                  </h2>
                  <p className="text-xs text-ink-secondary">
                    Select white-glove placement or standard insured dispatch.
                  </p>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setDeliverySpeed("standard")}
                    className={`block p-4 border cursor-pointer transition-all ${
                      deliverySpeed === "standard"
                        ? "border-ink bg-surface shadow-subtle"
                        : "border-border bg-canvas hover:border-ink-secondary"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-medium text-ink">
                      <div className="flex items-center gap-3">
                        <Truck className="w-4 h-4 text-ink-muted" />
                        <div>
                          <p className="font-serif text-sm">Standard Insured Dispatch</p>
                          <p className="text-[11px] text-ink-muted font-normal">
                            Dispatched via DHL Express &bull; Delivered in 2–4 business days
                          </p>
                        </div>
                      </div>
                      <span className="font-mono tabular-nums">
                        {shippingEstimate === 0 ? "Complimentary" : formatPrice(shippingEstimate)}
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setDeliverySpeed("white_glove")}
                    className={`block p-4 border cursor-pointer transition-all ${
                      deliverySpeed === "white_glove"
                        ? "border-ink bg-surface shadow-subtle"
                        : "border-border bg-canvas hover:border-ink-secondary"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-medium text-ink">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4 text-accent" />
                        <div>
                          <p className="font-serif text-sm">Dedicated White-Glove Courier</p>
                          <p className="text-[11px] text-ink-muted font-normal">
                            Scheduled room-of-choice placement &bull; Crate unboxing & removal
                          </p>
                        </div>
                      </div>
                      <span className="font-mono tabular-nums">$45</span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("shipping")}
                    className="text-xs font-mono uppercase tracking-wider text-ink-secondary hover:text-ink flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep("payment")}
                    className="bg-ink text-canvas py-3.5 px-8 text-xs font-mono uppercase tracking-widest hover:bg-ink-secondary transition-colors inline-flex items-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PAYMENT */}
            {currentStep === "payment" && (
              <div className="space-y-6">
                <div className="border-b border-border pb-3">
                  <h2 className="font-serif text-2xl text-ink font-normal">
                    Payment Method
                  </h2>
                  <p className="text-xs text-ink-secondary">
                    All transactions are 256-bit encrypted and tokenized.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Payment option tabs */}
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 border text-center transition-colors ${
                        paymentMethod === "card"
                          ? "border-ink bg-surface font-medium text-ink"
                          : "border-border bg-canvas text-ink-muted hover:text-ink"
                      }`}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("apple_pay")}
                      className={`p-3 border text-center transition-colors ${
                        paymentMethod === "apple_pay"
                          ? "border-ink bg-surface font-medium text-ink"
                          : "border-border bg-canvas text-ink-muted hover:text-ink"
                      }`}
                    >
                      Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("wire")}
                      className={`p-3 border text-center transition-colors ${
                        paymentMethod === "wire"
                          ? "border-ink bg-surface font-medium text-ink"
                          : "border-border bg-canvas text-ink-muted hover:text-ink"
                      }`}
                    >
                      Studio Wire
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="p-4 bg-surface border border-border space-y-4 text-xs">
                      <div>
                        <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1.5">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-canvas border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none font-mono"
                          />
                          <CreditCard className="w-4 h-4 text-ink-muted absolute right-3 top-3.5" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1.5">
                            Expiration (MM/YY)
                          </label>
                          <input
                            type="text"
                            required
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            className="w-full bg-canvas border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none font-mono"
                          />
                        </div>
                        <div>
                          <label className="block font-mono uppercase tracking-wider text-[10px] text-ink-muted mb-1.5">
                            Security CVC
                          </label>
                          <input
                            type="text"
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-canvas border border-border p-3 text-ink focus:outline-none focus:border-ink rounded-none font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "apple_pay" && (
                    <div className="p-6 bg-surface border border-border text-center space-y-2">
                      <p className="font-serif text-sm text-ink">Apple Pay Authorization</p>
                      <p className="text-xs text-ink-secondary">
                        Biometric authorization will be prompted upon finalizing your order.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "wire" && (
                    <div className="p-6 bg-surface border border-border text-center space-y-2">
                      <p className="font-serif text-sm text-ink">Studio Wire Transfer</p>
                      <p className="text-xs text-ink-secondary">
                        Wire coordinates will be dispatched to {email} upon placement.
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("delivery")}
                    className="text-xs font-mono uppercase tracking-wider text-ink-secondary hover:text-ink flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep("review")}
                    className="bg-ink text-canvas py-3.5 px-8 text-xs font-mono uppercase tracking-widest hover:bg-ink-secondary transition-colors inline-flex items-center gap-2"
                  >
                    <span>Review Consignment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: REVIEW & FINAL ORDER PLACEMENT */}
            {currentStep === "review" && (
              <div className="space-y-6">
                <div className="border-b border-border pb-3">
                  <h2 className="font-serif text-2xl text-ink font-normal">
                    Final Review & Commitment
                  </h2>
                  <p className="text-xs text-ink-secondary">
                    Please review destination and items before authorizing consignment.
                  </p>
                </div>

                <div className="p-4 bg-surface border border-border space-y-3 text-xs">
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-ink-muted font-mono uppercase">Patron:</span>
                    <span className="text-ink font-medium">{firstName} {lastName} ({email})</span>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-ink-muted font-mono uppercase">Destination:</span>
                    <span className="text-ink text-right">
                      {address1} {address2}, {city}, {state} {postalCode}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-ink-muted font-mono uppercase">Logistics:</span>
                    <span className="text-ink">
                      {deliverySpeed === "white_glove"
                        ? "Dedicated White-Glove Courier"
                        : "Standard Insured Dispatch"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted font-mono uppercase">Payment:</span>
                    <span className="text-ink">
                      {paymentMethod === "card"
                        ? "Mastercard ending in 4242"
                        : paymentMethod === "apple_pay"
                        ? "Apple Pay"
                        : "Studio Bank Wire"}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("payment")}
                    className="text-xs font-mono uppercase tracking-wider text-ink-secondary hover:text-ink flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="bg-ink text-canvas py-4 px-10 text-xs font-mono uppercase tracking-widest hover:bg-ink-secondary transition-colors inline-flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-canvas border-t-transparent rounded-full animate-spin" />
                        <span>Authorizing Consignment...</span>
                      </>
                    ) : (
                      <>
                        <span>Authorize Acquisition &bull; {formatPrice(finalGrandTotal)}</span>
                        <Check className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5 bg-surface border border-border p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-ink font-medium">
              Consignment Manifest
            </h2>
            <span className="text-xs font-mono text-ink-muted">
              ({items.length} {items.length === 1 ? "Object" : "Objects"})
            </span>
          </div>

          {/* Line items list */}
          <div className="divide-y divide-border/60 max-h-80 overflow-y-auto">
            {items.map((item) => (
              <div key={item.variantId} className="py-3 flex gap-3 items-center">
                <div className="relative w-14 h-18 bg-surface-stone border border-border flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-ink truncate">{item.name}</p>
                  <p className="text-[11px] text-ink-muted">
                    Finish: {item.colorName || item.variantName} &bull; Qty: {item.quantity}
                  </p>
                </div>
                <span className="text-xs font-mono tabular-nums text-ink font-medium">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-ink-secondary border-t border-border pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums text-ink">{formatPrice(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-accent">
                <span>Privilege Code ({discountCode})</span>
                <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Courier Delivery</span>
              <span className="font-mono tabular-nums text-ink">
                {deliveryPrice === 0 ? "Complimentary" : formatPrice(deliveryPrice)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-medium text-ink pt-3 border-t border-border">
              <span>Grand Total</span>
              <span className="font-mono text-base tabular-nums">{formatPrice(finalGrandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
