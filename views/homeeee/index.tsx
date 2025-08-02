"use client";

import React, { FC, Fragment } from "react";

import { useCurrentOrganisationContext } from "@/providers/current-organisation";

import { HomeHeader } from "./header";
import { OrganisationMemberHome } from "./organisation";
import { UserHome } from "./user";

interface HomeViewProps {}

export const HomeView: FC<HomeViewProps> = () => {
  const { currentOrganisation } = useCurrentOrganisationContext();

  return (
    <Fragment>
      <HomeHeader />
      <UserHome />
      {currentOrganisation && <OrganisationMemberHome />}
    </Fragment>
  );
};
