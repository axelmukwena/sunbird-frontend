"use client";

import { Building } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, Fragment, useState } from "react";

import { EntityDialog } from "@/components/dialogs/entity";
import { Button } from "@/components/ui/button";
import { useCurrentOrganisationContext } from "@/contexts/current-organisation";

import { OrganisationForm } from "../form";

interface OrganisationSetupModalProps {}

export const OrganisationSetupModal: FC<OrganisationSetupModalProps> = () => {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const { mutateCurrentOrganisation } = useCurrentOrganisationContext();
  const router = useRouter();

  const handleCloseAndRedirect = (): void => {
    router.push("/meetings");
  };

  return (
    <Fragment>
      <Button size="lg" onClick={() => setIsFormDialogOpen(true)}>
        Set Up My Organisation
      </Button>
      <EntityDialog
        open={isFormDialogOpen}
        setOpen={setIsFormDialogOpen}
        title={
          <div className="flex flex-row items-center gap-4">
            <Building className="h-6 w-6" />
            <span className="text-lg font-semibold">
              Set Up Your Organisation
            </span>
          </div>
        }
      >
        <OrganisationForm
          handleMutateOrganisations={mutateCurrentOrganisation}
          setCloseDialog={handleCloseAndRedirect}
        />
      </EntityDialog>
    </Fragment>
  );
};
