import { UseFormReturn } from "react-hook-form";

import { LoginFormSchema } from "./schema";

export interface LoginSchemaUseFormProps {}

export interface LoginFormDefaultValuesProps {}

export interface UseLoginForm {
  hook: UseFormReturn<LoginFormSchema>;
  formErrorMessages: string[];
  resetForm: () => void;
  updateForm: () => void;
}

export interface LoadLoginCreateData {
  values: LoginFormSchema;
}
