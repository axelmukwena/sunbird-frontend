"use client";

import { ChevronsUpDown, Loader2, Settings, UserPlus } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCurrentOrganisationContext } from "@/contexts/current-organisation";
import { useCurrentUserContext } from "@/contexts/current-user";
import { useOrganisationMemberSearch } from "@/hooks/organisations/member-search";
import { ClientPathname } from "@/types/paths";
import { CreateOrganisation } from "@/views/organisations/one/create";

import { NavOrganisationItem } from "./OrganisationItem";

export const NavOrganisation: FC = () => {
  const { organisationIds } = useCurrentUserContext();
  const { currentOrganisation } = useCurrentOrganisationContext();
  const { isMobile } = useSidebar();

  // Fetch all organisations user has access to
  const { organisations, isLoading } = useOrganisationMemberSearch({
    query: { ids: organisationIds },
  });

  if (!currentOrganisation) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold">
                  {currentOrganisation.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[280px] rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            {/* Current Organisation Actions */}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={ClientPathname.ORGANISATION_SETTINGS}>
                  <Settings className="mr-2 h-4 w-4" />
                  Organisation Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ClientPathname.ORGANISATION_SETTINGS_MEMBERSHIPS}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Users
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-xs text-muted-foreground">
              My organisations
            </DropdownMenuLabel>

            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm text-muted-foreground">
                  Loading...
                </span>
              </div>
            ) : (
              <ScrollArea className="max-h-[200px]">
                <div className="space-y-1 p-1">
                  {organisations.map((organisation) => (
                    <NavOrganisationItem
                      key={organisation.id}
                      organisation={organisation}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
            <DropdownMenuSeparator />
            <CreateOrganisation />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
