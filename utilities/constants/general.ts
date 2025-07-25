import {
  Building,
  Coffee,
  Group,
  LogOut,
  Shield,
  User,
  UserCheck,
} from "lucide-react";

import {
  MembershipAdminStatus,
  MembershipInviteeStatus,
  MembershipStatus,
} from "@/api/services/weaver/memberships/types";
import { WeaverMimeType } from "@/api/services/weaver/types/file";
import { Language } from "@/api/services/weaver/types/general";
import { UserStatus } from "@/api/services/weaver/users/types";
import { BoolString, MenuItem, SelectOptionType } from "@/types/general";
import { ClientPathname } from "@/types/paths";

import { StorageHeader } from "../helpers/enums";

// Define the improved menu structure
export const OVERVIEW_SIDEBAR_MENU_ITEMS = [
  {
    title: "Home",
    pathname: ClientPathname.HOME,
    icon: Coffee,
  },

  // Core Asset Management
  {
    title: "Meetings",
    pathname: ClientPathname.MEETINGS,
    icon: Group,
    requireOrganisation: true,
  },
  {
    title: "Attendees",
    pathname: ClientPathname.ATTENDEES,
    icon: UserCheck,
    requireOrganisation: true,
  },
] satisfies MenuItem[];

export const SETTINGS_SIDEBAR_MENU_ITEMS = [
  {
    title: "Organisation",
    pathname: ClientPathname.ORGANISATION_SETTINGS,
    icon: Building,
    requireOrganisation: true,
    items: [
      {
        title: "Settings",
        pathname: ClientPathname.ORGANISATION_SETTINGS,
      },
    ],
  },

  // Personal Settings
  {
    title: "Account",
    pathname: ClientPathname.ACCOUNT_SETTINGS,
    icon: User,
  },
] satisfies MenuItem[];

// Profile dropdown items with Lucide icons
export const PROFILE_DROPDOWN_MENU_ITEMS = [
  {
    name: "Account Settings",
    icon: User,
    path: ClientPathname.ACCOUNT_SETTINGS,
  },
  {
    name: "Reset Password",
    icon: Shield,
    path: ClientPathname.ACCOUNT_SETTINGS_RESET_PASSWORD,
  },
  {
    name: "Log out",
    icon: LogOut,
    path: ClientPathname.LOGOUT,
  },
];

export const PAGE_LIMIT_OPTIONS: SelectOptionType[] = [
  { name: "10", value: "10" },
  { name: "25", value: "25" },
  { name: "50", value: "50" },
  { name: "75", value: "75" },
  { name: "100", value: "100" },
];

export const BOOLEAN_OPTIONS: SelectOptionType[] = [
  {
    name: "Yes",
    value: BoolString.TRUE,
    color: "green",
    badgeVariant: "default",
  },
  {
    name: "No",
    value: BoolString.FALSE,
    color: "red",
    badgeVariant: "secondary",
  },
];

export const LANGUAGE_OPTIONS: SelectOptionType[] = [
  { name: "English", value: Language.ENGLISH },
];

export const MEMBERSHIP_STATUS_OPTIONS: SelectOptionType[] = [
  { name: "Active", value: MembershipStatus.ACTIVE, color: "green" },
  { name: "Deactivated", value: MembershipStatus.DEACTIVATED, color: "red" },
  { name: "Pending", value: MembershipStatus.PENDING, color: "orange" },
  { name: "Declined", value: MembershipStatus.DECLINED, color: "gray" },
];

export const MEMBERSHIP_UPDATE_STATUS_OPTIONS: SelectOptionType[] = [
  { name: "Active", value: MembershipAdminStatus.ACTIVE, color: "green" },
  {
    name: "Deactivated",
    value: MembershipAdminStatus.DEACTIVATED,
    color: "red",
  },
];

export const MEMBERSHIP_INVITEE_STATUS_OPTIONS: SelectOptionType[] = [
  { name: "Accept", value: MembershipInviteeStatus.ACCEPTED, color: "green" },
  {
    name: "Decline",
    value: MembershipInviteeStatus.DECLINED,
    color: "red",
  },
];

export const USER_STATUS_OPTIONS: SelectOptionType[] = [
  { name: "Active", value: UserStatus.ACTIVE, color: "green" },
  { name: "Pending", value: UserStatus.PENDING, color: "gray" },
  { name: "Deactivated", value: UserStatus.DEACTIVATED, color: "red" },
];

export const ACCEPT_IMAGE_FILE_OPTIONS: SelectOptionType[] = [
  { name: "jpg", value: WeaverMimeType.JPG, color: "green" },
  { name: "jpeg", value: WeaverMimeType.JPG, color: "blue" },
  { name: "png", value: WeaverMimeType.PNG, color: "orange" },
  { name: "gif", value: WeaverMimeType.GIF, color: "red" },
  { name: "svg", value: WeaverMimeType.SVG, color: "purple" },
];

export const ACCEPT_IMAGE_FILE_TYPES = ACCEPT_IMAGE_FILE_OPTIONS.map(
  (type) => type.value,
).join(",");

export const ACCEPT_IMAGE_FILE_EXTENSIONS = ACCEPT_IMAGE_FILE_OPTIONS.map(
  (type) => type.name.toUpperCase(),
).join(", ");

export const ACCEPT_DOCUMENT_FILE_OPTIONS: SelectOptionType[] = [
  { name: "pdf", value: WeaverMimeType.PDF, color: "red" },
  { name: "doc", value: WeaverMimeType.DOC, color: "blue" },
  { name: "docx", value: WeaverMimeType.DOCX, color: "green" },
  { name: "xls", value: WeaverMimeType.XLS, color: "orange" },
  { name: "xlsx", value: WeaverMimeType.XLSX, color: "purple" },
  { name: "csv", value: WeaverMimeType.CSV, color: "gray" },
];

export const ACCEPT_DOCUMENT_FILE_TYPES = ACCEPT_DOCUMENT_FILE_OPTIONS.map(
  (type) => type.value,
).join(",");

export const ACCEPT_DOCUMENT_FILE_EXTENSIONS = ACCEPT_DOCUMENT_FILE_OPTIONS.map(
  (type) => type.name.toUpperCase(),
).join(", ");

export const ACCEPT_SPREADSHEET_IMPORT_FILE_OPTIONS: SelectOptionType[] = [
  {
    name: "csv",
    value: WeaverMimeType.CSV,
    color: "orange",
  },
  {
    name: "xlsx",
    value: WeaverMimeType.XLSX,
    color: "blue",
  },
  {
    name: "xls",
    value: WeaverMimeType.XLS,
    color: "green",
  },
];

export const ACCEPT_SPREADSHEET_IMPORT_FILE_TYPES =
  ACCEPT_SPREADSHEET_IMPORT_FILE_OPTIONS.map((type) => type.value).join(",");

export const ACCEPT_SPREADSHEET_IMPORT_FILE_EXTENSIONS =
  ACCEPT_SPREADSHEET_IMPORT_FILE_OPTIONS.map((type) =>
    type.name.toUpperCase(),
  ).join(", ");

export const STORAGE_HEADERS: Record<StorageHeader, string> = {
  [StorageHeader.CONTENT_LENGTH_RANGE]: "0,104857600", // Limit upload to 100MB
};
