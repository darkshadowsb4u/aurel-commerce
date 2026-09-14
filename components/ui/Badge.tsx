import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "stone" | "accent" | "dark" | "outline" | "limited";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest font-normal select-none";

  const variants = {
    default: "bg-canvas-subtle text-ink border border-border",
    stone: "bg-surface-stone text-ink-secondary border border-border-subtle",
    accent: "bg-accent-light text-accent border border-accent-border",
    dark: "bg-ink text-canvas-pure",
    outline: "border border-border text-ink-secondary bg-transparent",
    limited:
      "bg-ink text-ink-inverse border border-ink/40 tracking-[0.16em]",
  };

  return (
    <span
      className={twMerge(clsx(base, variants[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
}
