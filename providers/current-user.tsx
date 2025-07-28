"use client";

import React, { createContext, FC, ReactNode, useContext } from "react";

import { CurrentUserContextType } from "@/api/services/weaver/profile/types";
import { LinearLoader } from "@/components/loaders/linear";
import { useCurrentUser } from "@/hooks/profile/current";

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined,
);

interface CurrentUserProviderProps {
  children: ReactNode;
}

export const CurrentUserProvider: FC<CurrentUserProviderProps> = ({
  children,
}) => {
  const {
    currentUser,
    isLoading,
    error,
    mutateCurrentUser,
    organisationIds,
    currentOrganisationId,
    currentOrganisationPermission,
  } = useCurrentUser();

  // Show loader while fetching current user data
  if (isLoading) {
    return <LinearLoader />;
  }

  const contextValue: CurrentUserContextType = {
    currentUser,
    isLoading,
    error,
    mutateCurrentUser,
    organisationIds,
    currentOrganisationId,
    currentOrganisationPermission,
  };

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
};

/**
 * Hook to access current user context
 * @returns {CurrentUserContextType} Current user context
 */
export const useCurrentUserContext = (): CurrentUserContextType => {
  const context = useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentUserContext must be used within a CurrentUserProvider",
    );
  }
  return context;
};
