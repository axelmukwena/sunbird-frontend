import { FC, useCallback, useRef } from "react";
import { DatePicker as RsDatePicker } from "rsuite";

export enum DateFormat {
  dd_MM_yyyy__HH_mm = "dd/MM/yyyy HH:mm",
  dd_MM_yyyy = "dd/MM/yyyy",
  HH_mm = "HH:mm",
  dd_MMMM = "dd MMMM",
}

interface DatePickerProps {
  selectedDate?: Date | null;
  setSelectedDate: (date: Date | null) => void;
  disabled?: boolean;
  format?: DateFormat;
  placeholder?: string;
}

export const DatePicker: FC<DatePickerProps> = ({
  selectedDate,
  setSelectedDate,
  disabled = false,
  format = DateFormat.dd_MM_yyyy__HH_mm,
  placeholder = "Select a date",
}) => {
  const parentRef = useRef(null);
  const parentContainer = useCallback(
    () => parentRef.current as unknown as HTMLElement,
    [],
  );
  const handleInputChange = (
    value: Date | null,
    e: React.SyntheticEvent,
  ): void => {
    e.persist();
    e.stopPropagation();
    setSelectedDate(value);
  };
  return (
    <div ref={parentRef} style={{ position: "relative" }}>
      <RsDatePicker
        value={selectedDate}
        onChange={handleInputChange}
        disabled={disabled}
        format={format}
        placeholder={placeholder}
        container={parentContainer}
        placement="bottom"
      />
    </div>
  );
};
