"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useCurrentOrganisationContext } from "@/providers/current-organisation";

import { NavMain } from "./main";
import { NavOrganisation } from "./organisation";
import { NavUser } from "./user";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>): React.JSX.Element => {
  const { currentOrganisation } = useCurrentOrganisationContext();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-gray-100">
        {currentOrganisation ? <NavOrganisation /> : <NavUser />}
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-100">
        {currentOrganisation && <NavUser />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
