import React, { FC, useState } from "react";
import { DataGrid, SortColumn } from "react-data-grid";

import { Attendee } from "@/api/services/weaver/attendees/types";
import { DataTableNoData } from "@/components/datagrid/data-table-no-data";
import { useDataGridDirection } from "@/components/datagrid/directionContext";
import { LinearLoader } from "@/components/loaders/linear";
import { SectionLoader } from "@/components/loaders/section";

import { AttendeeColumns } from "./columns";

interface AttendeeProps {
  attendees?: Attendee[] | null;
  isLoading?: boolean;
  handleMutateAttendees: () => void;
}

export const AttendeeDataGrid: FC<AttendeeProps> = ({
  attendees,
  isLoading,
  handleMutateAttendees,
}) => {
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const direction = useDataGridDirection();
  const columns = AttendeeColumns({ handleMutateAttendees });

  const rowKeyGetter = (row: Attendee): string => row.id;

  return (
    <div className="flex flex-1 flex-col gap-4">
      {isLoading && <LinearLoader />}
      <DataGrid
        columns={columns}
        rows={attendees || []}
        rowKeyGetter={rowKeyGetter}
        className="rdg-light rounded-lg border border-slate-200"
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
        direction={direction}
        enableVirtualization
        headerRowHeight={40}
        rowHeight={70}
        style={{
          minHeight: 40,
          height: "min-content",
        }}
      />
      {isLoading && <SectionLoader minHeight="200px" />}
      {!attendees?.length && !isLoading && (
        <DataTableNoData message="No attendees found" />
      )}
    </div>
  );
};
