import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getFormErrorMessages } from "@/forms/general";

import { loginFormDefaultValues } from "../defaults";
import { LOGIN_FORM_SCHEMA, LoginFormSchema } from "../schema";
import { UseLoginForm } from "../types";

/**
 * Hook to handle the login form
 * @returns {UseLoginForm} - the login form state
 */
export const useLoginForm = (): UseLoginForm => {
  const hook = useForm<LoginFormSchema>({
    resolver: zodResolver(LOGIN_FORM_SCHEMA),
    mode: "onChange",
    defaultValues: loginFormDefaultValues(),
  });

  const formErrorMessages = getFormErrorMessages(hook.formState.errors);

  const resetForm = (): void => {
    hook.reset(loginFormDefaultValues());
  };

  const updateForm = (): void => {
    hook.reset(loginFormDefaultValues());
  };

  return { hook, formErrorMessages, resetForm, updateForm };
};
