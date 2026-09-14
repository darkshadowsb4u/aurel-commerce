import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "destructive" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-mono uppercase tracking-wider text-xs transition-colors duration-150 select-none disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

    const variants = {
      primary:
        "bg-ink text-ink-inverse hover:opacity-90 active:opacity-100 font-medium shadow-subtle",
      secondary:
        "bg-surface-stone text-ink hover:bg-surface border border-border hover:border-accent active:bg-canvas-subtle shadow-subtle",
      tertiary:
        "bg-transparent text-ink hover:text-accent underline underline-offset-4 decoration-border hover:decoration-accent p-0",
      outline:
        "bg-transparent text-ink border border-border hover:border-ink hover:bg-surface",
      destructive:
        "bg-rose-700 text-white hover:bg-rose-800 active:bg-rose-900 shadow-subtle",
      ghost:
        "bg-transparent text-ink hover:bg-canvas-stone active:bg-canvas-subtle",
    };

    const sizes = {
      sm: "h-8 px-3 text-[10px]",
      md: "h-11 px-6 text-xs",
      lg: "h-13 px-8 text-xs tracking-widest",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(
            baseStyles,
            variants[variant],
            variant !== "tertiary" && sizes[size],
            className
          )
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
