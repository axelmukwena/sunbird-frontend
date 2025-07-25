import React from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>{children}</SidebarInset>
  </SidebarProvider>
);
