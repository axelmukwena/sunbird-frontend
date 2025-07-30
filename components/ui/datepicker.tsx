"use client";

import { Calendar as LucideCalendar, Clock } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export enum DateTimeFormat {
  DATE_TIME = "dd/MM/yyyy HH:mm",
  DATE_ONLY = "dd/MM/yyyy",
  TIME_ONLY = "HH:mm",
  LONG_DATE = "dd MMMM yyyy",
  LONG_DATE_TIME = "dd MMMM yyyy HH:mm",
}

interface DateTimePickerProps {
  selectedDateTime?: Date | null;
  setSelectedDateTime: (date: Date | null) => void;
  disabled?: boolean;
  format?: DateTimeFormat;
  placeholder?: string;
  label?: string;
  includeTime?: boolean;
  className?: string;
}

// Helper functions for timezone-agnostic date handling
const formatLocalDate = (
  date: Date | undefined,
  format: DateTimeFormat,
): string => {
  if (!date) return "";

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[date.getMonth()];

  switch (format) {
    case DateTimeFormat.DATE_TIME:
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    case DateTimeFormat.DATE_ONLY:
      return `${day}/${month}/${year}`;
    case DateTimeFormat.TIME_ONLY:
      return `${hours}:${minutes}`;
    case DateTimeFormat.LONG_DATE:
      return `${day} ${monthName} ${year}`;
    case DateTimeFormat.LONG_DATE_TIME:
      return `${day} ${monthName} ${year} ${hours}:${minutes}`;
    default:
      return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
};

const parseLocalDateTime = (value: string): Date | null => {
  if (!value.trim()) return null;

  let parsedDate: Date | null = null;

  // First try direct Date parsing
  parsedDate = new Date(value);
  if (isValidDate(parsedDate)) {
    return parsedDate;
  }

  // Try manual parsing for dd/MM/yyyy format
  const ddmmyyyy = value.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2}))?$/,
  );
  if (ddmmyyyy) {
    const [, day, month, year, hours = "0", minutes = "0"] = ddmmyyyy;
    parsedDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes),
    );
    if (isValidDate(parsedDate)) {
      return parsedDate;
    }
  }

  return null;
};

const isValidDate = (date: Date | undefined | null): boolean => {
  if (!date) return false;
  return !isNaN(date.getTime());
};

const combineDateTime = (date: Date, timeString: string): Date => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const combined = new Date(date);
  combined.setHours(hours || 0, minutes || 0, 0, 0);
  return combined;
};

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selectedDateTime,
  setSelectedDateTime,
  disabled = false,
  format = DateTimeFormat.DATE_TIME,
  placeholder = "Select date",
  includeTime = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    formatLocalDate(selectedDateTime || undefined, format),
  );
  const [timeValue, setTimeValue] = React.useState(() => {
    if (selectedDateTime) {
      const hours = selectedDateTime.getHours().toString().padStart(2, "0");
      const minutes = selectedDateTime.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    return "09:00";
  });

  // Update input value when selectedDateTime changes externally
  React.useEffect(() => {
    setInputValue(formatLocalDate(selectedDateTime || undefined, format));
    if (selectedDateTime) {
      const hours = selectedDateTime.getHours().toString().padStart(2, "0");
      const minutes = selectedDateTime.getMinutes().toString().padStart(2, "0");
      setTimeValue(`${hours}:${minutes}`);
    }
  }, [selectedDateTime, format]);

  const handleDateSelect = (date: Date | undefined): void => {
    if (!date) {
      setSelectedDateTime(null);
      setInputValue("");
      setOpen(false);
      return;
    }

    let finalDate = date;
    if (includeTime && timeValue) {
      finalDate = combineDateTime(date, timeValue);
    }

    setSelectedDateTime(finalDate);
    setInputValue(formatLocalDate(finalDate, format));
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);

    const parsedDate = parseLocalDateTime(value);
    if (parsedDate) {
      setSelectedDateTime(parsedDate);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newTimeValue = e.target.value;
    setTimeValue(newTimeValue);

    if (selectedDateTime) {
      const updatedDate = combineDateTime(selectedDateTime, newTimeValue);
      setSelectedDateTime(updatedDate);
      setInputValue(formatLocalDate(updatedDate, format));
    } else if (newTimeValue) {
      // Create a date with today's date and the selected time
      const today = new Date();
      const updatedDate = combineDateTime(today, newTimeValue);
      setSelectedDateTime(updatedDate);
      setInputValue(formatLocalDate(updatedDate, format));
    }
  };

  const displayValue =
    inputValue ||
    (selectedDateTime ? formatLocalDate(selectedDateTime, format) : "");

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Input
          id="datetime-picker"
          value={displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className="bg-background pr-10"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              disabled={disabled}
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2 hover:bg-gray-100"
            >
              <LucideCalendar className="size-3.5" />
              <span className="sr-only">Open calendar</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="start"
            sideOffset={4}
          >
            <Calendar
              mode="single"
              selected={selectedDateTime || undefined}
              onSelect={handleDateSelect}
              captionLayout="dropdown"
              disabled={disabled}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {includeTime && (
        <div className="flex flex-col gap-1">
          <div className="relative">
            <Input
              type="time"
              value={timeValue}
              onChange={handleTimeChange}
              disabled={disabled}
              className=" pr-8 w-30 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
            />
            <Clock className="absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
};
