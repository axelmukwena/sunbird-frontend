"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

const Progress = ({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>): React.JSX.Element => (
  <ProgressPrimitive.Root
    data-slot="progress"
    className={mergeTailwind(
      "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className="bg-primary h-full w-full flex-1 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
);

export { Progress };
