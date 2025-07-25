"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { stringToBackgroundColor } from "@/utilities/helpers/colors";
import { mergeTailwind } from "@/utilities/helpers/tailwind";

const Avatar = ({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>): React.JSX.Element => (
  <AvatarPrimitive.Root
    data-slot="avatar"
    className={mergeTailwind(
      "relative flex size-8 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
);

const AvatarImage = ({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>): React.JSX.Element => (
  <AvatarPrimitive.Image
    data-slot="avatar-image"
    className={mergeTailwind("aspect-square size-full", className)}
    {...props}
  />
);

const AvatarFallback = ({
  initials,
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & {
  initials?: string;
}): React.JSX.Element => {
  const backgroundColor = initials
    ? stringToBackgroundColor(initials)
    : "bg-muted";
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={mergeTailwind(
        `${backgroundColor} flex size-full items-center justify-center text-sm font-bold text-secondary-foreground`,
        className,
      )}
      {...props}
    />
  );
};

export { Avatar, AvatarFallback, AvatarImage };
