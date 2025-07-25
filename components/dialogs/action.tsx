import { Fragment, useEffect, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Spinner } from "../loaders/spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input"; // Import Input component

export type ActionType = "archive" | "activate" | "delete";

interface ActionAlertDialogContent {
  description: string;
  buttonText: string;
  buttonVariant: "destructive" | "default" | "secondary";
}

interface ActionAlertDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  what: string;
  entityName: string;
  actionType: ActionType;
  onConfirm: () => void;
  trigger?: React.ReactNode;
  isProcessing?: boolean;
}

export const ActionAlertDialog: React.FC<ActionAlertDialogProps> = ({
  open,
  setOpen,
  what,
  entityName,
  actionType,
  onConfirm,
  trigger,
  isProcessing = false,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [confirmText, setConfirmText] = useState(""); // State for confirmation text

  // Focus management
  useEffect(() => {
    if (open && cancelRef.current) {
      // Small timeout to ensure the dialog is fully rendered
      setTimeout(() => {
        cancelRef.current?.focus();
      }, 50);
    }
  }, [open]);

  // Reset confirm text when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setConfirmText("");
    }
  }, [open]);

  const handleConfirm = (): void => {
    onConfirm();
    setOpen(false);
  };

  // Configure dialog based on action type
  const getDialogConfig = (): ActionAlertDialogContent => {
    switch (actionType) {
      case "archive":
        return {
          description: `This action will archive the ${what} (${entityName}) and remove it from your view. You can restore it later if needed.`,
          buttonText: isProcessing ? "Archiving" : "Archive",
          buttonVariant: "destructive" as const,
        };
      case "activate":
        return {
          description: `This action will activate the ${what} (${entityName}) and make it visible to users. You can archive it later if needed.`,
          buttonText: isProcessing ? "Activating" : "Activate",
          buttonVariant: "default" as const,
        };
      case "delete":
        return {
          description: `This action will permanently delete the ${what} (${entityName}). This action cannot be undone.`,
          buttonText: isProcessing ? "Deleting" : "Delete",
          buttonVariant: "destructive" as const,
        };
      default:
        return {
          description: `Are you sure you want to perform this action on ${what} (${entityName})?`,
          buttonText: isProcessing ? "Processing" : "Confirm",
          buttonVariant: "default" as const,
        };
    }
  };

  const { description, buttonText, buttonVariant } = getDialogConfig();

  // Check if delete button should be disabled (only applies to delete action)
  const isDeleteButtonDisabled =
    actionType === "delete" && (confirmText !== entityName || isProcessing);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          {actionType === "delete" && (
            <div className="mt-4">
              <p className="text-sm mb-2">
                Please type <span className="font-medium">{entityName}</span> to
                confirm:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={`Type ${entityName} to confirm`}
                className="mt-1"
                autoComplete="off"
                aria-label="Confirmation text"
              />
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              ref={cancelRef}
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            onClick={handleConfirm}
            variant={buttonVariant}
            className="w-40"
            disabled={
              actionType === "delete" ? isDeleteButtonDisabled : isProcessing
            }
          >
            {isProcessing ? (
              <Fragment>
                <Spinner className="mr-2 h-4 w-4" /> {buttonText}
              </Fragment>
            ) : (
              buttonText
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
