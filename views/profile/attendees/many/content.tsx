"use client";

import { FC } from "react";

import {
  Attendee,
  AttendeeSortBy,
} from "@/api/services/weaver/attendees/types";
import { OrderBy } from "@/api/services/weaver/types/general";
import { TablePagination } from "@/components/pagination/table";
import { useAttendeeUsersMany } from "@/hooks/profile/attendee/many";
import { useAttendeeUserPagination } from "@/hooks/profile/attendee/pagination";

import { AttendeeTable } from "./table";

interface ProfileAttendeesContentProps {}

export const ProfileAttendeesContent: FC<ProfileAttendeesContentProps> = () => {
  const {
    search,
    sortBy,
    orderBy,
    limit,
    page,
    total,
    handlePageChange,
    handleLimitChange,
    setTotal,
  } = useAttendeeUserPagination();

  const { isLoading, attendees, count, handleMutateAttendees } =
    useAttendeeUsersMany({
      search,
      sortBy,
      orderBy,
      limit,
      page,
      setTotal,
    });

  const handleSort = (newSortBy: AttendeeSortBy, newOrderBy: OrderBy): void => {
    // This would update your URL params through the pagination hook
    // You'll need to implement the actual sorting logic in your pagination hook
    console.log("Sort requested:", { newSortBy, newOrderBy });
  };

  const handleRowClick = (attendee: Attendee): void => {
    // Navigate to attendee detail page or open modal
    console.log("Row clicked:", attendee);
  };

  return (
    <div className="space-y-4">
      <AttendeeTable
        attendees={attendees || []}
        isLoading={isLoading}
        hasFilters={!!search}
        sortBy={sortBy}
        orderBy={orderBy}
        onSort={handleSort}
        onRowClick={handleRowClick}
        handleMutateAttendees={handleMutateAttendees}
      />

      <TablePagination
        entity="attendance"
        count={count}
        total={total}
        limit={limit}
        page={page}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
