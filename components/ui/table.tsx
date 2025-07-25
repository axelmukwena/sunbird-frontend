"use client";

import * as React from "react";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

const Table = ({
  className,
  ...props
}: React.ComponentProps<"table">): React.JSX.Element => (
  <div data-slot="table-container" className="relative w-full overflow-x-auto">
    <table
      data-slot="table"
      className={mergeTailwind("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
);

const TableHeader = ({
  className,
  ...props
}: React.ComponentProps<"thead">): React.JSX.Element => (
  <thead
    data-slot="table-header"
    className={mergeTailwind("[&_tr]:border-b", className)}
    {...props}
  />
);

const TableBody = ({
  className,
  ...props
}: React.ComponentProps<"tbody">): React.JSX.Element => (
  <tbody
    data-slot="table-body"
    className={mergeTailwind("[&_tr:last-child]:border-0", className)}
    {...props}
  />
);

const TableFooter = ({
  className,
  ...props
}: React.ComponentProps<"tfoot">): React.JSX.Element => (
  <tfoot
    data-slot="table-footer"
    className={mergeTailwind(
      "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
);

const TableRow = ({
  className,
  ...props
}: React.ComponentProps<"tr">): React.JSX.Element => (
  <tr
    data-slot="table-row"
    className={mergeTailwind(
      "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
      className,
    )}
    {...props}
  />
);

const TableHead = ({
  className,
  ...props
}: React.ComponentProps<"th">): React.JSX.Element => (
  <th
    data-slot="table-head"
    className={mergeTailwind(
      "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
);

const TableCell = ({
  className,
  ...props
}: React.ComponentProps<"td">): React.JSX.Element => (
  <td
    data-slot="table-cell"
    className={mergeTailwind(
      "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
);

const TableCaption = ({
  className,
  ...props
}: React.ComponentProps<"caption">): React.JSX.Element => (
  <caption
    data-slot="table-caption"
    className={mergeTailwind("text-muted-foreground mt-4 text-sm", className)}
    {...props}
  />
);

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
