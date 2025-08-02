"use client";

import { useState } from "react";

import { Attendee } from "@/api/services/weaver/attendees/types";
import { useGuestAttendee } from "@/hooks/attendees/guest";
import { notify } from "@/utilities/helpers/toaster";

import {
  getGuestAttendeeCreateData,
  getGuestAttendeeUpdateData,
} from "../data";
import { AttendeeFormSchema } from "../schema";
import { UseAttendeeForm } from "../types";

interface UseGuestAttendeeCreateUpdateProps {
  attendeeForm: UseAttendeeForm;
  organisationId: string;
  attendee?: Attendee | null;
  onSuccess?: (attendee: Attendee) => void;
  onError?: (error: string) => void;
}

interface UseGuestAttendeeCreateUpdate {
  isSubmitting: boolean;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleCreateGuest: (values: AttendeeFormSchema) => Promise<boolean>;
  handleUpdateGuest: (values: AttendeeFormSchema) => Promise<boolean>;
}

/**
 * Hook to handle guest attendee creation and updates
 * @param {UseGuestAttendeeCreateUpdateProps} props - form hook, organisation ID, and callback functions
 * @returns {UseGuestAttendeeCreateUpdate} hook - object containing functions and states for guest attendee operations
 */
export const useGuestAttendeeCreateUpdate = ({
  attendeeForm,
  organisationId,
  attendee,
  onSuccess,
  onError,
}: UseGuestAttendeeCreateUpdateProps): UseGuestAttendeeCreateUpdate => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    hook: {
      handleSubmit,
      formState: { isValid },
    },
    updateForm,
  } = attendeeForm;

  const { checkin, updateByFingerprint } = useGuestAttendee();

  const isEditMode = Boolean(attendee);

  /**
   * Function to handle creating a new guest attendee
   * @param {AttendeeFormSchema} values - form values
   * @returns {Promise<boolean>} - success status
   */
  const handleCreateGuest = async (
    values: AttendeeFormSchema,
  ): Promise<boolean> => {
    try {
      const data = getGuestAttendeeCreateData({ values });
      const success = await checkin(organisationId, data);

      if (success) {
        notify({
          message: "Check-in successful! Welcome to the meeting.",
          type: "success",
        });

        // Note: We don't have the returned attendee data from the boolean response
        // If you need the attendee data, you might want to modify the hook to return it
        if (onSuccess) {
          // You might want to fetch the attendee data here or modify the API response
          onSuccess({} as Attendee); // Placeholder - adjust based on your needs
        }

        return true;
      } else {
        const errorMessage = "Failed to check in. Please try again.";
        notify({ message: errorMessage, type: "error" });
        if (onError) {
          onError(errorMessage);
        }
        return false;
      }
    } catch (error) {
      const errorMessage = "An unexpected error occurred during check-in.";
      console.error("Guest checkin error:", error);
      notify({ message: errorMessage, type: "error" });
      if (onError) {
        onError(errorMessage);
      }
      return false;
    }
  };

  /**
   * Function to handle updating an existing guest attendee
   * @param {AttendeeFormSchema} values - form values
   * @returns {Promise<boolean>} - success status
   */
  const handleUpdateGuest = async (
    values: AttendeeFormSchema,
  ): Promise<boolean> => {
    if (!attendee?.checkin?.device_fingerprint) {
      const errorMessage = "Cannot update: Device fingerprint not found.";
      notify({ type: "error", message: errorMessage });
      if (onError) {
        onError(errorMessage);
      }
      return false;
    }

    try {
      const data = getGuestAttendeeUpdateData({ values });
      const success = await updateByFingerprint(
        organisationId,
        attendee.checkin.device_fingerprint,
        data,
      );

      if (success) {
        notify({
          message: "Guest information updated successfully.",
          type: "success",
        });

        // Update form with new values
        updateForm(attendee);

        if (onSuccess) {
          onSuccess(attendee);
        }

        return true;
      } else {
        const errorMessage =
          "Failed to update guest information. Please try again.";
        notify({ message: errorMessage, type: "error" });
        if (onError) {
          onError(errorMessage);
        }
        return false;
      }
    } catch (error) {
      const errorMessage = "An unexpected error occurred while updating.";
      console.error("Guest update error:", error);
      notify({ message: errorMessage, type: "error" });
      if (onError) {
        onError(errorMessage);
      }
      return false;
    }
  };

  /**
   * Main submit handler that routes to create or update based on mode
   * @param {AttendeeFormSchema} values - form values
   * @returns {Promise<void>}
   */
  const handleSubmitGuest = async (
    values: AttendeeFormSchema,
  ): Promise<void> => {
    if (!isValid) {
      const errorMessage = "Please check all required fields and try again.";
      notify({
        type: "error",
        message: errorMessage,
      });
      if (onError) {
        onError(errorMessage);
      }
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        await handleUpdateGuest(values);
      } else {
        await handleCreateGuest(values);
      }
    } catch (error) {
      const errorMessage = `Failed to ${isEditMode ? "update" : "check in"} guest. Please try again.`;
      notify({
        type: "error",
        message: errorMessage,
      });
      console.error(`Guest ${isEditMode ? "update" : "create"} error:`, error);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.stopPropagation();
    e.preventDefault();
    await handleSubmit(handleSubmitGuest)();
  };

  return {
    isSubmitting,
    handleOnSubmit,
    handleCreateGuest,
    handleUpdateGuest,
  };
};
