"use client";

import { FC, Fragment } from "react";

import { ProfileAttendeesHeader } from "./breadcrumb";
import { ProfileAttendeesContent } from "./content";

interface ProfileAttendeesViewProps {}

export const ProfileAttendeesView: FC<ProfileAttendeesViewProps> = () => {
  return (
    <Fragment>
      <ProfileAttendeesHeader />
      <div className="flex flex-col gap-6">
        <ProfileAttendeesContent />
      </div>
    </Fragment>
  );
};
