import { DatabaseStatus } from "@/api/services/weaver/types/general";

/**
 * Check if the existing record is active.
 * @param {DatabaseStatus | null} status The database status.
 * @returns {boolean} Whether the record is active.
 */
export const isRecordActive = (status?: DatabaseStatus | null): boolean => {
  if (!status) {
    return true;
  }
  return status === DatabaseStatus.ACTIVE;
};
