"use client";

import { Group, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC, Fragment, useMemo } from "react";

import { DynamicTabs, TabItem } from "@/components/ui/dynamic-tabs";
import { useMeetingById } from "@/hooks/meetings/id";
import { AttendeesContentView } from "@/views/attendees/many/content";
import { AttendeeView } from "@/views/attendees/one";
import { NotFound } from "@/views/not-found";

import { MeetingHeader } from "./header";
import { MeetingPageContent } from "./view";

interface MeetingViewProps {
  meetingId: string;
  attendeeId?: string | null;
}

export const MeetingView: FC<MeetingViewProps> = ({
  meetingId,
  attendeeId,
}) => {
  const {
    meeting,
    isLoading,
    mutateMeeting: handleMutateMeeting,
  } = useMeetingById({ meetingId });
  const pathname = usePathname();

  const { tabs, children } = useMemo(() => {
    if (!meeting) return { tabs: [], children: null };

    const meetingPathname = `/meetings/${meeting.id}`;
    const attendeesPathname = `/meetings/${meeting.id}/attendees`;
    const attendeePathname = `/meetings/${meeting.id}/attendees/${attendeeId}`;

    const meetingTabs: TabItem[] = [
      {
        id: "meeting",
        name: "Meeting",
        path: meetingPathname,
        icon: Group,
      },
      {
        id: "attendees",
        name: "Attendees",
        path: attendeesPathname,
        icon: Users,
      },
      ...(attendeeId
        ? [
            {
              id: "attendee",
              name: "Attendee",
              path: attendeePathname,
              icon: Users,
            },
          ]
        : []),
    ];

    // Determine content based on pathname
    let content: React.ReactNode = null;

    switch (pathname) {
      case meetingPathname:
        content = (
          <MeetingPageContent
            meeting={meeting}
            handleMutateMeetings={handleMutateMeeting}
          />
        );
        break;

      case attendeesPathname:
        content = (
          <AttendeesContentView
            meetingId={meetingId}
            handleMutateParent={handleMutateMeeting}
          />
        );
        break;

      case attendeePathname:
        content = attendeeId ? (
          <AttendeeView
            attendeeId={attendeeId}
            meetingId={meeting.id}
            handleMutateParent={handleMutateMeeting}
          />
        ) : null;
        break;

      default:
        content = (
          <MeetingPageContent
            meeting={meeting}
            handleMutateMeetings={handleMutateMeeting}
          />
        );
        break;
    }

    return { tabs: meetingTabs, children: content };
  }, [meeting, pathname, meetingId, attendeeId, handleMutateMeeting]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!meeting) {
    return <NotFound name="Meeting" />;
  }

  const pathnames = {
    meeting: `/meetings/${meeting.id}`,
    attendees: `/meetings/${meeting.id}/attendees`,
    attendee: `/meetings/${meeting.id}/attendees/${attendeeId}`,
  };

  return (
    <Fragment>
      <MeetingHeader meeting={meeting} pathnames={pathnames} />
      <div className="flex flex-col gap-6">
        <DynamicTabs tabs={tabs}>{children}</DynamicTabs>
      </div>
    </Fragment>
  );
};
