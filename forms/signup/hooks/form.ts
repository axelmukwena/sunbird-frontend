import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getFormErrorMessages } from "@/forms/general";

import { signupFormDefaultValues } from "../defaults";
import { SIGNUP_FORM_SCHEMA, SignupFormSchema } from "../schema";
import { UseSignupForm } from "../types";

/**
 * Hook to handle the signup form
 * @returns {UseSignupForm} - the signup form state
 */
export const useSignupForm = (): UseSignupForm => {
  const hook = useForm<SignupFormSchema>({
    resolver: zodResolver(SIGNUP_FORM_SCHEMA),
    mode: "onChange",
    defaultValues: signupFormDefaultValues(),
  });

  const formErrorMessages = getFormErrorMessages(hook.formState.errors);

  const resetForm = (): void => {
    hook.reset(signupFormDefaultValues());
  };

  const updateForm = (): void => {
    hook.reset(signupFormDefaultValues());
  };

  return { hook, formErrorMessages, resetForm, updateForm };
};
