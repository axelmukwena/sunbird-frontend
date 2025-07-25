import { User } from "../users/types";
import { ProfileService } from "./service";

interface GetUserFetcherProps {
  id?: string | null;
  getIdToken: () => Promise<string>;
  logout: () => Promise<void>;
}

/**
 * Fetches the current user.
 * @param {GetUserFetcherProps} props The fetcher props.
 * @returns {Promise<User | null>} The user.
 */
export const currentUserFetcher = async ({
  id,
  getIdToken,
  logout,
}: GetUserFetcherProps): Promise<User | null> => {
  if (!id) {
    return null;
  }
  const token = await getIdToken();
  const profileService = new ProfileService(token);
  const res = await profileService.getProfile({ user_id: id });
  if (res.success && res.data) {
    return res.data;
  }
  if (res.statuscode === 401) {
    await logout();
  }

  throw new Error(res.message);
};
