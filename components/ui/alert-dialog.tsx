"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

import { buttonVariants } from "./button";

const AlertDialog = ({
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Root
>): React.JSX.Element => (
  <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
);

const AlertDialogTrigger = ({
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Trigger
>): React.JSX.Element => (
  <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
);

const AlertDialogPortal = ({
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Portal
>): React.JSX.Element => (
  <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
);

const AlertDialogOverlay = ({
  className,
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Overlay
>): React.JSX.Element => (
  <AlertDialogPrimitive.Overlay
    data-slot="alert-dialog-overlay"
    className={mergeTailwind(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
      className,
    )}
    {...props}
  />
);

const AlertDialogContent = ({
  className,
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Content
>): React.JSX.Element => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      data-slot="alert-dialog-content"
      className={mergeTailwind(
        "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
);

const AlertDialogHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    data-slot="alert-dialog-header"
    className={mergeTailwind(
      "flex flex-col gap-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

const AlertDialogFooter = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    data-slot="alert-dialog-footer"
    className={mergeTailwind(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);

const AlertDialogTitle = ({
  className,
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Title
>): React.JSX.Element => (
  <AlertDialogPrimitive.Title
    data-slot="alert-dialog-title"
    className={mergeTailwind("text-lg font-semibold", className)}
    {...props}
  />
);

const AlertDialogDescription = ({
  className,
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Description
>): React.JSX.Element => (
  <AlertDialogPrimitive.Description
    data-slot="alert-dialog-description"
    className={mergeTailwind("text-muted-foreground text-sm", className)}
    {...props}
  />
);

const AlertDialogAction = ({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }): React.JSX.Element => (
  <AlertDialogPrimitive.Action
    className={mergeTailwind(buttonVariants({ variant, size }), className)}
    {...props}
  />
);

const AlertDialogCancel = ({
  className,
  ...props
}: React.ComponentProps<
  typeof AlertDialogPrimitive.Cancel
>): React.JSX.Element => (
  <AlertDialogPrimitive.Cancel
    className={mergeTailwind(buttonVariants({ variant: "outline" }), className)}
    {...props}
  />
);

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
