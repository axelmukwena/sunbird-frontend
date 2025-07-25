import { LucideIcon } from "lucide-react";
import { FieldValues } from "react-hook-form";

import { ClientPathname } from "./paths";

export type IconType = LucideIcon;

export interface SelectOptionType {
  name: string;
  value: string;
  caption?: string;
  description?: string;
  disabled?: boolean;
  color?: BadgeStatusColor;
  required?: boolean;
  badgeVariant?: "default" | "destructive" | "outline" | "secondary" | null;
  icon?: IconType | null;
}

export type PopHoverSide = "top" | "right" | "bottom" | "left";

export enum BoolString {
  TRUE = "true",
  FALSE = "false",
  NONE = "",
}

export type Size =
  | "default"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxlh"
  | "grid"
  | "qrcode";
export type AvatarBorderRadius = "100" | "50" | "15" | "5" | "2" | "0";
export type AvatarBoxShadow = "gray" | "none";

export interface MainMenuItem {
  name: string;
  path?: string;
  description?: string;
  dropdown?: {
    layout: "one" | "two";
    menus: MainMenuItem[];
  };
}

export interface MenuItem {
  title: string;
  pathname?: ClientPathname;
  icon?: LucideIcon;
  items?: MenuItem[];
  requireOrganisation?: boolean;
  showOnlyOnMinimized?: boolean;
}

export enum QueryParamKey {
  PAGE = "page",
  LIMIT = "limit",
  SEARCH = "search",
  SORT_BY = "sort-by",
  ORDER_BY = "order-by",
  NUMBER = "number",
  SESSION_ID = "session-id",
  ORIGIN = "origin",
  SUBDOMAIN = "subdomain",
}

export type BadgeStatusColor =
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "gray"
  | "purple"
  | "orange"
  | "teal"
  | "pink";

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

export interface ControllerField {
  field: FieldValues;
}

export type InputValue = string | number | readonly string[] | undefined;
