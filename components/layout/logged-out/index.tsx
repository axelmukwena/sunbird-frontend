"use client";

import React, { FC, ReactNode } from "react";

interface LoggedOutLayoutProps {
  children: ReactNode;
}

export const LoggedOutLayout: FC<LoggedOutLayoutProps> = ({ children }) => {
  return (
    <main className="logged-out-layout min-h-screen h-full w-screen">
      {children}
    </main>
  );
};
