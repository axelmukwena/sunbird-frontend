import { gray } from "@radix-ui/colors";
import { styled } from "@stitches/react";
import { IconChevronDown } from "@tabler/icons-react";
import { DateTime } from "luxon";
import { FC, useMemo, useState } from "react";

import { getWeekDayMonthYear } from "@/utilities/helpers/date";
import { PopHoverSide } from "@/utilities/types/utilities";

import { ButtonSelectInput } from "../../Elements/Buttons";
import {
  DayMonth,
  DayMonthPicker,
} from "../../Elements/DatePicker/DayMonthPicker";
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

interface DayMonthPickerFieldProps {
  label: string;
  name: string;
  selectedDayMonth?: DayMonth;
  setSeletedDayMonth: (dayMonth: DayMonth) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  contentWidth?: number;
  triggerWidth?: string;
  popoverContentSide?: PopHoverSide;
  containerHasPadding?: boolean;
  helpText?: string;
}

export const DayMonthPickerField: FC<DayMonthPickerFieldProps> = ({
  label,
  selectedDayMonth: selectedDayMonthRaw,
  setSeletedDayMonth,
  required = false,
  error,
  contentWidth = 340,
  triggerWidth,
  popoverContentSide = "right",
  containerHasPadding = true,
  helpText,
}) => {
  const [open, setOpen] = useState(false);

  const placeholder = useMemo(() => {
    if (selectedDayMonthRaw?.day && selectedDayMonthRaw.month) {
      const luxonDate = DateTime.fromJSDate(
        new Date(2024, selectedDayMonthRaw.month - 1, selectedDayMonthRaw.day),
      );
      const { day, month } = getWeekDayMonthYear(luxonDate);
      return `${day} ${month}`;
    }
    return "Select a date";
  }, [selectedDayMonthRaw]);

  const selectedDayMonth = useMemo(() => {
    if (selectedDayMonthRaw?.day && selectedDayMonthRaw.month) {
      return selectedDayMonthRaw;
    }
    return undefined;
  }, [selectedDayMonthRaw]);

  const handleSetSelectedDayMonth = (
    dayMonth: DayMonth,
    dontClose?: boolean,
  ): void => {
    setSeletedDayMonth(dayMonth);
    if (!dontClose) {
      setOpen(false);
    }
  };

  return (
    <FieldContainer
      className="day-month-picker-field-container"
      containerHasPadding={containerHasPadding}
    >
      <FieldLabel className="day-month-picker-form-label">
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
        trigger={<DefaultTrigger placeholder={placeholder} />}
        content={
          <DayMonthPicker
            selectedDayMonth={selectedDayMonth}
            setSelectedDayMonth={handleSetSelectedDayMonth}
          />
        }
      />
      {error && (
        <FieldErrorMessage className="day-month-picker-error">
          {error}
        </FieldErrorMessage>
      )}
    </FieldContainer>
  );
};
