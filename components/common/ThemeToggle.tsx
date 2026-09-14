"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return (
      <div className="h-8 px-3 border border-border bg-surface text-ink-muted flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider opacity-60">
        <Sun className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Theme</span>
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Day Light Mode" : "Switch to Night Dark Mode"}
      title={isDark ? "Click to switch to Day Light Mode" : "Click to switch to Night Dark Mode"}
      className="group flex items-center gap-2 px-3 py-1.5 border border-accent/50 bg-surface hover:border-accent text-ink transition-all shadow-subtle text-[10px] font-mono uppercase tracking-widest"
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-accent group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-ink font-medium">DAY MODE</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-accent group-hover:-rotate-12 transition-transform duration-300" />
          <span className="text-ink font-medium">NIGHT MODE</span>
        </>
      )}
    </button>
  );
}
