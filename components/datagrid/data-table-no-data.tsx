import { FileSearch } from "lucide-react";
import React, { FC } from "react";

interface TableNoDataProps {
  message?: string;
  icon?: React.ReactNode;
}

export const DataTableNoData: FC<TableNoDataProps> = ({
  message = "No data available",
  icon = <FileSearch className="h-12 w-12 text-gray-400" strokeWidth={2} />,
}) => (
  <div
    className="items-center justify-center text-center col-span-full bg-gray-50 rounded-lg"
    style={{ height: "200px" }}
  >
    <div className="flex flex-col items-center justify-center space-y-3 h-full">
      {icon}
      <p className="text-sm text-gray-500 font-medium">{message}</p>
    </div>
  </div>
);
