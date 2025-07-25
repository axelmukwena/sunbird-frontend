import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";

const phonenumber: PhoneNumberUtil = PhoneNumberUtil.getInstance();

/**
 * Validates a phone number string based on E.164 format.
 * @param value - The phone number string to validate.
 * @returns A boolean indicating whether the phone number is valid.
 */
export const isPhoneNumberValid = (value?: string | null): boolean => {
  try {
    const parsedNumber = phonenumber.parse(value || undefined);
    if (phonenumber.isValidNumber(parsedNumber)) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};

/**
 * Formats a phone number string to the international format.
 * @param value - The phone number string to format.
 * @returns The formatted phone number string in international format.
 */
export const getInternationalPhoneNumber = (
  value?: string | null,
): string | null => {
  try {
    const parsedNumber = phonenumber.parse(value || undefined);
    const isValid = phonenumber.isValidNumber(parsedNumber);
    if (!isValid) {
      return null;
    }
    return phonenumber.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL);
  } catch {
    return null;
  }
};
