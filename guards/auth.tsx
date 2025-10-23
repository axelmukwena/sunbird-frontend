"use client";

import { usePathname, useRouter } from "next/navigation";
import { FC, Fragment, ReactNode, useEffect, useMemo } from "react";

import { LinearLoader } from "@/components/loaders/linear";
import { SectionLoader } from "@/components/loaders/section";
import { useCurrentUserContext } from "@/contexts/current-user";
import { ClientPathname } from "@/types/paths";
import {
  LOGGED_OUT_PUBLIC_ROUTES,
  LOGGED_OUT_ROUTES,
} from "@/utilities/constants/paths";

const ContentFallback: FC = () => (
  <Fragment>
    <LinearLoader />
    <SectionLoader />
  </Fragment>
);

interface Props {
  children: ReactNode;
}

export const RequireAuth: FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, isLoading: userLoading } = useCurrentUserContext();

  // All redirect logic is now inside a single, unconditional useEffect hook.
  useEffect(() => {
    // Don't do anything while the user is loading to prevent premature redirects.
    if (userLoading) {
      return;
    }

    const isPublicRoute = LOGGED_OUT_PUBLIC_ROUTES.includes(pathname);
    const isLoggedOutRoute = LOGGED_OUT_ROUTES.includes(pathname);

    // Case 1: Unauthenticated user on a protected route.
    if (!currentUser && !isPublicRoute && pathname !== ClientPathname.LOGOUT) {
      // router.replace(ClientPathname.LOGOUT);
      return; // Return early to prevent other conditions from running
    }

    // Case 2: Authenticated user on a "logged-out only" route (e.g., /signin).
    if (currentUser && isLoggedOutRoute) {
      router.replace(ClientPathname.HOME);
      return;
    }

    // Case 3: Authenticated user who has not verified their email.
    if (
      currentUser &&
      !currentUser.email_verified_datetime &&
      pathname !== ClientPathname.ACCOUNT_SETTINGS_VERIFY_EMAIL
    ) {
      router.replace(ClientPathname.ACCOUNT_SETTINGS_VERIFY_EMAIL);
    }
  }, [currentUser, userLoading, pathname, router]); // Add all dependencies

  // Determine what to render based on the current state.
  // This logic is now purely for rendering, not for side effects.
  const shouldRenderContent = useMemo(() => {
    if (userLoading) return false;

    const isPublicRoute = LOGGED_OUT_PUBLIC_ROUTES.includes(pathname);
    const isLoggedOutRoute = LOGGED_OUT_ROUTES.includes(pathname);

    // If a redirect is going to happen, don't render the children yet.
    if (!currentUser && !isPublicRoute && pathname !== ClientPathname.LOGOUT)
      return false;
    if (currentUser && isLoggedOutRoute) return false;
    if (
      currentUser &&
      !currentUser.email_verified_datetime &&
      pathname !== ClientPathname.ACCOUNT_SETTINGS_VERIFY_EMAIL
    )
      return false;

    // If none of the redirect conditions are met, it's safe to render.
    return true;
  }, [currentUser, userLoading, pathname]);

  if (!shouldRenderContent) {
    return <ContentFallback />;
  }

  // If all checks pass, render the protected content.
  return <>{children}</>;
};
