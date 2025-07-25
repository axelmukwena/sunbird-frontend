/**
 * Copy text to clipboard
 * @param text
 * @returns {Promise<boolean>}
 */
export const copyTextToClipboard = async (
  text: string | number,
): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text.toString());
    return true;
  } catch {
    return false;
  }
};
