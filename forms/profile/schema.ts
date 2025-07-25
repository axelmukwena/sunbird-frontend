import { z } from "zod";

import { Language } from "@/api/services/weaver/types/general";

import { PASSWORD_SCHEMA } from "../password";
import { PHONE_NUMBER_OPTIONAL_SCHEMA } from "../phonenumber";
import { URL_OPTIONAL_FORM_SCHEMA } from "../url";

export const PROFILE_UPDATE_SCHEMA = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: PHONE_NUMBER_OPTIONAL_SCHEMA,
  avatar_url: URL_OPTIONAL_FORM_SCHEMA,
  organisation_name: z.string().nullable().optional(),
  occupation: z.string().nullable().optional(),
  language: z.enum(Language).nullable().optional(),
});

export const PASSWORD_CHANGE_UPDATE_SCHEMA = z.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: PASSWORD_SCHEMA,
});

export const PASSWORD_RESET_REQUEST_SCHEMA = z.object({
  email: z.string().email("Invalid email format"),
});

export const PASSWORD_RESET_CONFIRM_SCHEMA = z.object({
  email: z.string().email("Invalid email format"),
  code: z.number().int("Code must be a valid integer"),
  new_password: PASSWORD_SCHEMA,
});

export const EMAIL_VERIFICATION_REQUEST_SCHEMA = z.object({
  email: z.string().email("Invalid email format"),
});

export const EMAIL_VERIFICATION_CONFIRM_SCHEMA = z.object({
  code: z.number().int("Code must be a valid integer"),
  email: z.string().email("Invalid email format"),
});

// Type exports
export type ProfileUpdate = z.infer<typeof PROFILE_UPDATE_SCHEMA>;
export type PasswordChangeUpdate = z.infer<
  typeof PASSWORD_CHANGE_UPDATE_SCHEMA
>;
export type PasswordResetRequest = z.infer<
  typeof PASSWORD_RESET_REQUEST_SCHEMA
>;
export type PasswordResetConfirm = z.infer<
  typeof PASSWORD_RESET_CONFIRM_SCHEMA
>;
export type EmailVerificationRequest = z.infer<
  typeof EMAIL_VERIFICATION_REQUEST_SCHEMA
>;
export type EmailVerificationConfirm = z.infer<
  typeof EMAIL_VERIFICATION_CONFIRM_SCHEMA
>;
