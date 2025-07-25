import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode } from "react";
import { ControllerRenderProps, Path } from "react-hook-form";

import { getInternationalPhoneNumber } from "@/utilities/helpers/phonenumber";
import { mergeTailwind } from "@/utilities/helpers/tailwind";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const RightIconWrapper = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    className={mergeTailwind(className, "absolute right-0.5 top-6")}
    {...props}
  />
);

const LeftCurrencyWrapper = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    className={mergeTailwind(
      className,
      "opacity-90 absolute h-9 left-0 top-[22px] text-sm font-medium pointer-events-none rounded-l-md border-r border bg-gray-100",
    )}
    {...props}
  />
);

const CurrencyContainer = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    className={mergeTailwind(
      className,
      "flex flex-row items-center justify-center h-full min-w-[52px]",
    )}
    {...props}
  />
);

type TextType =
  | "date"
  | "datetime-local"
  | "email"
  | "hidden"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

interface TextFieldProps<
  TFieldValues extends Record<string, unknown>,
  TName extends Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  autocomplete?: string;
  disabled?: boolean;
  type?: TextType;
  placeholder?: string;
  rightIcon?: ReactNode;
  helpText?: string;
  caption?: string;
  currency?: string;
}

export function TextField<
  TFieldValues extends Record<string, unknown>,
  TName extends Path<TFieldValues>,
>({
  field,
  label,
  required = false,
  autocomplete,
  disabled = false,
  type = "text",
  onChange,
  onBlur,
  onKeyDown,
  placeholder,
  rightIcon,
  helpText,
  caption,
  currency,
}: TextFieldProps<TFieldValues, TName>): React.JSX.Element {
  const handleOnNumberKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (type === "number") {
      const invalidKeys = ["e", "E", "+", "-"];
      if (invalidKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (type === "tel") {
      const formattedNumber = getInternationalPhoneNumber(e.target.value);
      if (formattedNumber) {
        onChange({ ...e, target: { ...e.target, value: formattedNumber } });
        return;
      }
    }
    onChange(e);
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (!onBlur) {
      return;
    }
    if (type === "tel") {
      const formattedNumber = getInternationalPhoneNumber(e.target.value);
      if (formattedNumber) {
        onBlur({ ...e, target: { ...e.target, value: formattedNumber } });
        return;
      }
    }
    onBlur(e);
  };

  return (
    <FormItem>
      <FormLabel helpText={helpText}>
        {label} {required && "*"}
      </FormLabel>
      {currency && (
        <LeftCurrencyWrapper className="textfield-currency-wrapper">
          <CurrencyContainer>{currency}</CurrencyContainer>
        </LeftCurrencyWrapper>
      )}
      <FormControl>
        <Input
          {...field}
          value={(field.value as string) || ""}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          required={required}
          autoComplete={autocomplete}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onKeyDown={handleOnNumberKeyDown}
          style={{
            paddingLeft: currency ? "60px" : undefined,
            paddingRight: rightIcon ? "15px" : undefined,
          }}
        />
      </FormControl>
      {rightIcon && (
        <RightIconWrapper className="textfield-right-icon-wrapper">
          {rightIcon}
        </RightIconWrapper>
      )}
      {caption && <FormDescription>{caption}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}
