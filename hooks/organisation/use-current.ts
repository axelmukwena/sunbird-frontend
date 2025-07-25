"use client";

import useSWR, { useSWRConfig } from "swr";

import { getOrganisationByIdFetcher } from "@/api/services/weaver/organisations/fetchers";
import {
  ApiActionOrganisation,
  Organisation,
  UseCurrentOrganisation,
} from "@/api/services/weaver/organisations/types";
import { getOrganisationApiUrlV1 } from "@/api/services/weaver/organisations/utilities";
import { getErrorMessage } from "@/utilities/helpers/errors";

import { useUserCredentials } from "../user/use-credentials";
import { useCurrentUser } from "../user/use-current";

/**
 * A hook to get and manage the current organisation.
 * @returns The current organisation and methods to manage it.
 */
export const useCurrentOrganisation = (): UseCurrentOrganisation => {
  const { currentOrganisationId } = useCurrentUser();
  const { getIdToken } = useUserCredentials();
  const { mutate } = useSWRConfig();

  const organisationSwrUrl = getOrganisationApiUrlV1({
    id: currentOrganisationId,
    action: ApiActionOrganisation.GET_BY_ID,
  });

  const fetcher = async (): Promise<Organisation | null> =>
    getOrganisationByIdFetcher({
      id: currentOrganisationId,
      getIdToken,
    });

  const {
    data: currentOrganisation,
    error,
    isLoading: organisationLoading,
  } = useSWR(currentOrganisationId ? organisationSwrUrl : null, fetcher, {
    refreshInterval: 60000,
  });

  const mutateCurrentOrganisation = (): void => {
    if (currentOrganisationId) {
      mutate(organisationSwrUrl);
    }
  };

  const isLoading =
    organisationLoading ||
    !!(currentOrganisationId && !currentOrganisation && !error);

  return {
    currentOrganisation: currentOrganisation || null,
    isLoading,
    error: getErrorMessage(error),
    mutateCurrentOrganisation,
  };
};
