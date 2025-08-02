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

export interface UseGuestAttendeeReturn {
  attendee: Attendee | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  checkin: (
    organisationId: string,
    data: AttendeeCreateGuestClient,
  ) => Promise<boolean>;
  getByFingerprint: (
    organisationId: string,
    deviceFingerprint: string,
  ) => Promise<boolean>;
  updateByFingerprint: (
    organisationId: string,
    deviceFingerprint: string,
    data: AttendeeUpdateGuestClient,
  ) => Promise<boolean>;
  cancelByFingerprint: (
    organisationId: string,
    deviceFingerprint: string,
  ) => Promise<boolean>;
  submitFeedback: (
    organisationId: string,
    deviceFingerprint: string,
    data: AttendeeFeedbackCreateClient,
  ) => Promise<boolean>;

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
    ): Promise<boolean> => {
      try {
        const response = await service.guestCheckin(organisationId, data);

        if (response.success && response.data) {
          // Update cache with new attendee data
          mutateAttendeeCache(
            organisationId,
            data.checkin.device_fingerprint,
            response.data,
          );
          return true;
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        console.error("Guest checkin error:", err);
        return false;
      }
    },
    [mutateAttendeeCache],
  );

  const getByFingerprint = useCallback(
    async (
      organisationId: string,
      deviceFingerprint: string,
    ): Promise<boolean> => {
      try {
        const response = await service.getGuestByFingerprint({
          organisation_id: organisationId,
          device_fingerprint: deviceFingerprint,
        });

        if (response.success && response.data) {
          // Update cache with fetched data
          mutateAttendeeCache(organisationId, deviceFingerprint, response.data);
          return true;
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        console.error("Get guest by fingerprint error:", err);
        return false;
      }
    },
    [mutateAttendeeCache],
  );

  const updateByFingerprint = useCallback(
    async (
      organisationId: string,
      deviceFingerprint: string,
      data: AttendeeUpdateGuestClient,
    ): Promise<boolean> => {
      try {
        const response = await service.updateGuestByFingerprint({
          organisation_id: organisationId,
          device_fingerprint: deviceFingerprint,
          data,
        });

        if (response.success && response.data) {
          // Update cache with updated data
          mutateAttendeeCache(organisationId, deviceFingerprint, response.data);
          return true;
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        console.error("Update guest by fingerprint error:", err);
        return false;
      }
    },
    [mutateAttendeeCache],
  );

  const cancelByFingerprint = useCallback(
    async (
      organisationId: string,
      deviceFingerprint: string,
    ): Promise<boolean> => {
      try {
        const response = await service.cancelGuestByFingerprint({
          organisation_id: organisationId,
          device_fingerprint: deviceFingerprint,
        });

        if (response.success) {
          // Remove from cache or set to null after cancellation
          mutateAttendeeCache(organisationId, deviceFingerprint, null);
          return true;
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        console.error("Cancel guest by fingerprint error:", err);
        return false;
      }
    },
    [mutateAttendeeCache],
  );

  const submitFeedback = useCallback(
    async (
      organisationId: string,
      deviceFingerprint: string,
      data: AttendeeFeedbackCreateClient,
    ): Promise<boolean> => {
      try {
        const response = await service.submitGuestFeedback(
          organisationId,
          deviceFingerprint,
          data,
        );

        if (response.success) {
          // Revalidate cache after feedback submission
          mutateAttendeeCache(organisationId, deviceFingerprint);
          return true;
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        console.error("Submit guest feedback error:", err);
        return false;
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
