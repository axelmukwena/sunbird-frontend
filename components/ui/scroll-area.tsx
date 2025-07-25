"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

const ScrollBar = ({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>): React.JSX.Element => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    orientation={orientation}
    className={mergeTailwind(
      "flex touch-none p-px transition-colors select-none",
      orientation === "vertical" &&
        "h-full w-2 border-l border-l-transparent !right-[-10px]",
      orientation === "horizontal" &&
        "h-2 flex-col border-t border-t-transparent",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      data-slot="scroll-area-thumb"
      className="bg-border relative flex-1 rounded-full"
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);

const ScrollArea = ({
  className,
  children,
  ...props
}: React.ComponentProps<
  typeof ScrollAreaPrimitive.Root
>): React.JSX.Element => (
  <ScrollAreaPrimitive.Root
    data-slot="scroll-area"
    className={mergeTailwind("relative", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
);

export { ScrollArea, ScrollBar };
