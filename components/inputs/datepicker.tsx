import { ReactNode } from "react";

import { DateTimeFormat, DateTimePicker } from "../ui/datepicker";
import {
  FormControl,
  FormDescription,
  FormErrorMessage,
  FormItem,
  FormLabel,
} from "../ui/form";

interface DatePickerFieldProps {
  label: ReactNode;
  selectedDateTime?: Date | null;
  setSelectedDateTime: (date: Date | null) => void;
  includeTime?: boolean;
  format?: DateTimeFormat;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  caption?: string;
  error?: string;
}

export function DatePickerField({
  label,
  selectedDateTime,
  setSelectedDateTime,
  format,
  includeTime,
  required,
  disabled,
  helpText,
  caption,
  error,
}: DatePickerFieldProps): React.JSX.Element {
  return (
    <FormItem>
      <FormLabel helpText={helpText}>
        {label} {required && "*"}
      </FormLabel>
      <FormControl>
        <DateTimePicker
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
          disabled={disabled}
          format={format}
          includeTime={includeTime}
        />
      </FormControl>
      {caption && <FormDescription>{caption}</FormDescription>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormItem>
  );
}
