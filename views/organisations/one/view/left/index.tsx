"use client";

import { FC } from "react";

import { LeftSectionContainer } from "@/components/ui/view";

import { OrganisationContentView } from "./view";

export const OrganisationLeftSection: FC = () => (
  <LeftSectionContainer className="gap-3">
    <OrganisationContentView />
  </LeftSectionContainer>
);
