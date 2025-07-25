import { FC, Fragment, ReactNode } from "react";

import { Toaster } from "@/components/toaster";
import { CurrentOrganisationProvider } from "@/providers/current-organisation";
import JotaiRootWrapper from "@/store/JotaiRootWrapper";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => (
  <Fragment>
    <Toaster />
    <JotaiRootWrapper>
      <CurrentOrganisationProvider>{children}</CurrentOrganisationProvider>
    </JotaiRootWrapper>
  </Fragment>
);
