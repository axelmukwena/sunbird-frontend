"use client";

import { ChevronsUpDown, LogOut, Settings, Shield } from "lucide-react";
import Link from "next/link";
import { FC, useMemo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCurrentUserContext } from "@/providers/current-user";
import { IconType } from "@/types/general";
import { PROFILE_DROPDOWN_MENU_ITEMS } from "@/utilities/constants/general";
import { stringToBackgroundColor } from "@/utilities/helpers/colors";
import { getInitials } from "@/utilities/helpers/text";

export const NavUser: FC = () => {
  const { currentUser } = useCurrentUserContext();
  const { isMobile } = useSidebar();

  const fullname = `${currentUser?.first_name || ""} ${currentUser?.last_name || ""}`;
  const initials = getInitials(fullname);
  const backgroundColor = useMemo(() => {
    if (!currentUser?.avatar_url && initials) {
      return stringToBackgroundColor(initials);
    }
    return "bg-gray-400/60";
  }, [initials, currentUser?.avatar_url]);

  const getIcon = (path: string): IconType => {
    if (path.includes("account") && !path.includes("reset")) return Settings;
    if (path.includes("reset")) return Shield;
    if (path.includes("signout")) return LogOut;
    return Settings;
  };

  if (!currentUser) {
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
              <Avatar className="h-8 w-8 rounded-md">
                <AvatarImage
                  src={currentUser?.avatar_url || ""}
                  alt={fullname}
                />
                <AvatarFallback className={`${backgroundColor} rounded-md`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {currentUser.first_name} {currentUser.last_name}
                </span>
                <span className="truncate text-xs">{currentUser.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-md">
                  <AvatarImage
                    src={currentUser?.avatar_url || ""}
                    alt={fullname}
                  />
                  <AvatarFallback className={`${backgroundColor} rounded-md`}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {currentUser.first_name} {currentUser.last_name}
                  </span>
                  <span className="truncate text-xs">{currentUser.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {PROFILE_DROPDOWN_MENU_ITEMS.map((item) => {
                const Icon = getIcon(item.path || "");
                return (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.path || ""} className="cursor-pointer">
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
