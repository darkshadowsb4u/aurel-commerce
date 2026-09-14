import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { SiteHeader } from "@/components/common/SiteHeader";
import { Footer } from "@/components/common/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/common/SearchModal";
import { MobileNav } from "@/components/common/MobileNav";
import { QuickAddModal } from "@/components/commerce/QuickAddModal";

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "AUREL — Contemporary Objects & Architectural Tools",
    template: "%s | AUREL",
  },
  description:
    "An independent studio crafting acoustic instruments, domestic vessels, machined tools, and architectural luminaires calibrated for permanence.",
  keywords: [
    "Industrial Design",
    "Acoustic Speakers",
    "Minimalist Home",
    "Architectural Lighting",
    "Machined Aluminum",
    "Basalt Stone",
    "Luxury Hardware",
  ],
  authors: [{ name: "AUREL Design Studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aurel-objects.com",
    siteName: "AUREL",
    title: "AUREL — Contemporary Objects & Architectural Tools",
    description:
      "An independent studio crafting acoustic instruments, domestic vessels, machined tools, and architectural luminaires calibrated for permanence.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "AUREL Sonus A1 Acoustic Monolith",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUREL — Contemporary Objects",
    description: "Quiet domestic sculptures and precision studio tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serifFont.variable} ${sansFont.variable} ${monoFont.variable} bg-canvas text-ink antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col font-sans selection:bg-ink selection:text-canvas"
      >
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-canvas focus:font-mono focus:text-xs uppercase tracking-wider"
        >
          Skip to main content
        </a>

        <AppProviders>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />

          {/* Global Accessible Overlays */}
          <CartDrawer />
          <SearchModal />
          <MobileNav />
          <QuickAddModal />
        </AppProviders>
      </body>
    </html>
  );
}
