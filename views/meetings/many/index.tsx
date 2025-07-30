"use client";

import { FC, Fragment } from "react";

import { MeetingsPageContent } from "./content";
import { MeetingsHeader } from "./header";

interface MeetingsViewProps {}

export const MeetingsView: FC<MeetingsViewProps> = () => {
  return (
    <Fragment>
      <MeetingsHeader />
      <MeetingsPageContent />
    </Fragment>
  );
};
