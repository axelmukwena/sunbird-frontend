"use client";

import { Plus } from "lucide-react";
import { FC, Fragment, useState } from "react";

import { EntityDialog } from "@/components/dialogs/entity";
import { Button } from "@/components/ui/button";

import { AttendeeForm } from "../one/form";

interface AttendeesTopbarProps {
  meetingId: string;
  handleMutateAttendees: () => void;
}

export const AttendeesTopbar: FC<AttendeesTopbarProps> = ({
  meetingId,
  handleMutateAttendees,
}): React.JSX.Element => {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  return (
    <Fragment>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Attendees</h2>
          <p className="text-muted-foreground text-sm">
            Manage your attendees efficiently with our comprehensive tools.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFormDialogOpen(true)}
        >
          <Plus className="size-4" />
          <span>New</span>
        </Button>
      </div>
      <EntityDialog
        open={isFormDialogOpen}
        setOpen={setIsFormDialogOpen}
        title={
          <div className="flex flex-row items-center gap-4">
            Create Attendee
          </div>
        }
      >
        <AttendeeForm
          meetingId={meetingId}
          handleMutateAttendees={handleMutateAttendees}
          setCloseDialog={() => setIsFormDialogOpen(false)}
        />
      </EntityDialog>
    </Fragment>
  );
};
