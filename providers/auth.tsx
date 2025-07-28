"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";

import { LinearLoader } from "@/components/loaders/linear";
import { useUserCredentials } from "@/hooks/profile/credentials";
import { usePreviousPathname } from "@/hooks/utilities/previous-pathname";
import { ClientPathname } from "@/types/paths";
import {
  LOGGED_OUT_PUBLIC_ROUTES,
  UNTRACKED_ROUTES,
} from "@/utilities/constants/paths";

import { useCurrentUserContext } from "./current-user";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading: credentialsLoading } = useUserCredentials();
  const { currentUser, isLoading: userLoading } = useCurrentUserContext();
  const { setPreviousPathname } = usePreviousPathname();

  /**
   * Keep track of any client-side redirects we need to do
   */
  const [redirectRoute, setRedirectRoute] = useState<string | null>(null);

  /**
   * Store a "content" node that we'll ultimately render. By default,
   * we can show a loader until we figure out if we need to redirect
   * or can safely show children.
   */
  const [content, setContent] = useState<ReactNode>(<LinearLoader />);

  /**
   * Decide if the current route is "public" (allowed without login).
   */
  const isPublicRoute = useMemo(
    () => LOGGED_OUT_PUBLIC_ROUTES.includes(pathname),
    [pathname],
  );

  /**
   * Track the previous pathname for navigation purposes
   */
  useEffect(() => {
    if (!UNTRACKED_ROUTES.includes(pathname)) {
      setPreviousPathname(pathname);
    }
  }, [pathname, setPreviousPathname]);

  /**
   * Main authentication and authorization logic
   */
  useEffect(() => {
    setRedirectRoute(null);

    // Still loading user data
    if (userLoading || credentialsLoading) {
      setContent(<LinearLoader />);
      return;
    }

    // User not logged in and trying to access protected route
    if (!currentUser && !isPublicRoute) {
      setContent(<LinearLoader />);
      setRedirectRoute(ClientPathname.LOGIN); // or wherever your login route is
      return;
    }

    // User is logged in but email not verified and not already on verify page
    if (
      currentUser &&
      !currentUser.email_verified_datetime &&
      pathname !== ClientPathname.ACCOUNT_SETTINGS_VERIFY_EMAIL
    ) {
      setContent(<LinearLoader />);
      setRedirectRoute(ClientPathname.ACCOUNT_SETTINGS_VERIFY_EMAIL);
      return;
    }

    // If none of the above conditions triggered a redirect, render children
    setContent(children);
  }, [
    children,
    currentUser,
    credentialsLoading,
    userLoading,
    pathname,
    isPublicRoute,
  ]);

  /**
   * Handle redirects using Next.js Router
   */
  useEffect(() => {
    if (redirectRoute) {
      router.push(redirectRoute);
    }
  }, [redirectRoute, router]);

  // Show loader while redirecting
  if (redirectRoute) {
    return <LinearLoader />;
  }

  /**
   * Finally, return the content which may be:
   *  - <LinearLoader /> if we're still checking conditions
   *  - The protected or public children if authorized
   */
  return <>{content}</>;
};
