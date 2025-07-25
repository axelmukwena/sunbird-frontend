import { gray } from "@radix-ui/colors";
import { styled } from "@stitches/react";
import { IconChevronDown } from "@tabler/icons-react";
import { FC, useMemo, useState } from "react";

import {
  getFormattedDate,
  getFormattedDateAndTime,
} from "@/utilities/helpers/date";
import { PopHoverSide } from "@/utilities/types/utilities";

import { ButtonSelectInput } from "../../Elements/Buttons";
import { DatePicker } from "../../Elements/DatePicker/DatePicker";
import { FlexRow } from "../../Elements/DisplayFlex";
import { OptionSubcaption } from "../../Elements/General";
import { PopoverCard } from "../../PopoverCard";
import {
  FieldContainer,
  FieldErrorMessage,
  FieldLabel,
  FieldRequired,
} from "../helper";
import { LabelHelpText } from "../label-help-text";

const ChevronDown = styled(IconChevronDown, {
  position: "absolute",
  top: "50%",
  right: "0",
  transform: "translateY(-50%)",
  color: gray.gray9,
});

const DefaultTriggerContent = styled(FlexRow.BetweenCenter, {
  position: "relative",
  fontWeight: 500,
});

interface DefaultTriggerProps {
  placeholder: string;
  subcaption?: string;
  disabled?: boolean;
}

const DefaultTrigger: FC<DefaultTriggerProps> = ({
  placeholder,
  subcaption,
  disabled,
}) => (
  <FlexRow.StartStart className="default-day-month-trigger-container">
    <ButtonSelectInput disabled={disabled}>
      <DefaultTriggerContent className="default-day-month-trigger-content">
        <FlexRow.StartCenter gap="3">
          <span>{placeholder}</span>
          {subcaption && <OptionSubcaption>{subcaption}</OptionSubcaption>}
        </FlexRow.StartCenter>
        <ChevronDown size={16} />
      </DefaultTriggerContent>
    </ButtonSelectInput>
  </FlexRow.StartStart>
);

interface DatePickerFieldProps {
  label: string;
  name: string;
  selectedDate?: string;
  setSeletedDate: (date: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  contentWidth?: number;
  triggerWidth?: string;
  popoverContentSide?: PopHoverSide;
  includeTime?: boolean;
  containerHasPadding?: boolean;
  helpText?: string;
}

export const DatePickerField: FC<DatePickerFieldProps> = ({
  label,
  selectedDate,
  setSeletedDate,
  required = false,
  error,
  contentWidth = 340,
  triggerWidth,
  popoverContentSide = "right",
  disabled,
  includeTime,
  containerHasPadding = true,
  helpText,
}) => {
  const [open, setOpen] = useState(false);
  const handleSetSelectedDate = (date: string, dontClose?: boolean): void => {
    setSeletedDate(date);
    if (!dontClose) {
      setOpen(false);
    }
  };

  const placeholder = useMemo(() => {
    if (selectedDate) {
      if (includeTime) {
        return getFormattedDateAndTime({ utc: selectedDate });
      }
      return getFormattedDate({ utc: selectedDate });
    }
    return "Select a date";
  }, [selectedDate]);

  return (
    <FieldContainer
      className="datepicker-field-container"
      containerHasPadding={containerHasPadding}
    >
      <FieldLabel className="datepicker-form-label">
        {label} {required && <FieldRequired>*</FieldRequired>}{" "}
        {helpText && <LabelHelpText content={helpText} />}
      </FieldLabel>
      <PopoverCard
        open={open}
        setOpen={setOpen}
        side={popoverContentSide}
        contentWidth={contentWidth}
        triggerWidth={triggerWidth}
        sideOffset={5}
        trigger={
          <DefaultTrigger disabled={disabled} placeholder={placeholder} />
        }
        content={
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={handleSetSelectedDate}
            includeTime={includeTime}
          />
        }
      />
      {error && (
        <FieldErrorMessage className="datepicker-error-message">
          {error}
        </FieldErrorMessage>
      )}
    </FieldContainer>
  );
};
