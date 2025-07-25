import { z } from "zod";

export const PASSWORD_SCHEMA = z
  .string()
  .min(1, "Password is required")
  .refine(
    (value) => value.length >= 8,
    "Password must be at least 8 characters",
  )
  .refine(
    (value) => /[0-9]/.test(value),
    "Password must contain at least one number",
  )
  .refine(
    (value) => /[A-Z]/.test(value),
    "Password must contain at least one uppercase letter",
  )
  .refine(
    (value) => /[a-z]/.test(value),
    "Password must contain at least one lowercase letter",
  )
  .refine(
    (value) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value),
    "Password must contain at least one special character",
  );

export type PasswordSchema = z.infer<typeof PASSWORD_SCHEMA>;
