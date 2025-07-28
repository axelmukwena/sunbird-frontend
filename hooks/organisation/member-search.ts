"use client";

import useSWR, { useSWRConfig } from "swr";

import { getMemberOrganisationsFetcher } from "@/api/services/weaver/organisations/fetchers";
import {
  ApiActionOrganisation,
  OrganisationParams,
  OrganisationQuery,
  OrganisationsManyResponse,
  UseOrganisations,
} from "@/api/services/weaver/organisations/types";
import { getOrganisationSwrUrlV1 } from "@/api/services/weaver/organisations/utilities";
import { getErrorMessage } from "@/utilities/helpers/errors";

import { useUserCredentials } from "../profile/credentials";

interface UseOrganisationMemberSearchProps {
  query: OrganisationQuery;
  requireIdsOrSearch?: boolean;
}

/**
 * Hook to search member organisations by query parameters
 * @param {UseOrganisationMemberSearchProps} props - The query to search the organisations
 * @returns {UseOrganisations} The organisations
 */
export const useOrganisationMemberSearch = ({
  query,
  requireIdsOrSearch,
}: UseOrganisationMemberSearchProps): UseOrganisations => {
  const { getIdToken } = useUserCredentials();
  const { mutate } = useSWRConfig();
  const params: OrganisationParams = {
    limit: 10,
  };
  const fetcher = async (): Promise<OrganisationsManyResponse> =>
    getMemberOrganisationsFetcher({
      getIdToken,
      query,
      params,
      requireIdsOrSearch,
    });

  const organisationsSwrUrl = getOrganisationSwrUrlV1({
    action: ApiActionOrganisation.GET_FILTERED_MEMBER,
    query,
    params,
  });
  const { data, error, isLoading } = useSWR(organisationsSwrUrl, fetcher);

  const handleMutateOrganisations = (): void => {
    mutate(organisationsSwrUrl);
  };

  return {
    organisations: data?.data || [],
    isLoading: !!(!Object.keys(query).length && !data && !error) || isLoading,
    error: getErrorMessage(error),
    handleMutateOrganisations,
  };
};
