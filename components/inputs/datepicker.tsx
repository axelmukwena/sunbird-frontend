import { ReactNode } from "react";
import { ControllerRenderProps, Path } from "react-hook-form";

import { DateFormat, DatePicker } from "../ui/datepicker";
import {
  FormControl,
  FormDescription,
  FormErrorMessage,
  FormItem,
  FormLabel,
} from "../ui/form";

interface DatePickerFieldProps<
  TFieldValues extends Record<string, unknown>,
  TName extends Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: ReactNode;
  selectedDate?: Date | null;
  setSelectedDate: (date: Date | null) => void;
  format?: DateFormat;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  caption?: string;
  error?: string;
}

export function DatePickerField<
  TFieldValues extends Record<string, unknown>,
  TName extends Path<TFieldValues>,
>({
  field,
  label,
  selectedDate,
  setSelectedDate,
  format,
  required,
  disabled,
  helpText,
  caption,
  error,
}: DatePickerFieldProps<TFieldValues, TName>): React.JSX.Element {
  return (
    <FormItem>
      <FormLabel helpText={helpText}>
        {label} {required && "*"}
      </FormLabel>
      <FormControl>
        <DatePicker
          {...field}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          disabled={disabled}
          format={format}
        />
      </FormControl>
      {caption && <FormDescription>{caption}</FormDescription>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormItem>
  );
}
