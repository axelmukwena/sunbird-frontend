"use client";

import useSWR, { useSWRConfig } from "swr";

import {
  MembershipPermission,
  MembershipStatus,
} from "@/api/services/weaver/memberships/types";
import { currentUserFetcher } from "@/api/services/weaver/profile/fetchers";
import {
  ApiActionProfile,
  UseCurrentUser,
} from "@/api/services/weaver/profile/types";
import { getProfileApiUrlV1 } from "@/api/services/weaver/profile/utilities";
import { User } from "@/api/services/weaver/users/types";
import { LocalStorageKey } from "@/storage/local/enum";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/storage/local/storage";
import { getErrorMessage } from "@/utilities/helpers/errors";

import { useUserCredentials } from "./credentials";

interface GetCurrentUserPermissions {
  organisationIds: string[] | null;
  currentOrganisationId: string | null;
  permissions: MembershipPermission[] | null;
}

/**
 * Get current user permissions from memberships
 */
const getCurrentUserPermissions = (
  user?: User | null,
): GetCurrentUserPermissions => {
  if (!user?.memberships) {
    return {
      organisationIds: null,
      currentOrganisationId: null,
      permissions: null,
    };
  }

  let currentOrganisationId = getLocalStorageItem<string>(
    LocalStorageKey.CURRENT_ORGANISATION_ID,
  );

  // Extract all organisation IDs from active memberships
  const organisationIds = user.memberships
    .filter((membership) => membership.status === MembershipStatus.ACTIVE)
    .map((membership) => membership.organisation_id);

  if (
    !currentOrganisationId ||
    !organisationIds.includes(currentOrganisationId)
  ) {
    // If stored ID is invalid, use the first organisation ID
    currentOrganisationId = organisationIds[0] || null;
    setLocalStorageItem(
      LocalStorageKey.CURRENT_ORGANISATION_ID,
      currentOrganisationId,
    );
  }

  // Get permissions for specific organisation if provided
  let permissions: MembershipPermission[] = [];
  if (currentOrganisationId) {
    const membership = user.memberships.find(
      (m) =>
        m.organisation_id === currentOrganisationId &&
        m.status === MembershipStatus.ACTIVE,
    );
    permissions = membership?.permissions || [];
  }

  return {
    organisationIds,
    currentOrganisationId,
    permissions,
  };
};

/**
 * A hook to get the current user.
 * @returns {UseCurrentUser} The current user.
 */
export const useCurrentUser = (): UseCurrentUser => {
  const { id, getIdToken, logout } = useUserCredentials();
  const { mutate } = useSWRConfig();

  const profileSwrUrl = getProfileApiUrlV1({
    user_id: id,
    action: ApiActionProfile.GET_PROFILE,
  });
  const fetcher = async (): Promise<User | null> =>
    currentUserFetcher({ id, getIdToken, logout });
  const {
    data: currentUser,
    error: currentUserError,
    isLoading: currentUserLoading,
  } = useSWR(profileSwrUrl, fetcher, {
    // refreshInterval: 1000 * 60,
  });

  const mutateCurrentUser = async (): Promise<void> => {
    mutate(profileSwrUrl);
  };

  const { organisationIds, currentOrganisationId, permissions } =
    getCurrentUserPermissions(currentUser);

  const isLoading =
    currentUserLoading || !!(id && !currentUser && !currentUserError);

  return {
    currentUser: currentUser || null,
    isLoading,
    error: getErrorMessage(currentUserError),
    mutateCurrentUser,
    organisationIds,
    currentOrganisationId,
    currentOrganisationPermissions: permissions,
  };
};
