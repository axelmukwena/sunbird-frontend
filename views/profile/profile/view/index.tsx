"use client";

import { FC } from "react";

import { User } from "@/api/services/weaver/users/types";
import {
  ViewContent,
  ViewPageContent,
  ViewPageHeaderContainer,
  ViewPageTitle,
} from "@/components/ui/view";

import { ProfileActionsMenu } from "../actions-menu";
import { ProfileLeftSection } from "./left";
import { ProfileRightSection } from "./right";

interface ProfilePageContentProps {
  profile?: User | null;
  handleMutateProfiles: () => void;
}

export const ProfilePageContent: FC<ProfilePageContentProps> = ({
  profile,
  handleMutateProfiles,
}) => {
  if (!profile) {
    return null;
  }

  return (
    <ViewPageContent>
      <ViewPageHeaderContainer>
        <ViewPageTitle>
          {profile.first_name} {profile.last_name}
        </ViewPageTitle>
        <ProfileActionsMenu
          profile={profile}
          handleMutateProfiles={handleMutateProfiles}
          contentAlign="end"
          useDropdownMenu={false}
        />
      </ViewPageHeaderContainer>
      <ViewContent>
        <ProfileLeftSection />
        <ProfileRightSection />
      </ViewContent>
    </ViewPageContent>
  );
};
