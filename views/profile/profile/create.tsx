import { Plus } from "lucide-react";
import { FC, Fragment, useState } from "react";

import { EntityDialog } from "@/components/dialogs/entity";
import { Button } from "@/components/ui/button";
import { mergeTailwind } from "@/utilities/helpers/tailwind";

import { ProfileForm } from "./form";

interface CreateProfileProps {
  triggerClassName?: string;
  triggerVariant?: "default" | "secondary" | "outline" | "ghost" | "link";
}

export const CreateProfile: FC<CreateProfileProps> = ({
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
        Create Profile
      </Button>
      <EntityDialog
        open={open}
        setOpen={setOpen}
        title={
          <div className="flex flex-row items-center gap-4">Create Profile</div>
        }
      >
        <ProfileForm
          handleMutateProfiles={() => {}}
          setCloseDialog={() => setOpen(false)}
        />
      </EntityDialog>
    </Fragment>
  );
};
