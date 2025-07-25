import { ApiActionMembership } from "./types";

interface GetMembershipApiUrlV1Params {
  organisation_id: string;
  action: ApiActionMembership;
  id?: string | null;
}

/**
 * Get the API URL for membership endpoints
 * @param {GetMembershipApiUrlV1Params} params The parameters to get the API URL
 * @returns {string} The API URL
 */
export const getMembershipApiUrlV1 = ({
  organisation_id,
  action,
  id,
}: GetMembershipApiUrlV1Params): string => {
  const baseUrl = `/api/v1/organisations/${organisation_id}/memberships`;

  switch (action) {
    case ApiActionMembership.GET_FILTERED:
      return `${baseUrl}/filtered`;
    case ApiActionMembership.INVITE_USER:
      return baseUrl;
    case ApiActionMembership.RESPOND_TO_INVITATION:
      return `${baseUrl}/invitation`;
    case ApiActionMembership.GET_BY_ID:
      return `${baseUrl}/${id}`;
    case ApiActionMembership.UPDATE_PERMISSIONS:
      return `${baseUrl}/${id}/permissions`;
    case ApiActionMembership.UPDATE_STATUS:
      return `${baseUrl}/${id}/status`;
    case ApiActionMembership.DELETE:
      return `${baseUrl}/${id}`;
    default:
      return baseUrl;
  }
};
