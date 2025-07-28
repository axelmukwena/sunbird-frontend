import { MembershipPermission } from "../memberships/types";
import { OauthClient } from "../oauth/types";
import { ErrorApiResponse, Language } from "../types/general";
import { User } from "../users/types";

export enum ApiActionProfile {
  GET_PROFILE = "",
  UPDATE_PROFILE = "",
  CHANGE_PASSWORD = "password",
  REQUEST_PASSWORD_RESET = "password/reset/request",
  CONFIRM_PASSWORD_RESET = "password/reset/confirm",
  REQUEST_EMAIL_VERIFICATION = "email/verification/request",
  CONFIRM_EMAIL_VERIFICATION = "email/verification/confirm",
  MY_ATTENDANCES = "attendances",
  MY_ATTENDANCE = "attendances",
  MY_ATTENDANCE_STATISTICS = "attendances/statistics",
}

// Request interfaces
export interface ProfileUpdate {
  first_name: string;
  last_name: string;
  phone_number: string | null;
  avatar_url: string | null;
  organisation_name: string | null;
  occupation: string | null;
  language: Language | null;
}

export interface PasswordChangeUpdate {
  current_password: string;
  new_password: string;
}

export interface PasswordResetRequestClient {
  email: string;
}
export interface PasswordResetRequest
  extends OauthClient,
    PasswordResetRequestClient {}

export interface PasswordResetConfirmClient {
  email: string;
  code: string;
  new_password: string;
}
export interface PasswordResetConfirm
  extends OauthClient,
    PasswordResetConfirmClient {}

export interface EmailVerificationRequestClient {
  email: string;
}
export interface EmailVerificationRequest
  extends OauthClient,
    EmailVerificationRequestClient {}

export interface EmailVerificationConfirm {
  code: string;
  email: string;
}

// Response interfaces
export interface SuccessResponse {
  success: boolean;
  message: string;
}

// API Response types
export type GetProfileResponseApi = User | ErrorApiResponse;
export type UpdateProfileResponseApi = User | ErrorApiResponse;
export type ChangePasswordResponseApi = SuccessResponse | ErrorApiResponse;
export type PasswordResetRequestResponseApi =
  | SuccessResponse
  | ErrorApiResponse;
export type PasswordResetConfirmResponseApi =
  | SuccessResponse
  | ErrorApiResponse;
export type EmailVerificationRequestResponseApi =
  | SuccessResponse
  | ErrorApiResponse;
export type EmailVerificationConfirmResponseApi =
  | SuccessResponse
  | ErrorApiResponse;

// Service props
export interface GetProfileProps {
  user_id: string;
}

export interface UpdateProfileProps {
  user_id: string;
  data: ProfileUpdate;
}

export interface ChangePasswordProps {
  user_id: string;
  data: PasswordChangeUpdate;
}

export interface PasswordResetRequestProps {
  data: PasswordResetRequest;
}

export interface PasswordResetConfirmProps {
  data: PasswordResetConfirm;
}

export interface EmailVerificationRequestProps {
  data: EmailVerificationRequest;
}

export interface EmailVerificationConfirmProps {
  data: EmailVerificationConfirm;
}

// Hook interfaces
export interface UseCurrentUser {
  currentUser: User | null;
  organisationIds: string[] | null;
  currentOrganisationId: string | null;
  currentOrganisationPermissions: MembershipPermission[] | null;
  isLoading: boolean;
  error: string;
  mutateCurrentUser: () => void;
}

export interface CurrentUserContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  mutateCurrentUser: () => void;
  organisationIds: string[] | null;
  currentOrganisationId: string | null;
  currentOrganisationPermissions: MembershipPermission[] | null;
}
