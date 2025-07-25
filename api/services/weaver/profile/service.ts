import { isRequestSuccess, processApiErrorResponse } from "@/api/utilities";
import { getErrorMessage } from "@/utilities/helpers/errors";

import { WeaverApiService } from "../service";
import { DataServiceResponse } from "../types/general";
import { User } from "../users/types";
import {
  ApiActionProfile,
  ChangePasswordProps,
  ChangePasswordResponseApi,
  EmailVerificationRequestProps,
  EmailVerificationRequestResponseApi,
  GetProfileProps,
  GetProfileResponseApi,
  SuccessResponse,
  UpdateProfileProps,
  UpdateProfileResponseApi,
} from "./types";
import { getProfileApiUrlV1 } from "./utilities";

/**
 * Service for profile management endpoints (requires authentication)
 */
export class ProfileService extends WeaverApiService {
  /**
   * Get current user profile
   * @param {GetProfileProps} props - The user ID
   * @returns {Promise<DataServiceResponse<User | null>>} The user profile response
   */
  async getProfile({
    user_id,
  }: GetProfileProps): Promise<DataServiceResponse<User | null>> {
    try {
      const res = await this.api.get<GetProfileResponseApi>(
        getProfileApiUrlV1({ action: ApiActionProfile.GET_PROFILE, user_id }),
      );

      if (
        isRequestSuccess(res.status) &&
        "id" in res.data &&
        "email" in res.data
      ) {
        return {
          success: true,
          message: "Profile fetched successfully",
          data: res.data,
          statuscode: res.status,
        };
      }

      return processApiErrorResponse(res, "Failed to fetch profile");
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to fetch profile. ${message}`,
        data: null,
        statuscode: 500,
      };
    }
  }

  /**
   * Update user profile
   * @param {UpdateProfileProps} props - The profile update data
   * @returns {Promise<DataServiceResponse<User | null>>} The updated user response
   */
  async updateProfile({
    user_id,
    data,
  }: UpdateProfileProps): Promise<DataServiceResponse<User | null>> {
    try {
      const res = await this.api.put<UpdateProfileResponseApi>(
        getProfileApiUrlV1({
          action: ApiActionProfile.UPDATE_PROFILE,
          user_id,
        }),
        data,
      );

      if (
        isRequestSuccess(res.status) &&
        "id" in res.data &&
        "email" in res.data
      ) {
        return {
          success: true,
          message: "Profile updated successfully",
          data: res.data,
          statuscode: res.status,
        };
      }

      return processApiErrorResponse(res, "Failed to update profile");
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to update profile. ${message}`,
        data: null,
        statuscode: 500,
      };
    }
  }

  /**
   * Change user password
   * @param {ChangePasswordProps} props - The password change data
   * @returns {Promise<DataServiceResponse<SuccessResponse | null>>} The success response
   */
  async changePassword({
    user_id,
    data,
  }: ChangePasswordProps): Promise<
    DataServiceResponse<SuccessResponse | null>
  > {
    try {
      const res = await this.api.put<ChangePasswordResponseApi>(
        getProfileApiUrlV1({
          action: ApiActionProfile.CHANGE_PASSWORD,
          user_id,
        }),
        data,
      );

      if (isRequestSuccess(res.status) && "success" in res.data) {
        return {
          success: true,
          message: "Password changed successfully",
          data: res.data,
          statuscode: res.status,
        };
      }

      return processApiErrorResponse(res, "Failed to change password");
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to change password. ${message}`,
        data: null,
        statuscode: 500,
      };
    }
  }

  /**
   * Request email verification
   * @param {EmailVerificationRequestProps} props - The email verification request data
   * @returns {Promise<DataServiceResponse<SuccessResponse | null>>} The success response
   */
  async requestEmailVerification({
    data,
  }: EmailVerificationRequestProps): Promise<
    DataServiceResponse<SuccessResponse | null>
  > {
    try {
      const res = await this.api.post<EmailVerificationRequestResponseApi>(
        getProfileApiUrlV1({
          action: ApiActionProfile.REQUEST_EMAIL_VERIFICATION,
        }),
        data,
      );

      if (isRequestSuccess(res.status) && "success" in res.data) {
        return {
          success: true,
          message: "Email verification request sent successfully",
          data: res.data,
          statuscode: res.status,
        };
      }

      return processApiErrorResponse(
        res,
        "Failed to request email verification",
      );
    } catch (error) {
      const message = getErrorMessage(error);
      return {
        success: false,
        message: `Failed to request email verification. ${message}`,
        data: null,
        statuscode: 500,
      };
    }
  }
}
