import { FormEvent, KeyboardEvent } from "react";
import { FieldErrors, UseFormReturn } from "react-hook-form";

import { EmailVerificationConfirmFormSchema } from "./schema";

export interface EmailVerificationConfirmFormSchemaSchemaUseFormProps {}

export interface EmailVerificationConfirmFormDefaultValuesProps {}

export interface UseEmailVerificationConfirmForm {
  hook: UseFormReturn<EmailVerificationConfirmFormSchema>;
  formErrorMessages: string[];
  errors: FieldErrors<EmailVerificationConfirmFormSchema>;
  resetForm: () => void;
  updateForm: () => void;
  handleOnSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleOnEnter: (e: KeyboardEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  handleResendCode: () => Promise<void>;
  isResending: boolean;
}

export interface LoadEmailVerificationConfirmCreateData {
  values: EmailVerificationConfirmFormSchema;
}
