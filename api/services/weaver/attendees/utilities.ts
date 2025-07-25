import { ApiActionAttendee } from "./types";

interface GetAttendeeApiUrlV1Params {
  organisation_id: string;
  action: ApiActionAttendee;
  attendee_id?: string | null;
  device_fingerprint?: string | null;
}

/**
 * Get the API URL for attendee endpoints
 * @param {GetAttendeeApiUrlV1Params} params The parameters to get the API URL
 * @returns {string} The API URL
 */
export const getAttendeeApiUrlV1 = ({
  organisation_id,
  action,
  attendee_id,
  device_fingerprint,
}: GetAttendeeApiUrlV1Params): string => {
  const baseUrl = `/api/v1/organisations/${organisation_id}/attendees`;

  switch (action) {
    case ApiActionAttendee.GET_FILTERED:
      return `${baseUrl}/filtered`;
    case ApiActionAttendee.GET_BY_ID:
    case ApiActionAttendee.UPDATE:
    case ApiActionAttendee.DELETE:
      return `${baseUrl}/${attendee_id}`;
    case ApiActionAttendee.REGISTER:
      return `${baseUrl}/register`;
    case ApiActionAttendee.GUEST_CHECKIN:
      return `${baseUrl}/checkin/public`;
    case ApiActionAttendee.GET_GUEST_BY_FINGERPRINT:
      return `${baseUrl}/guest/${device_fingerprint}`;
    case ApiActionAttendee.UPDATE_GUEST_BY_FINGERPRINT:
      return `${baseUrl}/guest/${device_fingerprint}`;
    case ApiActionAttendee.CANCEL_GUEST_BY_FINGERPRINT:
      return `${baseUrl}/guest/${device_fingerprint}/cancel`;
    case ApiActionAttendee.CANCEL:
      return `${baseUrl}/${attendee_id}/cancel`;
    case ApiActionAttendee.SUBMIT_FEEDBACK:
      return `${baseUrl}/${attendee_id}/feedback`;
    case ApiActionAttendee.SUBMIT_GUEST_FEEDBACK:
      return `${baseUrl}/guest/${device_fingerprint}/feedback`;
    default:
      return baseUrl;
  }
};
