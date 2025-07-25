export const ENVIRONMENT_VARIABLES = {
  NEXT_PUBLIC_SITE_DOMAIN_NAME:
    process.env.NEXT_PUBLIC_SITE_DOMAIN_NAME || "localhost",
  NEXT_PUBLIC_SITE_BASE_URL:
    process.env.NEXT_PUBLIC_SITE_BASE_URL || "http://localhost:6001",
  NEXT_PUBLIC_API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6002",
  NODE_ENV: process.env.NODE_ENV || "development",
  OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID || "",
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET || "",
  INDEX_DATABSE_NAME: "tendiflow-database",
  INDEX_DATABSE_VERSION: 1,
} as const;
