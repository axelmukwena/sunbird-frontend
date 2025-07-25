import * as React from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

const Card = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    data-slot="card"
    className={mergeTailwind(
      "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 px-3 md:px-6 shadow-sm",
      className,
    )}
    {...props}
  />
);

const CardHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    data-slot="card-header"
    className={mergeTailwind(
      "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
      className,
    )}
    {...props}
  />
);

const CardTitle = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    data-slot="card-title"
    className={mergeTailwind("leading-none font-semibold", className)}
    {...props}
  />
);

const CardDescription = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    data-slot="card-description"
    className={mergeTailwind("text-muted-foreground text-sm", className)}
    {...props}
  />
);

const CardAction = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    data-slot="card-action"
    className={mergeTailwind(
      "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
      className,
    )}
    {...props}
  />
);

const CardContent = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    data-slot="card-content"
    className={mergeTailwind("flex flex-col", className)}
    {...props}
  />
);

const CardFooter = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    data-slot="card-footer"
    className={mergeTailwind("flex items-center [.border-t]:pt-6", className)}
    {...props}
  />
);

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
