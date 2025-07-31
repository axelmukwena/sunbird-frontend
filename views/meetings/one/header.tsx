"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { Meeting } from "@/api/services/weaver/meetings/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface MeetingHeaderPathnames {
  meeting: string;
  attendees: string;
  attendee: string;
}

const getParentPath = (
  pathname: string,
  pathnames: MeetingHeaderPathnames,
): string => {
  if (pathname === pathnames.attendee) return pathnames.attendees;
  return pathnames.meeting;
};

const getParentName = (currentName: string): string => {
  if (currentName === "Attendee") return "Attendees";
  return "";
};

interface MeetingHeaderProps {
  meeting: Meeting;
  pathnames: MeetingHeaderPathnames;
}

export const MeetingHeader: React.FC<MeetingHeaderProps> = ({
  meeting,
  pathnames,
}) => {
  const pathname = usePathname();

  const getCurrentSection = (): { name: string; isSubpage: boolean } => {
    if (pathname === pathnames.attendees)
      return { name: "Attendees", isSubpage: false };
    if (pathname === pathnames.attendee)
      return { name: "Attendee", isSubpage: true };
    return { name: "", isSubpage: false };
  };

  const currentSection = getCurrentSection();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/meetings"
                className="flex items-center gap-1"
              >
                Meetings
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {currentSection.name ? (
                <BreadcrumbLink
                  href={pathnames.meeting}
                  className="flex items-center gap-1"
                >
                  {meeting.title}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="flex items-center gap-1">
                  {meeting.title}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {currentSection.name && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {currentSection.isSubpage ? (
                    <BreadcrumbLink
                      href={getParentPath(pathname, pathnames)}
                      className="flex items-center gap-1"
                    >
                      {getParentName(currentSection.name)}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="flex items-center gap-1">
                      {currentSection.name}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </>
            )}
            {currentSection.isSubpage && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="flex items-center gap-1">
                    {currentSection.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
