import { FC } from "react";

import { AttendeeSortBy } from "@/api/services/weaver/attendees/types";
import { OrderBy } from "@/api/services/weaver/types/general";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AttendeeTableHeaderProps {
  sortBy?: AttendeeSortBy;
  orderBy?: OrderBy;
  onSort?: (sortBy: AttendeeSortBy, orderBy: OrderBy) => void;
}

export const AttendeeTableHeader: FC<AttendeeTableHeaderProps> = ({
  sortBy,
  orderBy,
  onSort,
}) => {
  const handleSort = (field: AttendeeSortBy): void => {
    if (onSort) {
      const newOrderBy =
        sortBy === field && orderBy === OrderBy.ASC
          ? OrderBy.DESC
          : OrderBy.ASC;
      onSort(field, newOrderBy);
    }
  };

  const getSortIcon = (field: AttendeeSortBy): string | null => {
    if (sortBy !== field) return null;
    return orderBy === OrderBy.ASC ? "↑" : "↓";
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead
          className={`cursor-pointer hover:bg-gray-50 ${onSort ? "select-none" : ""}`}
          onClick={() => handleSort(AttendeeSortBy.FIRST_NAME)}
        >
          Meeting & Organization {getSortIcon(AttendeeSortBy.FIRST_NAME)}
        </TableHead>
        <TableHead
          className={`cursor-pointer hover:bg-gray-50 ${onSort ? "select-none" : ""}`}
          onClick={() => handleSort(AttendeeSortBy.CREATED_AT)}
        >
          Meeting Date {getSortIcon(AttendeeSortBy.CREATED_AT)}
        </TableHead>
        <TableHead>Location</TableHead>
        <TableHead
          className={`cursor-pointer hover:bg-gray-50 ${onSort ? "select-none" : ""}`}
          onClick={() => handleSort(AttendeeSortBy.ATTENDANCE_STATUS)}
        >
          Status {getSortIcon(AttendeeSortBy.ATTENDANCE_STATUS)}
        </TableHead>
        <TableHead
          className={`cursor-pointer hover:bg-gray-50 ${onSort ? "select-none" : ""}`}
          onClick={() => handleSort(AttendeeSortBy.CHECKIN_DATETIME)}
        >
          Check-in Time {getSortIcon(AttendeeSortBy.CHECKIN_DATETIME)}
        </TableHead>
        <TableHead>Registered</TableHead>
      </TableRow>
    </TableHeader>
  );
};
