import { NextRequest, NextResponse } from "next/server";

import {
  generateCsrfToken,
  setCsrfTokenCookie,
} from "./utilities/helpers/csrf";
import { CookieKey } from "./utilities/helpers/enums";

export async function middleware(
  req: NextRequest,
): Promise<NextResponse<unknown>> {
  const { pathname, hostname } = req.nextUrl;

  // --- 1. Handle Redirects First ---
  // If subdomain is "www", redirect to the root domain.
  const hostParts = hostname.split(".");
  if (hostParts.length > 2 && hostParts[0] === "www") {
    const newHostname = hostname.replace("www.", "");
    const url = new URL(pathname, `https://${newHostname}`);
    return NextResponse.redirect(url);
  }

  // --- 2. Define Route Types ---
  // const isPublicRoute = LOGGED_OUT_PUBLIC_ROUTES.some((route) =>
  //   pathname.startsWith(route),
  // );
  const isApiRoute = pathname.startsWith("/api/");

  // Allow API and QR code routes to pass through auth checks
  if (isApiRoute) {
    const response = NextResponse.next();
    return response;
  }

  // --- 3. For all other valid requests, create the response and modify headers ---
  // This is the "pass-through" case for authenticated users on protected routes,
  // or anonymous users on public routes.
  const response = NextResponse.next();

  // Set security headers
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Ensure a CSRF token is present
  const csrfToken = req.cookies.get(CookieKey.TENDIFLOW_CSRF_TOKEN)?.value;
  if (!csrfToken) {
    const newCsrfToken = generateCsrfToken();
    setCsrfTokenCookie(response, newCsrfToken);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except for static files.
    "/((?!_next/static|_next/image|favicon.ico|static).*)",
  ],
};
