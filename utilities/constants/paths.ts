import {
  ClientLoggedOutPathname,
  ClientPathname,
  ClientPublicPathname,
} from "@/types/paths";

export const LOGGED_OUT_ROUTES: string[] = [
  ...Object.values(ClientLoggedOutPathname),
];

export const LOGGED_OUT_PUBLIC_ROUTES: string[] = [
  ...LOGGED_OUT_ROUTES,
  ...Object.values(ClientPublicPathname),
];

export const UNTRACKED_ROUTES: string[] = [
  ...Object.values(ClientLoggedOutPathname),
  ClientPathname.LOGOUT,
  ClientPathname.ACCOUNT_SETTINGS,
  ClientPathname.ACCOUNT_SETTINGS_VERIFY_EMAIL,
  ClientPathname.ACCOUNT_SETTINGS_RESET_PASSWORD,
];
