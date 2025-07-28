import { FC, Fragment, ReactNode } from "react";

import { Toaster } from "@/components/toaster";
import { AuthProvider } from "@/providers/auth";
import { CurrentOrganisationProvider } from "@/providers/current-organisation";
import JotaiRootWrapper from "@/store/JotaiRootWrapper";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => (
  <Fragment>
    <Toaster />
    <JotaiRootWrapper>
      <CurrentOrganisationProvider>
        <AuthProvider>{children}</AuthProvider>
      </CurrentOrganisationProvider>
    </JotaiRootWrapper>
  </Fragment>
);
