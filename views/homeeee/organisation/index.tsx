"use client";

import { FC, Fragment } from "react";

import { LinearLoader } from "@/components/loaders/linear";
import { Separator } from "@/components/ui/separator";
import { useCurrentOrganisationContext } from "@/providers/current-organisation";

import { QuickActions } from "./actions";
import { OrganisationStatisticsHome } from "./statistics";

interface OrganisationMemberHomeProps {}

export const OrganisationMemberHome: FC<OrganisationMemberHomeProps> = () => {
  const { currentOrganisation } = useCurrentOrganisationContext();

  if (!currentOrganisation) {
    return <LinearLoader />;
  }

  return (
    <Fragment>
      <Separator className="my-6" />
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold mb-2">
            {currentOrganisation.name}'s Dashboard
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage your organisation's meetings, members, and settings from
            here.
          </p>
        </div>
        <OrganisationStatisticsHome />
        <Separator className="my-6" />
        <QuickActions />
      </div>
    </Fragment>
  );
};
