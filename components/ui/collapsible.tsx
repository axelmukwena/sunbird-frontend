"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import React from "react";

const Collapsible = ({
  ...props
}: React.ComponentProps<
  typeof CollapsiblePrimitive.Root
>): React.JSX.Element => (
  <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
);

const CollapsibleTrigger = ({
  ...props
}: React.ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>): React.JSX.Element => (
  <CollapsiblePrimitive.CollapsibleTrigger
    data-slot="collapsible-trigger"
    {...props}
  />
);

const CollapsibleContent = ({
  ...props
}: React.ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleContent
>): React.JSX.Element => (
  <CollapsiblePrimitive.CollapsibleContent
    data-slot="collapsible-content"
    {...props}
  />
);

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
