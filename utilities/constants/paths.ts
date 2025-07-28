import {
  ClientLoggedOutPathname,
  ClientPathname,
  ClientPublicPathname,
} from "@/types/paths";

export const PUBLIC_ROUTES: string[] = [
  ...Object.values(ClientPublicPathname),
  ...Object.values(ClientLoggedOutPathname),
];

export const LOGGED_OUT_PUBLIC_ROUTES: string[] = [
  ...Object.values(ClientLoggedOutPathname),
];

export const UNTRACKED_ROUTES: string[] = [
  ...Object.values(ClientLoggedOutPathname),
  ClientPathname.LOGOUT,
  ClientPathname.ACCOUNT_SETTINGS,
  ClientPathname.ACCOUNT_SETTINGS_VERIFY_EMAIL,
  ClientPathname.ACCOUNT_SETTINGS_RESET_PASSWORD,
];
