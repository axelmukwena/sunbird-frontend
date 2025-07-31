"use client";

import { FC, Fragment } from "react";

import { AttendeesContentView } from "./content";
import { AttendeesHeader } from "./header";

interface AttendeesViewProps {
  meetingId: string;
  handleMutateParent: () => void;
}

export const AttendeesView: FC<AttendeesViewProps> = ({
  meetingId,
  handleMutateParent,
}) => {
  return (
    <Fragment>
      <AttendeesHeader />
      <AttendeesContentView
        meetingId={meetingId}
        handleMutateParent={handleMutateParent}
      />
    </Fragment>
  );
};
