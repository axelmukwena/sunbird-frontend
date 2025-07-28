import { FC } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface AttendeeTableSkeletonProps {
  rows?: number;
}

export const AttendeeTableSkeleton: FC<AttendeeTableSkeletonProps> = ({
  rows = 5,
}) => {
  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[120px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[180px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-[80px] rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[80px]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
