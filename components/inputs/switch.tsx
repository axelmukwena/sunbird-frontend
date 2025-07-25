import { ReactNode } from "react";
import { ControllerRenderProps, Path } from "react-hook-form";

import { InputValue } from "@/types/general";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";

interface SwitchFieldProps<
  TFieldValues extends Record<string, unknown>,
  TName extends Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  caption?: string;
  pseudoFieldLabel?: boolean;
}

export function SwitchField<
  TFieldValues extends Record<string, unknown>,
  TName extends Path<TFieldValues>,
>({
  field,
  label,
  checked,
  onCheckedChange,
  required,
  disabled,
  helpText,
  caption,
  pseudoFieldLabel,
}: SwitchFieldProps<TFieldValues, TName>): React.JSX.Element {
  return (
    <FormItem className="flex flex-col items-center">
      {pseudoFieldLabel && (
        <FormLabel
          helpText={helpText}
          className="opacity-0 hidden sm:block"
          triggerClassName="opacity-0 hidden sm:block"
        >
          {label} {required && "*"}
        </FormLabel>
      )}
      <div className="flex flex-row items-center w-full h-9">
        <FormControl>
          <Switch
            {...field}
            value={field.value as InputValue}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
          />
        </FormControl>
        <FormLabel helpText={helpText} className="ml-2 cursor-pointer">
          {label} {required && "*"}
        </FormLabel>
      </div>
      {caption && <FormDescription>{caption}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}
