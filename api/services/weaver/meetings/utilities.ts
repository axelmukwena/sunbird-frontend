import { ApiActionMeeting } from "./types";

interface GetMeetingApiUrlV1Params {
  organisation_id: string;
  action: ApiActionMeeting;
  meeting_id?: string | null;
}

/**
 * Get the API URL for meeting endpoints
 * @param {GetMeetingApiUrlV1Params} params The parameters to get the API URL
 * @returns {string} The API URL
 */
export const getMeetingApiUrlV1 = ({
  organisation_id,
  action,
  meeting_id,
}: GetMeetingApiUrlV1Params): string => {
  const baseUrl = `/api/v1/organisations/${organisation_id}/meetings`;

  switch (action) {
    case ApiActionMeeting.GET_FILTERED:
      return `${baseUrl}/filtered`;
    case ApiActionMeeting.CREATE:
      return baseUrl;
    case ApiActionMeeting.REGENERATE_QRCODE:
      return `${baseUrl}/${meeting_id}/qrcode/regenerate`;
    case ApiActionMeeting.GET_BY_ID:
    case ApiActionMeeting.UPDATE:
    case ApiActionMeeting.DELETE:
      return `${baseUrl}/${meeting_id}`;
    case ApiActionMeeting.UPDATE_DATABASE_STATUS:
      return `${baseUrl}/${meeting_id}/database-status`;
    case ApiActionMeeting.GET_RECURRING_SERIES:
      return `${baseUrl}/${meeting_id}/recurring-series`;
    case ApiActionMeeting.CHECK_LOCATION:
      return `${baseUrl}/${meeting_id}/check-location`;
    case ApiActionMeeting.PUBLIC:
      return `${baseUrl}/${meeting_id}/public`;
    default:
      return baseUrl;
  }
};
