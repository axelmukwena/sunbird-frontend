/**
 * This function returns the error message from an error object.
 * @param {unknown} error - the error object
 * @returns {string} - the error message
 */
export const getErrorMessage = (error: unknown): string => {
  if (!error) {
    return "";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
};
