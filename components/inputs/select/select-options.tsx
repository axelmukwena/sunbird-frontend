import { FC, useMemo, useState } from "react";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDebounce } from "@/hooks/utilities/use-debounce";
import { SelectOptionType } from "@/types/general";

import { EntityBadges } from "../badges";
import { SelectSearchPicker } from "./select-search-picker";

interface OptionBadgesProps {
  selectedOptions?: string[] | null;
  options: SelectOptionType[];
  fieldDisabled?: boolean;
  handleRemoveOption: (id: string) => void;
}

const OptionBadges: FC<OptionBadgesProps> = ({
  selectedOptions,
  options,
  fieldDisabled,
  handleRemoveOption,
}) => {
  const badges = useMemo(() => {
    if (!selectedOptions) return [];
    return options.filter((option) => selectedOptions.includes(option.value));
  }, [selectedOptions, options]);

  if (!badges.length) return null;

  return (
    <EntityBadges
      items={badges}
      fieldDisabled={fieldDisabled}
      handleRemove={handleRemoveOption}
    />
  );
};

interface SelectOptionsProps {
  selectedOptions: string[] | null | undefined;
  setSelectedOptions: (ids: string[]) => void;
  options: SelectOptionType[];
  error?: string;
  disabled?: boolean;
  label: string;
  labelVisible?: boolean;
  required?: boolean;
  returnChipsOnly?: boolean;
  showChips?: boolean;
  triggerPlaceholder?: React.ReactNode;
  helpText?: string;
  placeholder?: string;
}

export const SelectOptions: FC<SelectOptionsProps> = ({
  selectedOptions = [],
  setSelectedOptions,
  options,
  error,
  disabled: fieldDisabled,
  label,
  labelVisible = true,
  required,
  returnChipsOnly,
  showChips = true,
  triggerPlaceholder = "Select options",
  helpText,
  placeholder = "Search and select options...",
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const filteredOptions = useMemo(
    () =>
      options.filter(
        (option) =>
          option.name
            ?.toLowerCase()
            .includes(debouncedSearchInput.toLowerCase()) ||
          option.value
            .toLowerCase()
            .includes(debouncedSearchInput.toLowerCase()),
      ),
    [options, debouncedSearchInput],
  );

  const handleOnChange = (values: string[]): void => {
    // Ensure unique values
    const uniqueValues = Array.from(new Set(values));
    setSelectedOptions(uniqueValues);
  };

  const handleRemoveOption = (idToRemove: string): void => {
    if (!selectedOptions) return;
    const newIds = selectedOptions.filter((id) => id !== idToRemove);
    setSelectedOptions(newIds);
  };

  // If only chips are requested, return just the badges
  if (returnChipsOnly) {
    return (
      <OptionBadges
        selectedOptions={selectedOptions}
        options={options}
        fieldDisabled={true}
        handleRemoveOption={() => {}}
      />
    );
  }

  return (
    <FormItem>
      <FormLabel className={labelVisible ? "" : "sr-only"}>
        {label} {required && "*"}
      </FormLabel>
      <FormControl>
        <SelectSearchPicker
          options={filteredOptions}
          selectedValues={selectedOptions || []}
          onChange={handleOnChange}
          onSearch={setSearchInput}
          placeholder={placeholder}
          searchPlaceholder="Search options..."
          triggerPlaceholder={triggerPlaceholder}
          isMulti={true}
          isLoading={false}
          disabled={fieldDisabled}
          error={error}
          // No infinite loading for local data
          hasMore={false}
          onLoadMore={() => {}}
          isLoadingMore={false}
          total={filteredOptions.length}
        />
      </FormControl>

      <FormMessage />

      {helpText && <FormDescription>{helpText}</FormDescription>}

      {showChips && (
        <OptionBadges
          selectedOptions={selectedOptions}
          options={options}
          fieldDisabled={fieldDisabled}
          handleRemoveOption={handleRemoveOption}
        />
      )}
    </FormItem>
  );
};
