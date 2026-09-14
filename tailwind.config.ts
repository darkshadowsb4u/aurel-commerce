import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        canvas: {
          DEFAULT: "var(--canvas-default)",
          subtle: "var(--canvas-subtle)",
          stone: "var(--canvas-stone)",
          pure: "var(--canvas-pure)",
          dark: "var(--canvas-dark)",
        },
        surface: {
          DEFAULT: "var(--surface-default)",
          card: "var(--surface-card)",
          subtle: "var(--surface-subtle)",
          stone: "var(--surface-stone)",
          charcoal: "var(--surface-charcoal)",
          graphite: "var(--surface-graphite)",
        },
        ink: {
          DEFAULT: "var(--ink-default)",
          secondary: "var(--ink-secondary)",
          muted: "var(--ink-muted)",
          subtle: "var(--ink-subtle)",
          faint: "var(--ink-faint)",
          inverse: "var(--ink-inverse)",
        },
        border: {
          DEFAULT: "var(--border-default)",
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
          dark: "var(--border-dark)",
        },
        accent: {
          DEFAULT: "var(--accent-default)",
          hover: "var(--accent-hover)",
          light: "var(--accent-light)",
          border: "var(--accent-border)",
          olive: "var(--accent-olive)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Georgia",
          "serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "monospace",
        ],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "1px",
        md: "2px",
        lg: "3px",
        xl: "4px",
        full: "9999px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(24, 24, 22, 0.04)",
        card: "0 4px 16px -4px rgba(24, 24, 22, 0.05)",
        elevated: "0 16px 36px -12px rgba(24, 24, 22, 0.08)",
        dropdown: "0 10px 28px -6px rgba(24, 24, 22, 0.07)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
