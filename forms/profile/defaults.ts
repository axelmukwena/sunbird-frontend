import { DefaultValues } from "react-hook-form";

import { EmailVerificationConfirmFormSchema } from "./schema";

interface EmailVerificationConfirmDefaultValuesProps {
  email: string;
}

/**
 * Get default values for email verification confirm form
 * @returns {DefaultValues<OauthSignupSchema>} - default values
 */
export const emailVerificationConfirmDefaultValues = ({
  email,
}: EmailVerificationConfirmDefaultValuesProps): DefaultValues<EmailVerificationConfirmFormSchema> =>
  ({
    email,
    code: "",
  }) as DefaultValues<EmailVerificationConfirmFormSchema>;
