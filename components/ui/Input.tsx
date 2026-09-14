import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const errorId = error && inputId ? `${inputId}-error` : undefined;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] font-mono uppercase tracking-wider text-ink-secondary"
          >
            {label}
            {props.required && <span className="text-accent ml-1">*</span>}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={errorId}
          className={twMerge(
            clsx(
              "w-full h-11 px-3.5 bg-surface text-ink text-sm font-sans border rounded-none placeholder:text-ink-subtle transition-colors focus:outline-none focus:ring-1",
              error
                ? "border-rose-600 focus:border-rose-600 focus:ring-rose-600 dark:border-rose-400 dark:focus:border-rose-400"
                : "border-border focus:border-ink focus:ring-ink",
              props.disabled && "opacity-50 cursor-not-allowed bg-canvas-subtle",
              className
            )
          )}
          {...props}
        />
        {error ? (
          <p id={errorId} className="text-[11px] font-mono text-rose-600 dark:text-rose-400">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-[11px] font-sans text-ink-muted">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
