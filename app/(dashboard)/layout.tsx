import { FC } from "react";

import { MainLayout } from "@/components/layout/main";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default DashboardLayout;
