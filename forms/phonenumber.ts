import { z } from "zod";

import { isPhoneNumberValid } from "@/utilities/helpers/phonenumber";

export const PHONE_NUMBER_REQUIRED_SCHEMA = z
  .string()
  .min(1, "Phone number is required")
  .refine(
    (value) => isPhoneNumberValid(value),
    "Phone number is in an incorrect E.164 format. E.g, +264 81 603 5678",
  );

export const PHONE_NUMBER_OPTIONAL_SCHEMA = z
  .string()
  .optional()
  .refine(
    (value) => !value?.trim() || isPhoneNumberValid(value),
    "Phone number is in an incorrect E.164 format. E.g, +264 81 603 5678",
  );

export type PhoneNumberRequiredSchema = z.infer<
  typeof PHONE_NUMBER_REQUIRED_SCHEMA
>;
export type PhoneNumberOptionalSchema = z.infer<
  typeof PHONE_NUMBER_OPTIONAL_SCHEMA
>;
