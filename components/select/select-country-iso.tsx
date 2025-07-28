import { FC, useMemo, useState } from "react";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCountries } from "@/hooks/utilities/countries";
import { useDebounce } from "@/hooks/utilities/debounce";
import { SelectOptionType } from "@/types/general";

import { SelectSearchPicker } from "../inputs/select/select-search-picker";

interface SelectCountryIsoProps {
  selectedCountryCode?: string | null;
  setSelectedCountryCode: (code: string, country: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  helpText?: string;
  label?: string;
}

export const SelectCountryIso: FC<SelectCountryIsoProps> = ({
  selectedCountryCode,
  setSelectedCountryCode,
  error,
  disabled: fieldDisabled,
  required,
  helpText,
  label = "Country",
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearchInput = useDebounce(searchInput, 500);

  // Get all countries for search
  const { countries: searchedCountries, isLoading } = useCountries({
    search: debouncedSearchInput,
  });

  // Get selected country details
  const { countries: selectedCountries } = useCountries({
    codes: selectedCountryCode ? [selectedCountryCode] : [],
    searchCodesOrNone: true,
  });

  const selectPickerOptions: SelectOptionType[] = useMemo(() => {
    // Combine and deduplicate countries
    const allCountries = [...selectedCountries, ...searchedCountries];
    const uniqueCountries = allCountries.filter(
      (country, index, self) =>
        index === self.findIndex((c) => c.iso === country.iso),
    );

    return uniqueCountries.map(({ name, iso }) => ({
      name,
      value: iso,
    }));
  }, [searchedCountries, selectedCountries]);

  const triggerPlaceholder = useMemo(() => {
    if (!selectedCountryCode) {
      return "Select country";
    }
    if (selectedCountries.length === 0) {
      return "Unknown";
    }
    return selectedCountries[0].name;
  }, [selectedCountries, selectedCountryCode]);

  const handleOnChange = (values: string[]): void => {
    // For single select, take the first value or empty string
    const newValue = values[0] || "";
    if (newValue !== selectedCountryCode) {
      const selectedCountry = searchedCountries.find((c) => c.iso === newValue);
      setSelectedCountryCode(newValue, selectedCountry?.name || "");
    }
  };

  return (
    <FormItem>
      <FormLabel>
        {label} {required && "*"}
      </FormLabel>
      <FormControl>
        <SelectSearchPicker
          options={selectPickerOptions}
          selectedValues={selectedCountryCode ? [selectedCountryCode] : []}
          onChange={handleOnChange}
          onSearch={setSearchInput}
          placeholder="Search by name"
          searchPlaceholder="Search countries..."
          triggerPlaceholder={triggerPlaceholder}
          isMulti={false}
          isLoading={isLoading}
          disabled={fieldDisabled}
          error={error}
          // No infinite loading needed since it's local data
          hasMore={false}
          onLoadMore={() => {}}
          isLoadingMore={false}
          total={selectPickerOptions.length}
        />
      </FormControl>

      {helpText && <FormDescription>{helpText}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};
