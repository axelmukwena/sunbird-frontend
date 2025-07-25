import { ENVIRONMENT_VARIABLES } from "@/utilities/constants/environment";

import { IndexDatabaseStore, IndexDatabaseStoreKey } from "./enum";

/**
 * Opens the IndexedDatabase.
 * @param {IndexDatabaseStore} store The store to open.
 * @returns {Promise<IDBDatabase>} The IndexedDatabase.
 */
const openDatabase = (store: IndexDatabaseStore): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(
      ENVIRONMENT_VARIABLES.INDEX_DATABSE_NAME,
      ENVIRONMENT_VARIABLES.INDEX_DATABSE_VERSION,
    );

    request.onupgradeneeded = (event): void => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(store, { keyPath: "key" });
    };

    request.onsuccess = (event): void => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event): void => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });

/**
 * Sets an item to IndexedDatabase.
 * @param {IndexDatabaseStore} store The store to set.
 * @param {IndexDatabaseStoreKey} key The key to set.
 * @param {any} value The value to set.
 */
export const setIndexedDatabaseItem = async (
  store: IndexDatabaseStore,
  key: IndexDatabaseStoreKey,
  value: unknown,
): Promise<void> => {
  const db = await openDatabase(store);
  const transaction = db.transaction(store, "readwrite");
  transaction.oncomplete = (): void => {
    db.close();
  };
  transaction.onerror = (): void => {
    console.error({
      error: "Failed to set item in browser IndexedDatabase",
      transactionError: transaction.error,
    });
    db.close();
  };
  const objectStore = transaction.objectStore(store);
  objectStore.put({ key, value });
};

/**
 * Gets an item from IndexedDatabase.
 * @param {IndexDatabaseStore} store The store to get from.
 * @param {IndexDatabaseStoreKey} key The key to get.
 * @returns {Promise<T | null>} The item.
 */
export const getIndexedDatabaseItem = async <T>(
  store: IndexDatabaseStore,
  key: IndexDatabaseStoreKey,
): Promise<T | null> => {
  const db = await openDatabase(store);
  const transaction = db.transaction(store, "readonly");
  const objectStore = transaction.objectStore(store);
  const request = objectStore.get(key);

  return new Promise((resolve, reject) => {
    request.onsuccess = (): void => {
      resolve(request.result ? request.result.value : null);
    };
    request.onerror = (): void => {
      reject(request.error);
    };
  });
};

/**
 * Removes an item from IndexedDatabase.
 * @param {IndexDatabaseStore} store The store to remove from.
 * @param {IndexDatabaseStoreKey} key The key to remove.
 */
export const removeIndexedDatabaseItem = async (
  store: IndexDatabaseStore,
  key: IndexDatabaseStoreKey,
): Promise<void> => {
  const db = await openDatabase(store);
  const transaction = db.transaction(store, "readwrite");
  transaction.oncomplete = (): void => {
    db.close();
  };
  transaction.onerror = (): void => {
    console.error({
      error: "Failed to remove item from browser IndexedDatabase",
      transactionError: transaction.error,
    });
    db.close();
  };
  const objectStore = transaction.objectStore(store);
  objectStore.delete(key);
};

/**
 * Clears the IndexedDatabase.
 * @param {IndexDatabaseStore} store The store to clear.
 */
export const clearIndexedDatabase = async (
  store: IndexDatabaseStore,
): Promise<void> => {
  const db = await openDatabase(store);
  const transaction = db.transaction(store, "readwrite");
  transaction.oncomplete = (): void => {
    db.close();
  };
  transaction.onerror = (): void => {
    console.error({
      error: "Failed to clear browser IndexedDatabase",
      transactionError: transaction.error,
    });
    db.close();
  };
  const objectStore = transaction.objectStore(store);
  objectStore.clear();
};
