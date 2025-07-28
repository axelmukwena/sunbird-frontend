"use client";

import React, { FC, Fragment } from "react";

import { LinearLoader } from "@/components/loaders/linear";
import { useCurrentOrganisationContext } from "@/providers/current-organisation";

import { HomeHeader } from "./Header";
import { OrganisationMemberHome } from "./organisation";
import { UserHome } from "./user";

interface HomeViewProps {}

export const HomeView: FC<HomeViewProps> = () => {
  const { currentOrganisation, isLoading } = useCurrentOrganisationContext();

  if (isLoading) {
    return <LinearLoader />;
  }
  if (currentOrganisation) {
    return (
      <Fragment>
        <HomeHeader />
        <OrganisationMemberHome />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <HomeHeader />
      <UserHome />
    </Fragment>
  );
};
