import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={twMerge(
        clsx("animate-pulse bg-canvas-stone rounded-none", className)
      )}
      {...props}
    />
  );
}
