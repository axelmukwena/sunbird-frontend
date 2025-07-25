/**
 * Pluralize a word
 * @param {string} word - the word to pluralize
 * @param {number} count - the number of items
 * @returns {string} - the pluralized word
 */
export const pluralize = (word: string, count: number): string => {
  if (count >= 1 && count < 2) {
    return word;
  }

  return word.endsWith("y") && !/[aeiou]y/i.test(word)
    ? `${word.slice(0, word.length - 1)}ies`
    : `${word}s`;
};

/**
 * Get a padded number
 * @param {number} num - The number to convert.
 * @returns {string} - The converted string.
 */
export const getPaddedNumber = (num: number, pad = 13): string =>
  num.toString().padStart(pad, "0");

/**
 * Converts a string with space, dash or underscore to title case.
 * @param {string} input - The string to convert.
 * @returns {string} - The converted string.
 * @example capitalize("hello_world") => "Hello World"
 */
export const capitalize = (input: string): string =>
  input
    ?.trim()
    .replace(/[_-]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ") || "";

/**
 * Get multiline text
 * @param {string} text - The text to convert.
 * @returns {string[]} - The converted string.
 */
export const getMultilineText = (text?: string | null): string[] =>
  text ? text.split("\n") : [];

/**
 * This function takes a name as input and returns the initials of the name.
 * @param {string} name - The name from which to extract initials.
 * @returns {string} - The initials of the name.
 */
export const getUserInitials = (
  firstName: string,
  lastName: string,
): string => {
  const initials = `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  return initials.toUpperCase();
};

/**
 * This function takes a name as input and returns the initials of the name.
 * @param {string} name - The name from which to extract initials.
 * @returns {string} - The initials of the name.
 */
export const getInitials = (name: string): string => {
  const names = name.split(" ");
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  const initials = names
    .map((n) => n.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
  return initials;
};
