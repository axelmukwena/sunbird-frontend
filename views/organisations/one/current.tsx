"use client";

import { FC } from "react";

import { LinearLoader } from "@/components/loaders/linear";
import { useCurrentOrganisationContext } from "@/contexts/current-organisation";

import { OrganisationView } from ".";

interface OrganisationSettingsViewProps {}

export const OrganisationSettingsView: FC<
  OrganisationSettingsViewProps
> = () => {
  const { isLoading, currentOrganisation, mutateCurrentOrganisation } =
    useCurrentOrganisationContext();

  if (isLoading) {
    return <LinearLoader />;
  }

  if (!currentOrganisation) {
    return null;
  }

  return (
    <OrganisationView
      organisation={currentOrganisation}
      handleMutateOrganisations={mutateCurrentOrganisation}
    />
  );
};
