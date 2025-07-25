import { LocalStorageKey } from "./enum";

/**
 * Sets an item to local storage.
 * @param {LocalStorageKey} key The key to set.
 * @param {any} value The value to set.
 */
export const setLocalStorageItem = (
  key: LocalStorageKey,
  value: unknown,
): void => {
  if (typeof window !== "undefined") {
    const stringValue = JSON.stringify(value);
    window.localStorage.setItem(key, stringValue);
  }
};

/**
 * Gets an item from local storage.
 * @param {LocalStorageKey} key The key to get.
 * @returns {T | null} The item.
 */
export const getLocalStorageItem = <T>(key: LocalStorageKey): T | null => {
  if (typeof window !== "undefined") {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

/**
 * Removes an item from local storage.
 * @param {LocalStorageKey} key The key to remove.
 */
export const removeLocalStorageItem = (key: LocalStorageKey): void => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
};

/**
 * Clears the local storage.
 */
export const isLocalStorageAvailable = (): boolean => {
  const testKey = "test";
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
