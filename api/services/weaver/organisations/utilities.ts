import {
  ApiActionOrganisation,
  OrganisationParams,
  OrganisationQuery,
} from "./types";

interface GetOrganisationApiUrlV1Params {
  action: ApiActionOrganisation;
  id?: string | null;
}

/**
 * Get the API URL for organisation endpoints
 * @param {GetOrganisationApiUrlV1Params} params The parameters to get the API URL
 * @returns {string} The API URL
 */
export const getOrganisationApiUrlV1 = ({
  action,
  id,
}: GetOrganisationApiUrlV1Params): string => {
  const baseUrl = `/api/v1/organisations`;
  switch (action) {
    case ApiActionOrganisation.GET_FILTERED:
      return `${baseUrl}/filtered`;
    case ApiActionOrganisation.GET_FILTERED_MEMBER:
      return `${baseUrl}/filtered-member`;
    case ApiActionOrganisation.CREATE:
      return baseUrl;
    case ApiActionOrganisation.GET_BY_ID:
    case ApiActionOrganisation.UPDATE:
    case ApiActionOrganisation.DELETE:
      return `${baseUrl}/${id}`;
    case ApiActionOrganisation.UPDATE_DATABASE_STATUS:
      return `${baseUrl}/${id}/database-status`;
    default:
      return baseUrl;
  }
};

interface GetOrganisationSwrUrlParams extends GetOrganisationApiUrlV1Params {
  query: OrganisationQuery;
  params: OrganisationParams;
}

/**
 * Get the SWR URL for the organisation
 * @param {GetOrganisationSwrUrlParams} params The parameters to get the SWR URL
 * @returns {string} The SWR URL
 */
export const getOrganisationSwrUrlV1 = ({
  action,
  id,
  query,
  params,
}: GetOrganisationSwrUrlParams): string => {
  return (
    getOrganisationApiUrlV1({
      action,
      id,
    }) + `?query=${JSON.stringify(query)}&params=${JSON.stringify(params)}`
  );
};
