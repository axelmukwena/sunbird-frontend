"use client";

import { FC } from "react";

import { TablePagination } from "@/components/pagination/table";
import { useMeetingsMany } from "@/hooks/meetings/many";
import { useMeetingPagination } from "@/hooks/meetings/pagination";

import { MeetingDataGrid } from "./table";
import { MeetingsTopbar } from "./topbar";

interface MeetingsPageContentProps {}

export const MeetingsPageContent: FC<MeetingsPageContentProps> = () => {
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
  } = useMeetingPagination();

  const { isLoading, meetings, count, handleMutateMeetings } = useMeetingsMany({
    search,
    sortBy,
    orderBy,
    limit,
    page,
    setTotal,
  });
  return (
    <div className="space-y-4">
      <MeetingsTopbar handleMutateMeetings={handleMutateMeetings} />
      <MeetingDataGrid
        meetings={meetings || []}
        isLoading={isLoading}
        handleMutateMeetings={handleMutateMeetings}
      />
      <TablePagination
        entity="meeting"
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
