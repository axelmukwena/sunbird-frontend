"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Fragment, JSX } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCurrentOrganisation } from "@/hooks/organisation/use-current";
import { MenuItem } from "@/types/general";
import { ClientPathname } from "@/types/paths";
import {
  OVERVIEW_SIDEBAR_MENU_ITEMS,
  SETTINGS_SIDEBAR_MENU_ITEMS,
} from "@/utilities/constants/general";

interface NavMainProps {}

export const NavMain: FC<NavMainProps> = () => {
  const { currentOrganisation } = useCurrentOrganisation();
  const pathname = usePathname();
  const { state } = useSidebar();

  // Filter items based on organisation requirement
  const filterItems = (items: MenuItem[]): MenuItem[] =>
    items.filter((item) => {
      if (item.requireOrganisation && !currentOrganisation) {
        return false;
      }
      return true;
    });

  const overviewItems = filterItems(OVERVIEW_SIDEBAR_MENU_ITEMS);
  const settingsItems = filterItems(SETTINGS_SIDEBAR_MENU_ITEMS);

  const renderMenuItems = (menuItems: MenuItem[]): JSX.Element[] =>
    menuItems.map((item) => {
      const isActive = item.pathname && pathname.includes(item.pathname);
      const hasDropdownActive = item.items?.some(
        (dropdownItem) =>
          dropdownItem.pathname && pathname.includes(dropdownItem.pathname),
      );

      return (
        <Fragment key={item.title}>
          {item.items && item.items.length > 0 && (
            <Collapsible
              asChild
              defaultOpen={hasDropdownActive}
              className="group/collapsible"
            >
              <Collapsible
                asChild
                defaultOpen={hasDropdownActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={
                        isActive || hasDropdownActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : ""
                      }
                    >
                      {state === "collapsed" && (
                        <Link href={item.pathname || ClientPathname.HOME}>
                          {item.icon && <item.icon size={16} />}
                        </Link>
                      )}
                      {state !== "collapsed" && (
                        <Fragment>
                          {item.icon && <item.icon size={20} />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </Fragment>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={subItem.pathname || ClientPathname.HOME}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </Collapsible>
          )}
          {!item.items?.length && (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={
                  isActive ? "bg-sidebar-accent text-sidebar-primary" : ""
                }
              >
                <Link href={item.pathname || ClientPathname.HOME}>
                  {item.icon && <item.icon size={20} />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </Fragment>
      );
    });

  return (
    <>
      {/* Overview Navigation */}
      {overviewItems.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>{renderMenuItems(overviewItems)}</SidebarMenu>
        </SidebarGroup>
      )}

      {/* Settings */}
      {settingsItems.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu>{renderMenuItems(settingsItems)}</SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
};
