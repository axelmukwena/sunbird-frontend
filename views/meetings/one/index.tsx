"use client";

import { FC, Fragment } from "react";

import { useMeetingById } from "@/hooks/meetings/id";
import { NotFound } from "@/views/not-found";

import { MeetingHeader } from "./header";
import { MeetingPageContent } from "./view";

interface MeetingViewProps {
  meetingId: string;
}

export const MeetingView: FC<MeetingViewProps> = ({ meetingId }) => {
  const { meeting, isLoading, mutateMeeting } = useMeetingById({ meetingId });

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
  return (
    <Fragment>
      <MeetingHeader meeting={meeting} />
      <MeetingPageContent
        meeting={meeting}
        handleMutateMeetings={mutateMeeting}
      />
    </Fragment>
  );
};
