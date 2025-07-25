export enum CookieKey {
  TENDIFLOW_ID_TOKEN = "tendiflow_id_token",
  TENDIFLOW_ID_TOKEN_EXPIRES_AT = "tendiflow_id_token_expires_at",
  TENDIFLOW_REFRESH_TOKEN = "tendiflow_refresh_token",
  TENDIFLOW_CSRF_TOKEN = "tendiflow-csrf-token",
}

export enum HeaderKey {
  AUTHORIZATION = "authorization",
  X_TOTAL_COUNT = "x-total-count",
  X_TENDIFLOW_CSRF_TOKEN = "x-tendiflow-csrf-token",
  CONTENT_TYPE = "content-type",
  X_FORWARDED_FOR = "x-forwarded-for",
  USER_AGENT = "user-agent",
  X_FORWARDED_HOST = "x-forwarded-host",
  X_FORWARDED_PORT = "x-forwarded-port",
  X_FORWARDED_PROTO = "x-forwarded-proto",
}

export enum StorageHeader {
  CONTENT_LENGTH_RANGE = "x-goog-content-length-range",
}

export enum LinkTarget {
  BLANK = "_blank",
  SELF = "_self",
}
