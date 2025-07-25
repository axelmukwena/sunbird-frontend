"use client";

import * as RadixPopoverCard from "@radix-ui/react-popover";
import { FC, ReactNode, useMemo } from "react";

import { PopHoverSide } from "@/types/general";
import { mergeTailwind } from "@/utilities/helpers/tailwind";

export type PopoverBackground =
  | "white"
  | "black"
  | "primary"
  | "secondary"
  | "destructive";

interface PopoverCardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: ReactNode;
  content: ReactNode;
  contentWidth?: number | string;
  side: PopHoverSide;
  avoidCollisions?: boolean;
  triggerWidth?: string;
  sideOffset?: number;
  marginRight?: number;
  marginLeft?: number;
  contentPadding?: number;
  background?: PopoverBackground;
}

export const PopoverCard: FC<PopoverCardProps> = ({
  open,
  setOpen,
  trigger,
  content,
  contentWidth = 300,
  side,
  avoidCollisions = true,
  triggerWidth = "100%",
  sideOffset = 5,
  marginRight,
  marginLeft,
  contentPadding = 8,
  background = "white",
}: PopoverCardProps) => {
  const { backgroundClass, arrowClass } = useMemo(() => {
    switch (background) {
      case "white":
        return {
          backgroundClass: "bg-white text-black border",
          arrowClass: "fill-white",
        };
      case "black":
        return {
          backgroundClass: "bg-black text-white",
          arrowClass: "fill-black",
        };
      case "primary":
        return {
          backgroundClass: "bg-primary text-primary-foreground",
          arrowClass: "fill-primary",
        };
      case "secondary":
        return {
          backgroundClass: "bg-secondary text-secondary-foreground border",
          arrowClass: "fill-secondary",
        };
      case "destructive":
        return {
          backgroundClass: "bg-destructive text-destructive-foreground",
          arrowClass: "fill-destructive",
        };
      default:
        return {
          backgroundClass: "bg-white text-black border",
          arrowClass: "fill-white",
        };
    }
  }, [background]);

  return (
    <RadixPopoverCard.Root open={open} onOpenChange={setOpen} modal={true}>
      <RadixPopoverCard.Trigger
        asChild
        onClick={(): void => setOpen(!open)}
        style={{ width: triggerWidth }}
      >
        <span>{trigger}</span>
      </RadixPopoverCard.Trigger>
      <RadixPopoverCard.Content
        sideOffset={sideOffset}
        side={side}
        className={mergeTailwind(
          "popover-card-content rounded-md text-sm p-5 shadow-md will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade",
          backgroundClass,
        )}
        style={{
          maxWidth: contentWidth,
          width: "fit-content",
          marginRight,
          marginLeft,
          padding: contentPadding,
        }}
        avoidCollisions={avoidCollisions}
      >
        {content}
        <RadixPopoverCard.Arrow
          className={mergeTailwind("popover-arrow", arrowClass)}
        />
      </RadixPopoverCard.Content>
    </RadixPopoverCard.Root>
  );
};
