"use client";

import { FC } from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

interface LinearLoaderProps {
  className?: string;
  color?: "primary" | "green" | "blue" | "red" | "yellow";
}

const colorClasses = {
  primary: {
    background: "bg-primary/20",
    bar: "bg-primary",
  },
  green: {
    background: "bg-green-200",
    bar: "bg-green-600",
  },
  blue: {
    background: "bg-blue-200",
    bar: "bg-blue-600",
  },
  red: {
    background: "bg-red-200",
    bar: "bg-red-600",
  },
  yellow: {
    background: "bg-yellow-200",
    bar: "bg-yellow-600",
  },
};

export const LinearLoader: FC<LinearLoaderProps> = ({
  className,
  color = "primary",
}) => {
  const colors = colorClasses[color];

  return (
    <div
      className={mergeTailwind(
        "fixed top-0 left-0 z-[1301] w-full m-0 p-0",
        className,
      )}
    >
      <div
        className={mergeTailwind(
          "h-1 w-full relative overflow-hidden",
          colors.background,
        )}
      >
        <span
          className={mergeTailwind(
            "absolute top-0 left-0 right-0 bottom-0 w-auto origin-left transition-transform duration-100 ease-linear",
            colors.bar,
            "animate-linear-loader-one",
          )}
        />
        <span
          className={mergeTailwind(
            "absolute top-0 left-0 right-0 bottom-0 w-auto origin-left transition-transform duration-100 ease-linear",
            colors.bar,
            "animate-linear-loader-two",
          )}
        />
      </div>
    </div>
  );
};
