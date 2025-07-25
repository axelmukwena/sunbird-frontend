"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface TabItem {
  id: string;
  name: string;
  path: string;
  icon?: FC<{ className?: string }>;
}

export interface DynamicTabsProps {
  tabs: TabItem[];
  children: ReactNode;
}

export const DynamicTabs: FC<DynamicTabsProps> = ({ tabs, children }) => {
  const pathname = usePathname();
  const activeTab = useMemo(
    () => tabs.find((tab) => pathname === tab.path) || tabs[0],
    [pathname, tabs],
  );

  return (
    <Tabs defaultValue={activeTab.id} className="gap-4 md:gap-6 w-full">
      {/* Mobile Tabs */}
      <Select defaultValue={activeTab?.id}>
        <SelectTrigger className="w-full sm:hidden">
          <SelectValue placeholder="Select a tab" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {tabs.map((tab) => (
              <SelectItem key={tab.id} value={tab.id}>
                <Link href={tab.path} className="flex items-center gap-1">
                  {tab.icon && (
                    <tab.icon
                      className="mr-2 h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  {tab.name}
                </Link>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* Desktop Tabs */}
      <TabsList
        className="hidden sm:grid"
        style={{
          gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
        }}
      >
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            <Link href={tab.path} className="flex items-center gap-1">
              {tab.icon && (
                <tab.icon
                  className="mr-2 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
              <span>{tab.name}</span>
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={activeTab.id}>{children}</TabsContent>
    </Tabs>
  );
};
