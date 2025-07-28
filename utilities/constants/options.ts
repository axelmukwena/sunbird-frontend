import {
  MembershipAdminStatus,
  MembershipInviteeStatus,
  MembershipStatus,
} from "@/api/services/weaver/memberships/types";
import {
  OrganisationSettingsDateFormat,
  OrganisationSettingsTimeFormat,
} from "@/api/services/weaver/organisations/types";
import { WeaverMimeType } from "@/api/services/weaver/types/file";
import { DatabaseStatus, Language } from "@/api/services/weaver/types/general";
import { UserStatus } from "@/api/services/weaver/users/types";
import { BoolString, SelectOptionType } from "@/types/general";

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

export const DATABASE_STATUS_OPTIONS: SelectOptionType[] = [
  {
    name: "Active",
    value: DatabaseStatus.ACTIVE,
    color: "green",
    badgeVariant: "default",
  },
  {
    name: "Archived",
    value: DatabaseStatus.ARCHIVED,
    color: "red",
    badgeVariant: "secondary",
  },
];

export const ACCEPT_IMAGE_FILE_OPTIONS: SelectOptionType[] = [
  { name: "jpg", value: WeaverMimeType.JPG, color: "green" },
  { name: "jpeg", value: WeaverMimeType.JPG, color: "blue" },
  { name: "png", value: WeaverMimeType.PNG, color: "orange" },
  { name: "gif", value: WeaverMimeType.GIF, color: "red" },
  { name: "svg", value: WeaverMimeType.SVG, color: "purple" },
];

export const ORGANISATION_DATE_FORMAT_OPTIONS: SelectOptionType[] = [
  {
    name: "DD-MM-YYYY",
    value: OrganisationSettingsDateFormat.DD_MM_YYYY,
    caption: "31-12-2024",
    description: "Day-Month-Year format (European style)",
  },
  {
    name: "MM-DD-YYYY",
    value: OrganisationSettingsDateFormat.MM_DD_YYYY,
    caption: "12-31-2024",
    description: "Month-Day-Year format (American style)",
  },
  {
    name: "YYYY-MM-DD",
    value: OrganisationSettingsDateFormat.YYYY_MM_DD,
    caption: "2024-12-31",
    description: "Year-Month-Day format (ISO 8601)",
  },
];

export const ORGANISATION_TIME_FORMAT_OPTIONS: SelectOptionType[] = [
  {
    name: "12 Hour",
    value: OrganisationSettingsTimeFormat.TWELVE_HOUR,
    caption: "2:30 PM",
    description: "12-hour format with AM/PM",
  },
  {
    name: "24 Hour",
    value: OrganisationSettingsTimeFormat.TWENTY_FOUR_HOUR,
    caption: "14:30",
    description: "24-hour format (military time)",
  },
];
