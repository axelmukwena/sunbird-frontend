import { DatabaseStatus } from "@/api/services/weaver/types/general";
import { UserStatus } from "@/api/services/weaver/users/types";

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

/**
 * Check if the user is active.
 * @param {UserStatus | null} status The user status.
 * @returns {boolean} Whether the user is active.
 */
export const isUserActive = (status?: UserStatus | null): boolean => {
  if (!status) {
    return true;
  }
  return status === UserStatus.ACTIVE;
};
