import { v4 as uuidv4 } from "uuid";

interface CreateAttendeeScanSessionKeyProps {
  device_fingerprint: string;
  meeting_id: string;
  organisation_id: string;
}

/**
 * Creates a unique session key for an attendee scan session.
 * The key is based on the device fingerprint, meeting ID, and organisation ID.
 * @param {CreateAttendeeScanSessionKeyProps} props - The properties to create the session key.
 * @returns {string} - The unique session key.
 */
export const createAttendeeScanSessionKey = ({
  device_fingerprint,
  meeting_id,
  organisation_id,
}: CreateAttendeeScanSessionKeyProps): string =>
  `scan-attendee-session-${device_fingerprint}-${meeting_id}-${organisation_id}`;

/**
 * Checks if an error is due to sessionStorage quota being exceeded.
 * @param {any} error - The error to check.
 * @returns {boolean} - True if it's a quota exceeded error.
 */
const isQuotaExceeded = (error: unknown): boolean =>
  error instanceof DOMException &&
  (error.name === "QuotaExceededError" ||
    error.name === "NS_ERROR_DOM_QUOTA_REACHED");

/**
 * Clears one old session item whose key starts with the given prefix.
 * @param {string} prefix - The prefix to search for.
 */
const clearOldSessionData = (prefix: string): void => {
  for (let i = 0; i < sessionStorage.length; i += 1) {
    const key = sessionStorage.key(i);
    if (key && key.startsWith(prefix)) {
      sessionStorage.removeItem(key);
      break; // Remove one and exit
    }
  }
};

/**
 * Writes the session data.
 * If storage is full, attempts to remove one old session entry before retrying.
 * @param {string} key - The key under which to store the session id.
 * @returns {string} - The newly generated session id.
 */
export const writeSessionData = (key: string): string => {
  const sessionId = uuidv4().replace(/-/g, "");
  try {
    sessionStorage.setItem(key, sessionId);
  } catch (error) {
    if (isQuotaExceeded(error)) {
      clearOldSessionData("scan-session-");
      sessionStorage.setItem(key, sessionId);
    } else {
      throw error;
    }
  }
  return sessionId;
};

/**
 * Reads the session data.
 * @param {string} key - The key to read from.
 * @returns {string | null} - The stored session id or null.
 */
export const readSessionData = (key: string): string | null =>
  sessionStorage.getItem(key);

/**
 * Reads existing session data or writes a new session id if none exists.
 * @param {string} key - The key for session storage.
 * @returns {string} - The session id.
 */
export const readOrWriteSessionData = (key: string): string => {
  const sessionId = readSessionData(key);
  if (sessionId) {
    return sessionId;
  }
  return writeSessionData(key);
};
