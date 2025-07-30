import { useEffect, useMemo } from "react";
import useSWR, { useSWRConfig } from "swr";

import {
  AttendanceStatus,
  Attendee,
  AttendeeParams,
  AttendeeQuery,
  AttendeeSortBy,
} from "@/api/services/weaver/attendees/types";
import { getManyAttendeeUserFetcher } from "@/api/services/weaver/profile/fetchers";
import { ApiActionProfile } from "@/api/services/weaver/profile/types";
import { getProfileSwrUrlV1 } from "@/api/services/weaver/profile/utilities";
import {
  DataServiceResponse,
  OrderBy,
} from "@/api/services/weaver/types/general";
import { getErrorMessage } from "@/utilities/helpers/errors";
import { notify } from "@/utilities/helpers/toaster";

import { useUserCredentials } from "../credentials";

interface UseAttendeeUsersMany {
  isLoading: boolean;
  attendees?: Attendee[] | null;
  count: number;
  handleMutateAttendees: () => void;
}

interface UseAttendeeUsersManyProps {
  search?: string;
  attendanceStatuses?: AttendanceStatus[];
  sortBy?: AttendeeSortBy;
  orderBy?: OrderBy;
  limit: number;
  page: number;
  setTotal: (total: number) => void;
  handleMutateParent?: () => void;
}

export const useAttendeeUsersMany = ({
  search,
  attendanceStatuses,
  sortBy,
  orderBy,
  limit,
  page,
  setTotal,
  handleMutateParent,
}: UseAttendeeUsersManyProps): UseAttendeeUsersMany => {
  const { id: userId, getIdToken } = useUserCredentials();
  const { mutate } = useSWRConfig();

  const query: AttendeeQuery = {
    search,
    attendance_statuses: attendanceStatuses,
    sort_by: sortBy,
    order_by: orderBy,
  };

  const params: AttendeeParams = {
    limit,
    skip: page * limit,
  };

  const fetcher = (): Promise<DataServiceResponse<Attendee[]>> =>
    getManyAttendeeUserFetcher({
      getIdToken,
      userId: userId!,
      query,
      params,
    });

  const attendeesSwrQuery = JSON.stringify({
    userId,
    ...query,
    ...params,
  });

  const attendeesSwrUrl = getProfileSwrUrlV1({
    action: ApiActionProfile.MY_ATTENDANCES,
    user_id: userId || "",
    query: attendeesSwrQuery,
  });

  const { data, isLoading, error } = useSWR(
    userId ? attendeesSwrUrl : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    },
  );

  const { attendees, count } = useMemo(() => {
    if (!data || !data.success) {
      setTotal(0);
      return { attendees: [], count: 0 };
    }
    setTotal(data.total || 0);
    return {
      attendees: data.data,
      count: data?.data?.length || 0,
    };
  }, [data, setTotal]);

  useEffect(() => {
    if (error) {
      notify({
        message: getErrorMessage(error),
        type: "error",
      });
    }
  }, [error]);

  const handleMutateAttendees = (): void => {
    mutate(attendeesSwrUrl);
    if (handleMutateParent) {
      handleMutateParent();
    }
  };

  return {
    isLoading,
    attendees,
    count,
    handleMutateAttendees,
  };
};
