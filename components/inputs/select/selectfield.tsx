import { FC, useMemo, useState } from "react";

import { useDebounce } from "@/hooks/utilities/use-debounce";
import { SelectOptionType } from "@/types/general";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { SelectSearchPicker } from "./select-search-picker";

interface SelectFieldProps {
  label: string;
  selected: string | null | undefined;
  setSelected: (value: string) => void;
  options: SelectOptionType[];
  disabled?: boolean;
  required?: boolean;
  helpText?: string;
  caption?: string;
  placeholder?: string;
}

export const SelectField: FC<SelectFieldProps> = ({
  label,
  selected,
  setSelected,
  options,
  disabled: fieldDisabled,
  required,
  helpText,
  caption,
  placeholder = "Select...",
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const filteredOptions = useMemo(
    () =>
      options.filter(
        (option) =>
          option.value
            .toLowerCase()
            .includes(debouncedSearchInput.toLowerCase()) ||
          option.name
            ?.toLowerCase()
            .includes(debouncedSearchInput.toLowerCase()),
      ),
    [options, debouncedSearchInput],
  );
  const triggerPlaceholder = useMemo(() => {
    if (!selected) {
      return "";
    }
    const selectedOption = options.find((option) => option.value === selected);
    return selectedOption ? selectedOption.name : "";
  }, [selected, options]);
  const handleOnChange = (value: string[]): void => {
    if (value.length > 0) {
      setSelected(value[0]);
    } else {
      setSelected("");
    }
  };

  return (
    <FormItem>
      <FormLabel helpText={helpText}>
        {label} {required && "*"}
      </FormLabel>
      <FormControl>
        <SelectSearchPicker
          options={filteredOptions}
          selectedValues={[selected || ""]}
          onChange={handleOnChange}
          onSearch={setSearchInput}
          placeholder={placeholder}
          triggerPlaceholder={triggerPlaceholder}
          disabled={fieldDisabled}
        />
      </FormControl>
      {caption && <FormDescription>{caption}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};
