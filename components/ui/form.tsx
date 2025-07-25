"use client";

import * as RadixForm from "@radix-ui/react-form";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { MessageCircleQuestion } from "lucide-react";
import * as React from "react";
import {
  Controller,
  type ControllerProps,
  FieldError,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form";

import { mergeTailwind } from "@/utilities/helpers/tailwind";

import { PopoverCard } from "../dialogs/popover";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Label } from "./label";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const Form = ({
  className,
  onClearServerErrors,
  ...props
}: React.ComponentProps<typeof RadixForm.Root> & {
  onClearServerErrors?: () => void;
}): React.JSX.Element => (
  <RadixForm.Root
    data-slot="form"
    className={mergeTailwind("grid gap-4", className)}
    onClearServerErrors={onClearServerErrors}
    {...props}
  />
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>): React.JSX.Element => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
);

interface UseFormField {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  isValidating: boolean;
  error?: FieldError;
  id: string;
  name: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
}

const useFormField = (): UseFormField => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

export const FormSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <Card className="gap-0 sm:gap-6">
    <CardHeader className="relative">
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="gap-4 sm:gap-6">{children}</CardContent>
  </Card>
);

const FormRow = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => (
  <div
    data-slot="form-row"
    className={mergeTailwind(
      "flex items-start w-full flex-col sm:flex-row gap-6 sm:gap-3",
      className,
    )}
    {...props}
  />
);

const FormItem = ({
  className,
  ...props
}: React.ComponentProps<"div">): React.JSX.Element => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={mergeTailwind("relative grid gap-2 w-full", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
};

const BaseFormLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>): React.JSX.Element => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={mergeTailwind("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
};

const FormLabel = ({
  children,
  helpText,
  className,
  triggerClassName,
  ...props
}: React.ComponentProps<typeof BaseFormLabel> & {
  helpText?: string;
  triggerClassName?: string;
}): React.JSX.Element => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center gap-1.5">
      <BaseFormLabel className={className} {...props}>
        {children}
      </BaseFormLabel>
      <PopoverCard
        open={open}
        setOpen={setOpen}
        side="right"
        contentWidth="250px"
        triggerWidth="auto"
        background="black"
        trigger={
          helpText && (
            <MessageCircleQuestion
              className={mergeTailwind(
                "h-[13px] w-[13px] stroke-[2.5px] cursor-help",
                triggerClassName,
              )}
            />
          )
        }
        content={helpText}
      />
    </div>
  );
};

const FormControl = ({
  ...props
}: React.ComponentProps<typeof Slot>): React.JSX.Element => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
};

const FormDescription = ({
  className,
  ...props
}: React.ComponentProps<"p">): React.JSX.Element => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={mergeTailwind("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
};

const FormMessage = ({
  className,
  ...props
}: React.ComponentProps<"p">): React.JSX.Element | null => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={mergeTailwind("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
};

const FormErrorMessage = ({
  className,
  ...props
}: React.ComponentProps<"p">): React.JSX.Element | null => (
  <p
    data-slot="form-message"
    className={mergeTailwind("text-destructive text-sm", className)}
    {...props}
  >
    {props.children}
  </p>
);

export {
  Form,
  FormControl,
  FormDescription,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
  FormRow,
  useFormField,
};
