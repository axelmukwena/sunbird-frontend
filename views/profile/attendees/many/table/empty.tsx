import { UserX } from "lucide-react";
import { FC } from "react";

import { TableCell, TableRow } from "@/components/ui/table";

interface AttendeeTableEmptyProps {
  hasFilters?: boolean;
}

export const AttendeeTableEmpty: FC<AttendeeTableEmptyProps> = ({
  hasFilters,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="h-32">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <UserX className="w-12 h-12 text-gray-300 mb-4" />
          <p className="text-sm font-medium">
            {hasFilters ? "No attendances found" : "No attendance records"}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {hasFilters
              ? "Try adjusting your search or filter criteria"
              : "Start attending meetings to see your history here"}
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
};
