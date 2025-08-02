"use client";

import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";

import { AttendeeClientService } from "@/api/services/weaver/attendees/client.service";
import {
  Attendee,
  AttendeeCreateGuestClient,
  AttendeeFeedbackCreateClient,
  AttendeeUpdateGuestClient,
} from "@/api/services/weaver/attendees/types";
import { getErrorMessage } from "@/utilities/helpers/errors";

const service = new AttendeeClientService();

interface UseGuestAttendeeProps {
  organisationId?: string | null;
  deviceFingerprint?: string | null;
}

interface FunctionReturn {
  attendee?: Attendee | null;
  success: boolean;
  error?: string | null;
}

export interface UseGuestAttendeeReturn {
  attendee: Attendee | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  checkin: (
    organisationId: string,
    data: AttendeeCreateGuestClient,
  ) => Promise<FunctionReturn>;
  getByFingerprint: (
    organisationId: string,
    deviceFingerprint: string,
  ) => Promise<FunctionReturn>;
  updateByFingerprint: (
    organisationId: string,
    deviceFingerprint: string,
    data: AttendeeUpdateGuestClient,
  ) => Promise<FunctionReturn>;
  cancelByFingerprint: (
    organisationId: string,
    deviceFingerprint: string,
  ) => Promise<FunctionReturn>;
  submitFeedback: (
    organisationId: string,
    deviceFingerprint: string,
    data: AttendeeFeedbackCreateClient,
  ) => Promise<FunctionReturn>;

  // Utility
  mutateAttendee: () => void;
  reset: () => void;
}

/**
 * Generate SWR key for guest attendee
 */
const getGuestAttendeeSwrKey = (
  organisationId?: string | null,
  deviceFingerprint?: string | null,
): string | null => {
  if (!organisationId || !deviceFingerprint) return null;
  return `guest-attendee-${organisationId}-${deviceFingerprint}`;
};

/**
 * React hook for managing guest attendee operations with SWR
 */
export const useGuestAttendee = ({
  organisationId,
  deviceFingerprint,
}: UseGuestAttendeeProps = {}): UseGuestAttendeeReturn => {
  const { mutate } = useSWRConfig();

  // Fetcher function for SWR
  const fetcher = async (): Promise<Attendee | null> => {
    if (!organisationId || !deviceFingerprint) return null;

    const response = await service.getGuestByFingerprint({
      organisation_id: organisationId,
      device_fingerprint: deviceFingerprint,
    });

    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  };

  const swrKey = getGuestAttendeeSwrKey(organisationId, deviceFingerprint);

  const { data, error, isLoading } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    shouldRetryOnError: false,
  });

  // Helper to invalidate/update cache for a specific key
  const mutateAttendeeCache = useCallback(
    (
      targetOrgId: string,
      targetFingerprint: string,
      newData?: Attendee | null,
    ) => {
      const targetKey = getGuestAttendeeSwrKey(targetOrgId, targetFingerprint);
      if (targetKey) {
        mutate(targetKey, newData, { revalidate: newData === undefined });
      }
    },
    [mutate],
  );

  const checkin = useCallback(
    async (
      organisationId: string,
      data: AttendeeCreateGuestClient,
    ): Promise<FunctionReturn> => {
      try {
        const response = await service.guestCheckin(organisationId, data);
        if (response.success && response.data) {
          // Update cache with new attendee data
          mutateAttendeeCache(
            organisationId,
            data.checkin.device_fingerprint,
            response.data,
          );
          return {
            attendee: response.data,
            success: true,
            error: null,
          };
        }
        return {
          attendee: null,
          success: false,
          error: response.message || "Failed to check in guest attendee.",
        };
      } catch (err) {
        return {
          attendee: null,
          success: false,
          error:
            getErrorMessage(err) ||
            "An unexpected error occurred during check-in.",
        };
      }
    },
    [mutateAttendeeCache],
  );

  const getByFingerprint = useCallback(
    async (
      organisationId: string,
      deviceFingerprint: string,
    ): Promise<FunctionReturn> => {
      try {
        const response = await service.getGuestByFingerprint({
          organisation_id: organisationId,
          device_fingerprint: deviceFingerprint,
        });

        if (response.success && response.data) {
          // Update cache with fetched data
          mutateAttendeeCache(organisationId, deviceFingerprint, response.data);
          return {
            attendee: response.data,
            success: true,
            error: null,
          };
        }
        return {
          attendee: null,
          success: false,
          error: response.message || "Failed to fetch guest attendee.",
        };
      } catch (err) {
        return {
          attendee: null,
          success: false,
          error:
            getErrorMessage(err) ||
            "An unexpected error occurred while fetching guest attendee.",
        };
      }
    },
    [mutateAttendeeCache],
  );

  const updateByFingerprint = useCallback(
    async (
      organisationId: string,
      deviceFingerprint: string,
      data: AttendeeUpdateGuestClient,
    ): Promise<FunctionReturn> => {
      try {
        const response = await service.updateGuestByFingerprint({
          organisation_id: organisationId,
          device_fingerprint: deviceFingerprint,
          data,
        });

        if (response.success && response.data) {
          // Update cache with updated data
          mutateAttendeeCache(organisationId, deviceFingerprint, response.data);
          return {
            attendee: response.data,
            success: true,
            error: null,
          };
        }
        return {
          attendee: null,
          success: false,
          error: response.message || "Failed to update guest attendee.",
        };
      } catch (err) {
        return {
          attendee: null,
          success: false,
          error:
            getErrorMessage(err) ||
            "An unexpected error occurred while updating guest attendee.",
        };
      }
    },
    [mutateAttendeeCache],
  );

  const cancelByFingerprint = useCallback(
    async (
      organisationId: string,
      deviceFingerprint: string,
    ): Promise<FunctionReturn> => {
      try {
        const response = await service.cancelGuestByFingerprint({
          organisation_id: organisationId,
          device_fingerprint: deviceFingerprint,
        });

        if (response.success) {
          // Remove from cache or set to null after cancellation
          mutateAttendeeCache(organisationId, deviceFingerprint, null);
          return {
            attendee: null,
            success: true,
            error: null,
          };
        }
        return {
          attendee: null,
          success: false,
          error: response.message || "Failed to cancel guest attendee.",
        };
      } catch (err) {
        return {
          attendee: null,
          success: false,
          error:
            getErrorMessage(err) ||
            "An unexpected error occurred while cancelling guest attendee.",
        };
      }
    },
    [mutateAttendeeCache],
  );

  const submitFeedback = useCallback(
    async (
      organisationId: string,
      deviceFingerprint: string,
      data: AttendeeFeedbackCreateClient,
    ): Promise<FunctionReturn> => {
      try {
        const response = await service.submitGuestFeedback(
          organisationId,
          deviceFingerprint,
          data,
        );

        if (response.success) {
          // Revalidate cache after feedback submission
          mutateAttendeeCache(organisationId, deviceFingerprint);
          return {
            attendee: null,
            success: true,
            error: null,
          };
        }
        return {
          attendee: null,
          success: false,
          error: response.message || "Failed to submit feedback.",
        };
      } catch (err) {
        return {
          attendee: null,
          success: false,
          error:
            getErrorMessage(err) ||
            "An unexpected error occurred while submitting feedback.",
        };
      }
    },
    [mutateAttendeeCache],
  );

  const mutateAttendee = useCallback(() => {
    if (organisationId && deviceFingerprint) {
      mutateAttendeeCache(organisationId, deviceFingerprint);
    }
  }, [organisationId, deviceFingerprint, mutateAttendeeCache]);

  const reset = useCallback(() => {
    if (organisationId && deviceFingerprint) {
      mutateAttendeeCache(organisationId, deviceFingerprint, null);
    }
  }, [organisationId, deviceFingerprint, mutateAttendeeCache]);

  return {
    attendee: data || null,
    isLoading,
    error: getErrorMessage(error),
    checkin,
    getByFingerprint,
    updateByFingerprint,
    cancelByFingerprint,
    submitFeedback,
    mutateAttendee,
    reset,
  };
};
