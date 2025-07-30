import React, { FC, useState } from "react";
import { DataGrid, SortColumn } from "react-data-grid";

import { Meeting } from "@/api/services/weaver/meetings/types";
import { DataTableNoData } from "@/components/datagrid/data-table-no-data";
import { useDataGridDirection } from "@/components/datagrid/directionContext";
import { LinearLoader } from "@/components/loaders/linear";
import { SectionLoader } from "@/components/loaders/section";

import { MeetingColumns } from "./columns";

interface MeetingProps {
  meetings?: Meeting[] | null;
  isLoading?: boolean;
  handleMutateMeetings: () => void;
}

export const MeetingDataGrid: FC<MeetingProps> = ({
  meetings,
  isLoading,
  handleMutateMeetings,
}) => {
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const direction = useDataGridDirection();
  const columns = MeetingColumns({ handleMutateMeetings });

  const rowKeyGetter = (row: Meeting): string => row.id;

  return (
    <div className="flex flex-1 flex-col gap-4">
      {isLoading && <LinearLoader />}
      <DataGrid
        columns={columns}
        rows={meetings || []}
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
      {!meetings?.length && !isLoading && (
        <DataTableNoData message="No meetings found" />
      )}
    </div>
  );
};
