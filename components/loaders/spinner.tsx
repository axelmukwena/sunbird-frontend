"use client";

import React, { forwardRef, HTMLAttributes } from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

const sizeMap = {
  "1": 8,
  "2": 16,
  "3": 24,
  "4": 32,
} as const;

type SizeType = keyof typeof sizeMap | number;

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SizeType;
  loading?: boolean;
  children?: React.ReactNode;
  color?: "primary" | "muted" | "white" | "current";
}

const colorClasses = {
  primary: "text-primary",
  muted: "text-muted-foreground",
  white: "text-white",
  current: "text-current",
};

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      size = "2",
      loading = true,
      children,
      className = "",
      color = "current",
      ...props
    },
    ref,
  ) => {
    if (!loading) return <>{children}</>;

    const sizeInPixels = typeof size === "number" ? size : sizeMap[size];

    const spinner = (
      <span
        ref={ref}
        className={mergeTailwind(
          "relative inline-block opacity-65",
          colorClasses[color],
          className,
        )}
        style={{
          width: `${sizeInPixels}px`,
          height: `${sizeInPixels}px`,
        }}
        {...props}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
          <span
            key={rotation}
            className="absolute top-0 w-[12.5%] h-full"
            style={{
              left: "calc(50% - 6.25%)",
              transform: `rotate(${rotation}deg)`,
              animation: "spinner-leaf-fade 800ms linear infinite",
              animationDelay: `calc(-${8 - index} / 8 * 800ms)`,
            }}
          >
            <span className="block w-full h-[30%] rounded-sm bg-current" />
          </span>
        ))}
      </span>
    );

    if (children === undefined) return spinner;

    return (
      <span className="relative flex items-center justify-center">
        {/* Hidden children for layout */}
        <span aria-hidden="true" className="contents invisible">
          {children}
        </span>
        {/* Positioned spinner */}
        <span className="absolute inset-0 flex items-center justify-center">
          {spinner}
        </span>
      </span>
    );
  },
);

Spinner.displayName = "Spinner";
