import { CalendarIcon } from "lucide-react";
import { FC } from "react";

import {
  getFormattedDate,
  getFormattedDateAndTime,
  getFormattedTime,
} from "@/utilities/helpers/date";

import { DataDisplayRow } from "./row";

interface DateDisplayRowProps {
  label: string;
  value?: string | null;
  caption?: string | null;
  format?: "date" | "datetime" | "time";
  className?: string;
}

export const DateDisplayRow: FC<DateDisplayRowProps> = ({
  label,
  value,
  caption,
  format = "datetime",
  className = "",
}) => {
  const formatDate = (date: string): string => {
    switch (format) {
      case "date":
        return getFormattedDate({ utc: date });
      case "time":
        return getFormattedTime(date);
      case "datetime":
      default:
        return getFormattedDateAndTime({ utc: date });
    }
  };

  return (
    <DataDisplayRow label={label} caption={caption} className={className}>
      <div className="inline-flex items-center space-x-2">
        <CalendarIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
        {value && <span>{formatDate(value)}</span>}
      </div>
    </DataDisplayRow>
  );
};
