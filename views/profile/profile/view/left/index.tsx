"use client";

import { FC } from "react";

import { LeftSectionContainer } from "@/components/ui/view";

import { ProfileContentView } from "./view";

export const ProfileLeftSection: FC = () => (
  <LeftSectionContainer className="gap-3">
    <ProfileContentView />
  </LeftSectionContainer>
);
