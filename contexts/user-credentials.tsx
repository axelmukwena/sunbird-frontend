"use client";

import React, { createContext, FC, ReactNode, useContext } from "react";

import {
  UseUserCredentials,
  useUserCredentials,
} from "@/hooks/profile/credentials";

const UserCredentialsContext = createContext<UseUserCredentials | undefined>(
  undefined,
);

interface UserCredentialsContextProviderProps {
  children: ReactNode;
}

export const UserCredentialsContextProvider: FC<
  UserCredentialsContextProviderProps
> = ({ children }) => {
  const credentialsProps = useUserCredentials();

  const contextValue: UseUserCredentials = {
    ...credentialsProps,
  };

  return (
    <UserCredentialsContext.Provider value={contextValue}>
      {children}
    </UserCredentialsContext.Provider>
  );
};

/**
 * Hook to access current user context
 * @returns {UserCredentialsContextType} Current user context
 */
export const useUserCredentialsContext = (): UseUserCredentials => {
  const context = useContext(UserCredentialsContext);
  if (context === undefined) {
    throw new Error(
      "useUserCredentialsContext must be used within a UserCredentialsProvider",
    );
  }
  return context;
};
