"use client";

import { FC } from "react";

import { LinearLoader } from "@/components/loaders/linear";
import { useCurrentUserContext } from "@/contexts/current-user";

import { ProfileView } from ".";

interface ProfileSettingsViewProps {}

export const ProfileSettingsView: FC<ProfileSettingsViewProps> = () => {
  const { isLoading, currentUser, mutateCurrentUser } = useCurrentUserContext();

  if (isLoading) {
    return <LinearLoader />;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <ProfileView
      profile={currentUser}
      handleMutateProfiles={mutateCurrentUser}
    />
  );
};
