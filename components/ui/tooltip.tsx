"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

const TooltipProvider = ({
  delayDuration = 0,
  ...props
}: React.ComponentProps<
  typeof TooltipPrimitive.Provider
>): React.JSX.Element => (
  <TooltipPrimitive.Provider
    data-slot="tooltip-provider"
    delayDuration={delayDuration}
    {...props}
  />
);

const TooltipContainer = ({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>): React.JSX.Element => (
  <TooltipProvider>
    <TooltipPrimitive.Root data-slot="tooltip" {...props} />
  </TooltipProvider>
);

const TooltipTrigger = ({
  ...props
}: React.ComponentProps<
  typeof TooltipPrimitive.Trigger
>): React.JSX.Element => (
  <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
);

const TooltipContent = ({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<
  typeof TooltipPrimitive.Content
>): React.JSX.Element => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={mergeTailwind(
        "bg-foreground text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-5000 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className,
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
);

const Tooltip = ({
  trigger,
  children,
  className,
  sideOffset = 0,
  side,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root> & {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  side?: "bottom" | "left" | "right" | "top" | undefined;
}): React.JSX.Element => (
  <TooltipContainer {...props}>
    <TooltipTrigger className={className} asChild>
      {trigger}
    </TooltipTrigger>
    <TooltipContent side={side} sideOffset={sideOffset}>
      {children}
    </TooltipContent>
  </TooltipContainer>
);

export {
  Tooltip,
  TooltipContainer,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
};
