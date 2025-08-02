"use client";

import { FC } from "react";

import { TablePagination } from "@/components/pagination/table";
import { useAttendeesMany } from "@/hooks/attendees/many";
import { useAttendeePagination } from "@/hooks/attendees/pagination";

import { AttendeeDataGrid } from "./table";
import { AttendeesTopbar } from "./topbar";

interface AttendeesContentViewProps {
  meetingId: string;
  handleMutateParent: () => void;
}

export const AttendeesContentView: FC<AttendeesContentViewProps> = ({
  meetingId,
  handleMutateParent,
}) => {
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
  } = useAttendeePagination();

  const { isLoading, attendees, count, handleMutateAttendees } =
    useAttendeesMany({
      search,
      meeting_ids: [meetingId],
      sortBy,
      orderBy,
      limit,
      page,
      setTotal,
    });

  const handleMutateAll = (): void => {
    handleMutateAttendees();
    handleMutateParent();
  };

  return (
    <div className="space-y-4">
      <AttendeesTopbar
        meetingId={meetingId}
        handleMutateAttendees={handleMutateAll}
      />
      <AttendeeDataGrid
        attendees={attendees || []}
        isLoading={isLoading}
        handleMutateAttendees={handleMutateAll}
      />
      <TablePagination
        entity="attendee"
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
