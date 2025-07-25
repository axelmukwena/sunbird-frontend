export enum ClientPublicPathname {
  LOGIN = "/login",
  SIGNUP = "/signup",
  FORGOT_PASSWORD = "/forgot-password",
  FLOW = "/flow",
}

export enum ClientOrganisationPathname {
  HOME = "/",
  ORGANISATIONS = "/organisations",
  MEETINGS = "/meetings",
  ATTENDEES = "/attendees",
  ORGANISATION_SETTINGS = "/settings/organisation",
  ORGANISATION_SETTINGS_MEMBERSHIPS = "/settings/organisation/memberships",
  ORGANISATION_SETTINGS_BILLING = "/settings/organisation/billing",
}

export enum ClientUserAccountPathname {
  LOGOUT = "/logout",
  ACCOUNT_SETTINGS = "/settings/account",
  ACCOUNT_SETTINGS_MEMBERSHIPS = "/settings/account/memberships",
  ACCOUNT_SETTINGS_PERMISSIONS = "/settings/account/permissions",
  ACCOUNT_SETTINGS_RESET_PASSWORD = "/settings/account/reset-password",
  ACCOUNT_SETTINGS_VERIFY_EMAIL = "/settings/account/verify-email",
}

export const ClientPathname = {
  ...ClientPublicPathname,
  ...ClientOrganisationPathname,
  ...ClientUserAccountPathname,
};

export type ClientPathname =
  | ClientPublicPathname
  | ClientOrganisationPathname
  | ClientUserAccountPathname;

export enum ExternalUrl {
  LANDING_PAGE = "https://tendiflow.com",
  TERMS_OF_SERVICE = "https://tendiflow.com/terms",
  PRIVACY_POLICY = "https://tendiflow.com/privacy",
  HELP = "https://tendiflow.com/help",
}
