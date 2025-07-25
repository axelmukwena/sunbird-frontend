"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

const Separator = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>): React.JSX.Element => (
  <SeparatorPrimitive.Root
    data-slot="separator-root"
    decorative={decorative}
    orientation={orientation}
    className={mergeTailwind(
      "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
      className,
    )}
    {...props}
  />
);

export { Separator };
