import { Plus } from "lucide-react";
import { FC, Fragment, useState } from "react";

import { EntityDialog } from "@/components/dialogs/entity";
import { Button } from "@/components/ui/button";
import { mergeTailwind } from "@/utilities/helpers/tailwind";

import { OrganisationForm } from "./form";

interface CreateOrganisationProps {
  triggerClassName?: string;
  triggerVariant?: "default" | "secondary" | "outline" | "ghost" | "link";
}

export const CreateOrganisation: FC<CreateOrganisationProps> = ({
  triggerClassName,
  triggerVariant = "outline",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button
        onClick={() => setOpen(true)}
        className={mergeTailwind("w-full", triggerClassName)}
        variant={triggerVariant}
      >
        <Plus className="mr-2 h-4 w-4" />
        Create Organisation
      </Button>
      <EntityDialog
        open={open}
        setOpen={setOpen}
        title={
          <div className="flex flex-row items-center gap-4">
            Create Organisation
          </div>
        }
      >
        <OrganisationForm
          handleMutateOrganisations={() => {}}
          setCloseDialog={() => setOpen(false)}
        />
      </EntityDialog>
    </Fragment>
  );
};
