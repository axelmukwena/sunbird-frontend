"use client";

import { FC } from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

import { Spinner, SpinnerProps } from "./spinner";

interface SectionLoaderProps {
  minHeight?: string;
  className?: string;
  spinnerProps?: Omit<SpinnerProps, "loading" | "children">;
  message?: string;
}

export const SectionLoader: FC<SectionLoaderProps> = ({
  minHeight = "calc(100vh - 4rem)", // Default minus header height
  className,
  spinnerProps = {},
  message = "Loading...",
}) => {
  return (
    <div
      className={mergeTailwind(
        "flex flex-col items-center justify-center w-full",
        className,
      )}
      style={{ minHeight }}
    >
      <Spinner size="3" color="primary" {...spinnerProps} />
      {message && (
        <p className="mt-4 text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

// Variant for full screen loading
export const FullScreenLoader: FC<Omit<SectionLoaderProps, "minHeight">> = (
  props,
) => (
  <SectionLoader
    {...props}
    minHeight="100vh"
    className={mergeTailwind(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
      props.className,
    )}
  />
);

// Variant for card/component loading
export const CardLoader: FC<Omit<SectionLoaderProps, "minHeight">> = (
  props,
) => (
  <SectionLoader
    {...props}
    minHeight="200px"
    className={mergeTailwind("py-8", props.className)}
    spinnerProps={{ size: "2", ...props.spinnerProps }}
  />
);
