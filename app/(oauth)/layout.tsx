import { FC } from "react";

import { LoggedOutLayout } from "@/components/layout/logged-out";

interface OauthLayoutProps {
  children: React.ReactNode;
}

const OauthLayout: FC<OauthLayoutProps> = ({ children }) => {
  return <LoggedOutLayout>{children}</LoggedOutLayout>;
};

export default OauthLayout;
