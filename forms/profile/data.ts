import { EmailVerificationConfirm } from "@/api/services/weaver/profile/types";

import { LoadEmailVerificationConfirmCreateData } from "./types";

/**
 * Get the data to create an email verification confirmation request
 * @param {LoadEmailVerificationConfirmCreateData} data - The data
 * @returns {SignupRequestClient} - The data
 */
export const getSignupCreateData = ({
  values,
}: LoadEmailVerificationConfirmCreateData): EmailVerificationConfirm => {
  const data: EmailVerificationConfirm = {
    email: values.email,
    code: values.code,
  };
  return data;
};
