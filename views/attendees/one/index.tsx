"use client";

import { FC } from "react";

import { useAttendeeById } from "@/hooks/attendees/id";
import { NotFound } from "@/views/not-found";

import { AttendeePageContent } from "./view";

interface AttendeeViewProps {
  meetingId: string;
  attendeeId: string;
  handleMutateParent: () => void;
}

export const AttendeeView: FC<AttendeeViewProps> = ({
  attendeeId,
  handleMutateParent,
}) => {
  const { attendee, isLoading, mutateAttendee } = useAttendeeById({
    attendeeId,
  });

  const handleAttendeeMutate = (): void => {
    mutateAttendee();
    handleMutateParent();
  };

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

  if (!attendee) {
    return <NotFound name="Attendee" />;
  }

  return (
    <AttendeePageContent
      attendee={attendee}
      handleMutateAttendees={handleAttendeeMutate}
    />
  );
};
