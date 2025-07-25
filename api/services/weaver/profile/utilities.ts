import { ApiActionProfile } from "./types";

interface GetProfileApiUrlV1Params {
  action: ApiActionProfile;
  user_id?: string | null;
}

/**
 * Get the API URL for profile endpoints
 * @param {GetProfileApiUrlV1Params} params The parameters to get the API URL
 * @returns {string} The API URL
 */
export const getProfileApiUrlV1 = ({
  action,
  user_id,
}: GetProfileApiUrlV1Params): string => {
  const baseUrl = `/api/v1/profile`;

  switch (action) {
    case ApiActionProfile.GET_PROFILE:
    case ApiActionProfile.UPDATE_PROFILE:
      return `${baseUrl}/${user_id}`;
    case ApiActionProfile.CHANGE_PASSWORD:
      return `${baseUrl}/${user_id}/password`;
    case ApiActionProfile.REQUEST_PASSWORD_RESET:
      return `${baseUrl}/password/reset/request`;
    case ApiActionProfile.CONFIRM_PASSWORD_RESET:
      return `${baseUrl}/password/reset/confirm`;
    case ApiActionProfile.REQUEST_EMAIL_VERIFICATION:
      return `${baseUrl}/email/verification/request`;
    case ApiActionProfile.CONFIRM_EMAIL_VERIFICATION:
      return `${baseUrl}/email/verification/confirm`;
    default:
      return baseUrl;
  }
};
