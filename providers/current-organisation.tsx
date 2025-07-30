"use client";

import React, { createContext, FC, ReactNode, useContext } from "react";

import { CurrentOrganisationContextType } from "@/api/services/weaver/organisations/types";
import { LinearLoader } from "@/components/loaders/linear";
import { useCurrentOrganisation } from "@/hooks/organisations/current";

import { CurrentUserProvider } from "./current-user";

const CurrentOrganisationContext = createContext<
  CurrentOrganisationContextType | undefined
>(undefined);

interface CurrentOrganisationProviderProps {
  children: ReactNode;
}

export const CurrentOrganisationProvider: FC<
  CurrentOrganisationProviderProps
> = ({ children }) => {
  const {
    currentOrganisation,
    isLoading,
    error,
    setCurrentOrganisation,
    mutateCurrentOrganisation,
  } = useCurrentOrganisation();

  // Show loader while fetching current organisation data
  if (isLoading) {
    return <LinearLoader />;
  }

  const contextValue: CurrentOrganisationContextType = {
    currentOrganisation,
    isLoading,
    error,
    setCurrentOrganisation,
    mutateCurrentOrganisation,
  };

  return (
    <CurrentUserProvider>
      <CurrentOrganisationContext.Provider value={contextValue}>
        {children}
      </CurrentOrganisationContext.Provider>
    </CurrentUserProvider>
  );
};

/**
 * Hook to access current organisation context
 * @returns {CurrentOrganisationContextType} Current organisation context
 */
export const useCurrentOrganisationContext =
  (): CurrentOrganisationContextType => {
    const context = useContext(CurrentOrganisationContext);
    if (context === undefined) {
      throw new Error(
        "useCurrentOrganisationContext must be used within a CurrentOrganisationProvider",
      );
    }
    return context;
  };
