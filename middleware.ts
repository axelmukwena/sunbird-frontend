import { NextRequest, NextResponse } from "next/server";

import { ClientPathname } from "./types/paths";
import {
  LOGGED_OUT_PUBLIC_ROUTES,
  PUBLIC_ROUTES,
} from "./utilities/constants/paths";
import {
  generateCsrfToken,
  setCsrfTokenCookie,
} from "./utilities/helpers/csrf";
import { CookieKey } from "./utilities/helpers/enums";

export const middleware = async (
  req: NextRequest,
): Promise<NextResponse<unknown>> => {
  // Create a response that we can modify.
  const res = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });

  // --- Set security headers.
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // --- Ensure a CSRF token is present.
  const csrfToken = req.cookies.get(CookieKey.TENDIFLOW_CSRF_TOKEN)?.value;
  if (!csrfToken) {
    const newCsrfToken = generateCsrfToken();
    setCsrfTokenCookie(res, newCsrfToken);
  }

  // --- Extract the request path and hostname.
  const { pathname } = req.nextUrl;

  // --- If is API route, do not require authentication.
  const isNextApiRoute = pathname.startsWith("/api/");
  if (isNextApiRoute) {
    return res;
  }

  // --- Authentication check.
  const token = req.cookies.get(CookieKey.TENDIFLOW_ID_TOKEN)?.value;

  // --- Route checks
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route),
  ); // Use PUBLIC_ROUTES instead
  const isLoggedOutOnlyRoute = LOGGED_OUT_PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // If no token is present and the route is not public, redirect to sign in.
  if (!token && !isPublicRoute) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = ClientPathname.LOGIN;
    return NextResponse.redirect(loginUrl);
  }

  // If the user is authenticated and attempts to access a logged-out-only route,
  // redirect them to a default internal route.
  if (token && isLoggedOutOnlyRoute && pathname !== ClientPathname.LOGOUT) {
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = ClientPathname.HOME;
    return NextResponse.redirect(homeUrl);
  }

  // All checks passed, proceed with the request.
  return res;
};

export const config = {
  matcher: [
    // Match all paths except for static files.
    "/((?!_next/static|_next/image|favicon.ico|static).*)",
  ],
};
