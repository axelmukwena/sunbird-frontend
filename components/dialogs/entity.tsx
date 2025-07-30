import React, { FC, ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mergeTailwind } from "@/utilities/helpers/tailwind";

import { ScrollArea } from "../ui/scroll-area";

export const ENTITY_DIALOG_SIZE_CLASSES = {
  sm: "w-[400px] sm:w-[500px] sm:max-w-[600px]",
  md: "w-[400px] sm:w-[600px] sm:max-w-[800px]",
  lg: "w-[400px] sm:w-[800px] sm:max-w-[1000px]",
  xl: "w-[400px] sm:w-[1000px] sm:max-w-[1200px]",
  full: "w-full sm:w-[1400px] sm:max-w-[1400px]",
};

export const ENTITY_DIALOG_INNER_WIDTH_CLASSES = {
  sm: "w-[calc(400px-50px)] sm:w-[calc(500px-50px)] sm:max-w-[calc(600px-50px)]",
  md: "w-[calc(400px-50px)] sm:w-[calc(600px-50px)] sm:max-w-[calc(800px-50px)]",
  lg: "w-[calc(400px-50px)] sm:w-[calc(800px-50px)] sm:max-w-[calc(1000px-50px)]",
  xl: "w-[calc(400px-50px)] sm:w-[calc(1000px-50px)] sm:max-w-[calc(1200px-50px)]",
  full: "w-full sm:w-[calc(1395px-50px)] sm:max-w-[calc(1395px-50px)]",
};

type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;
type FocusOutsideEvent = CustomEvent<{
  originalEvent: FocusEvent;
}>;

interface EntityDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: ReactNode;
  description?: string;
  children?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  closeOnOutsideClick?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  customWidth?: string;
  customMaxWidth?: string;
  showCloseButton?: boolean;
}

export const EntityDialog: FC<EntityDialogProps> = ({
  open,
  setOpen,
  trigger,
  title,
  description,
  children,
  side = "right",
  closeOnOutsideClick = false,
  size = "md",
  showCloseButton = true,
}) => {
  const onInteractOutside = (
    e: PointerDownOutsideEvent | FocusOutsideEvent,
  ): void => {
    if (!closeOnOutsideClick) {
      e.preventDefault();
      return;
    }

    const target = e.target as HTMLElement;
    const closestMatchingParent = target.closest('div[data-state="open"]');

    if (!closestMatchingParent) {
      e.preventDefault();
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        side={side}
        onInteractOutside={onInteractOutside}
        onClick={(e) => e.stopPropagation()}
        className={mergeTailwind(
          ENTITY_DIALOG_SIZE_CLASSES[size],
          "flex flex-col h-full",
        )}
        showCloseButton={showCloseButton}
      >
        <SheetHeader
          className={mergeTailwind(
            !description && !title && "hidden",
            "flex-shrink-0 pb-4",
          )}
        >
          <SheetTitle
            className={mergeTailwind(
              !title && "hidden",
              "mr-10 text-xl font-bold break-words",
            )}
          >
            {title}
          </SheetTitle>
          <SheetDescription
            className={mergeTailwind(!description && "hidden", "break-words")}
          >
            {description}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="pb-4">{children}</div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
