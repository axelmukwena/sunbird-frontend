import { DefaultValues } from "react-hook-form";

import {
  AttendanceStatus,
  Attendee,
} from "@/api/services/weaver/attendees/types";

import { AttendeeFormSchema } from "./schema";

export interface AttendeeFormDefaultValuesProps {
  attendee?: Attendee | null;
  meetingId: string;
  userId?: string | null;
}

/**
 * Get default values for attendee form
 * @returns {DefaultValues<AttendeeFormSchema>} - default values for attendee form
 */
export const attendeeFormDefaultValues = ({
  attendee,
  meetingId,
  userId,
}: AttendeeFormDefaultValuesProps): DefaultValues<AttendeeFormSchema> => {
  return {
    email: attendee?.email || "",
    first_name: attendee?.first_name || "",
    last_name: attendee?.last_name || "",
    phone_number: attendee?.phone_number || null,
    organisation_name: attendee?.organisation_name || null,
    occupation: attendee?.occupation || null,
    meeting_id: attendee?.meeting_id || meetingId,
    user_id: attendee?.user_id || userId || null,
    attendance_status:
      attendee?.attendance_status || AttendanceStatus.REGISTERED,
    custom_field_responses: attendee?.custom_field_responses || null,
    checkin: attendee?.checkin || null,
    feedback: attendee?.feedback || null,
  };
};
