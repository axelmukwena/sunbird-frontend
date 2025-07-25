import { DefaultValues } from "react-hook-form";

import { LoginFormSchema } from "./schema";

/**
 * Get default values for oauth login form
 * @returns {DefaultValues<OauthLoginSchema>} - default values for oauth login form
 */
export const loginFormDefaultValues = (): DefaultValues<LoginFormSchema> => ({
  email: "",
  password: "",
});
