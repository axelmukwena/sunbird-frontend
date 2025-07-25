"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

const Label = ({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>): React.JSX.Element => (
  <LabelPrimitive.Root
    data-slot="label"
    className={mergeTailwind(
      "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className,
    )}
    {...props}
  />
);

export { Label };
