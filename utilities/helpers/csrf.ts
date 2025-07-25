import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import {
  getDomainNextRequestCookie,
  getSeureNextRequestCookie,
} from "@/api/utilities";

import { CookieKey, HeaderKey } from "./enums";

/**
 * Generate a secure random token
 * @returns {string} The generated token
 */
export const generateCsrfToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const CSRF_TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

/**
 * Set the CSRF token in a cookie
 * @param {NextResponse} res The response
 * @param {string} token The CSRF token
 */
export function setCsrfTokenCookie(res: NextResponse, token: string): void {
  res.cookies.set(CookieKey.TENDIFLOW_CSRF_TOKEN, token, {
    /**
     * Designating the CSRF cookie as HttpOnly doesn't offer any practical protection
     * because CSRF is only to protect against cross-domain attacks. If an attacker
     * can read the cookie via JavaScript, they're already on the same domain as
     * far as the browser knows, so they can do anything they like anyway.
     */
    httpOnly: false,
    sameSite: "strict",
    maxAge: CSRF_TOKEN_MAX_AGE,
    secure: getSeureNextRequestCookie(),
    domain: getDomainNextRequestCookie(),
  });
}

/**
 * Middleware to verify CSRF token from request headers
 * @param {NextRequest} req The request
 * @returns {boolean} If the CSRF token is valid
 */
export const verifyCsrfToken = async (req: NextRequest): Promise<boolean> => {
  // Fetch the CSRF token from cookies using Next.js built-in cookie handling
  const cooks = await cookies();
  const csrfTokenFromCookie = cooks.get(CookieKey.TENDIFLOW_CSRF_TOKEN)?.value;
  // Fetch the CSRF token from the request header
  const csrfTokenFromHeader = req.headers.get(HeaderKey.X_TENDIFLOW_CSRF_TOKEN);
  // Validate that both exist and match
  if (!csrfTokenFromCookie || !csrfTokenFromHeader) {
    return false;
  }
  return csrfTokenFromCookie === csrfTokenFromHeader;
};
