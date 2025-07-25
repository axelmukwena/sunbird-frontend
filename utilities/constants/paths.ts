import { ClientPathname, ClientPublicPathname } from "@/types/paths";

export const PUBLIC_ROUTES: string[] = [...Object.values(ClientPublicPathname)];

export const UNTRACKED_ROUTES: string[] = [
  ...PUBLIC_ROUTES,
  ClientPathname.LOGOUT,
  ClientPathname.ACCOUNT_SETTINGS,
  ClientPathname.ACCOUNT_SETTINGS_VERIFY_EMAIL,
  ClientPathname.ACCOUNT_SETTINGS_RESET_PASSWORD,
];
