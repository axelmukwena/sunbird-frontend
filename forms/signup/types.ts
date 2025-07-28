import { UseFormReturn } from "react-hook-form";

import { SignupFormSchema } from "./schema";

export interface SignupSchemaUseFormProps {}

export interface SignupFormDefaultValuesProps {}

export interface UseSignupForm {
  hook: UseFormReturn<SignupFormSchema>;
  formErrorMessages: string[];
  resetForm: () => void;
  updateForm: () => void;
}

export interface LoadSignupCreateData {
  values: SignupFormSchema;
}
