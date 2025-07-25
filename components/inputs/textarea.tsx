import { ChangeEvent, FocusEvent } from "react";
import { ControllerRenderProps, Path } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

interface TextAreaFieldProps<
  TFieldValues extends Record<string, unknown>,
  TName extends Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  placeholder?: string;
  helpText?: string;
  caption?: string;
  rows?: number;
}

export function TextAreaField<
  TFieldValues extends Record<string, unknown>,
  TName extends Path<TFieldValues>,
>({
  field,
  label,
  required = false,
  autoComplete,
  disabled = false,
  onChange,
  onBlur,
  placeholder,
  helpText,
  caption,
  rows = 4,
}: TextAreaFieldProps<TFieldValues, TName>): React.JSX.Element {
  return (
    <FormItem>
      <FormLabel helpText={helpText}>
        {label} {required && "*"}
      </FormLabel>
      <FormControl>
        <Textarea
          {...field}
          value={(field.value as string) || ""}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
          rows={rows}
        />
      </FormControl>
      {caption && <FormDescription>{caption}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}
