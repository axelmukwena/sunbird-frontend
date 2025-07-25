"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import { Organisation } from "@/api/services/weaver/organisations/types";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useCurrentOrganisationContext } from "@/providers/current-organisation";
import { ClientPathname } from "@/types/paths";

interface NavOrganisationProps {
  organisation: Organisation;
}

export const NavOrganisationItem: FC<NavOrganisationProps> = ({
  organisation,
}) => {
  const { currentOrganisation } = useCurrentOrganisationContext();
  const isSelected = currentOrganisation?.id === organisation.id;
  return (
    <DropdownMenuItem
      key={organisation.id}
      className="cursor-pointer p-2"
      asChild
    >
      <Link
        className="flex items-center gap-3 w-full"
        href={`${ClientPathname.ORGANISATIONS}/${organisation.id}`}
      >
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">
            {organisation.name}
          </div>
        </div>
        {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
      </Link>
    </DropdownMenuItem>
  );
};
