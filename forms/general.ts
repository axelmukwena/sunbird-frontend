import { FieldErrors } from "react-hook-form";

/**
 * Handle on key down form
 * @param e React.KeyboardEvent<HTMLFormElement>
 * @returns void
 */
export const handleOnKeyDownForm = (
  e: React.KeyboardEvent<HTMLFormElement>,
): void => {
  if (e.key === "Enter") {
    e.stopPropagation();
    e.preventDefault();
  }
};

/**
 * Extracts error messages from react-hook-form FieldErrors based on the schema keys.
 *
 * @param errors - The FieldErrors object from react-hook-form.
 * @param schema - The Yup schema to filter the relevant keys.
 * @returns An array of error messages as strings.
 */
export const getFormErrorMessages = (errors: FieldErrors): string[] => {
  const messages: string[] = [];
  const iterateErrors = (fieldErrors: FieldErrors): void => {
    if (fieldErrors && typeof fieldErrors === "object") {
      Object.values(fieldErrors).forEach((error) => {
        if (error) {
          if (typeof error.message === "string") {
            messages.push(error.message);
          }
          if (typeof error === "object" && error !== null) {
            iterateErrors(error as FieldErrors);
          }
        }
      });
    }
  };
  iterateErrors(errors);
  const extraMessage =
    "One or more form fields are invalid. Please check all form fields and try again.";
  return messages.length ? [extraMessage, ...messages] : [];
};
