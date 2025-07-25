import { ApiActionUser } from "./types";

interface GetUserApiUrlV1Params {
  action: ApiActionUser;
  id?: string | null;
}

/**
 * Get the API URL for user endpoints
 * @param {GetUserApiUrlV1Params} params The parameters to get the API URL
 * @returns {string} The API URL
 */
export const getUserApiUrlV1 = ({
  action,
  id,
}: GetUserApiUrlV1Params): string =>
  `/api/v1/users${id ? `/${id}` : ""}${action.length > 0 ? `/${action}` : ""}`;
