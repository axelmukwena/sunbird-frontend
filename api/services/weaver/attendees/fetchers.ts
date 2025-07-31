import { AttendeeService } from "./service";
import {
  Attendee,
  AttendeeParams,
  AttendeeQuery,
  AttendeesManyResponse,
} from "./types";

interface GetAttendeeByIdFetcherProps {
  id?: string | null;
  organisationId?: string | null;
  getIdToken: () => Promise<string>;
}

/**
 * Fetches an attendee by ID.
 * @param {GetAttendeeByIdFetcherProps} props The fetcher props.
 * @returns {Promise<Attendee | null>} The attendee.
 */
export const getAttendeeByIdFetcher = async ({
  id,
  organisationId,
  getIdToken,
}: GetAttendeeByIdFetcherProps): Promise<Attendee | null> => {
  if (!id || !organisationId) {
    return null;
  }
  const token = await getIdToken();
  const attendeeService = new AttendeeService(token);
  const res = await attendeeService.getById({
    organisation_id: organisationId,
    id,
  });
  if (res.success) {
    return res.data || null;
  }
  throw new Error(res.message);
};

interface GetManyAttendeesFetcherProps {
  organisation_id?: string | null;
  params: AttendeeParams;
  query: AttendeeQuery;
  getIdToken: () => Promise<string>;
  requireIdsOrSearch?: boolean;
}

/**
 * Fetches many attendees.
 * @param {GetManyAttendeesFetcherProps} props The fetcher props.
 * @returns {Promise<AttendeesManyResponse>} The attendees.
 */
export const getAttendeesFetcher = async ({
  organisation_id,
  params,
  query,
  getIdToken,
  requireIdsOrSearch,
}: GetManyAttendeesFetcherProps): Promise<AttendeesManyResponse> => {
  if (!organisation_id) {
    return null;
  }
  if (requireIdsOrSearch && !query.ids?.length && !query.search) {
    return null;
  }
  const token = await getIdToken();
  const attendeeService = new AttendeeService(token);
  const res = await attendeeService.getManyFiltered({
    organisation_id: organisation_id,
    query,
    params,
  });
  if (res.success) {
    return res;
  }
  throw new Error(res.message);
};
