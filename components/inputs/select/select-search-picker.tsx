"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import React, { Fragment, useEffect, useMemo, useState } from "react";

import { Spinner } from "@/components/loaders/spinner";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectOptionType } from "@/types/general";
import { mergeTailwind } from "@/utilities/helpers/tailwind";
import { pluralize } from "@/utilities/helpers/text";

export interface SelectSearchPickerProps {
  options: SelectOptionType[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  triggerPlaceholder?: React.ReactNode;
  isMulti?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  error?: string;
  width?: string;
  className?: string;
  onSearch?: (searchTerm: string) => void;
  addNewButton?: {
    name: string;
    onClick: () => void;
  };
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  total?: number;
}

export const SelectSearchPicker: React.FC<SelectSearchPickerProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  triggerPlaceholder,
  isMulti = false,
  isLoading = false,
  disabled = false,
  error,
  width = "w-full",
  className,
  onSearch,
  addNewButton,
  hasMore = false,
  onLoadMore,
  isLoadingMore = false,
  total = 0,
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (!onSearch) {
      setFilteredOptions(
        options.filter(
          (option) =>
            option.value.toLowerCase().includes(searchValue.toLowerCase()) ||
            option.name?.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    } else {
      setFilteredOptions(options);
    }
  }, [options, searchValue, onSearch]);

  const handleSearch = (value: string): void => {
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSelect = (currentValue: string): void => {
    if (isMulti) {
      // Multi-select logic
      if (selectedValues.includes(currentValue)) {
        // Remove if already selected
        onChange(selectedValues.filter((val) => val !== currentValue));
      } else {
        // Add to selection
        onChange([...selectedValues, currentValue]);
      }
      // Keep dropdown open for multi-select
    } else {
      // Single select logic
      const newValue = currentValue === selectedValues[0] ? [] : [currentValue];
      onChange(newValue);
      setOpen(false);
    }
  };

  const buttonText = useMemo(() => {
    if (selectedValues.length === 0) {
      return triggerPlaceholder || placeholder;
    }

    if (isMulti) {
      if (selectedValues.length === 1) {
        const selectedOption = options.find(
          (opt) => opt.value === selectedValues[0],
        );
        return selectedOption?.name || selectedValues[0];
      }
      return `${selectedValues.length} ${pluralize("item", selectedValues.length)} selected`;
    }

    const selectedOption = options.find(
      (opt) => opt.value === selectedValues[0],
    );
    return (
      <Fragment>
        {selectedOption?.name || selectedValues[0]}{" "}
        {selectedOption?.required && <span className="text-red-500">*</span>}
      </Fragment>
    );
  }, [selectedValues, options, triggerPlaceholder, placeholder, isMulti]);

  if (disabled) {
    return (
      <div className={mergeTailwind("flex flex-col gap-1.5", width, className)}>
        <Button
          variant="outline"
          disabled
          className="w-full justify-between text-left font-normal"
        >
          <span className="truncate">{buttonText}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className={mergeTailwind("flex flex-col gap-1.5", width, className)}>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left font-normal"
          >
            <span className="truncate">{buttonText}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
          <Command className={onSearch ? "" : "py-1.5"} shouldFilter={false}>
            {onSearch && (
              <CommandInput
                placeholder={searchPlaceholder}
                value={searchValue}
                onValueChange={handleSearch}
                className="h-9"
              />
            )}
            <CommandList className="max-h-[300px]">
              <CommandEmpty className="flex items-center gap-2 py-2 px-3 text-sm">
                {isLoading && (
                  <Fragment>
                    <Spinner /> Loading
                  </Fragment>
                )}
                {!isLoading && "No results found."}
              </CommandEmpty>

              {!!filteredOptions.length && (
                <CommandGroup>
                  {/* Show total count if available */}
                  {total > 0 && (
                    <div className="px-2 py-1.5 text-xs text-muted-foreground border-b bg-muted/50">
                      Showing {filteredOptions.length} of {total} options
                      {selectedValues.length > 0 &&
                        ` • ${selectedValues.length} selected`}
                    </div>
                  )}

                  {filteredOptions.map((option, index) => (
                    <CommandItem
                      key={`${option.value}-${index}`}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={() =>
                        !option.disabled && handleSelect(option.value)
                      }
                      className={`${
                        option.disabled ? "opacity-50 cursor-not-allowed" : ""
                      } mb-0.5 cursor-pointer`}
                    >
                      <div className="flex flex-col justify-between w-full">
                        <div className="flex items-center">
                          <span>
                            {option.name}
                            {option.required && (
                              <span className="ml-0.5">*</span>
                            )}
                          </span>
                          <Check
                            className={mergeTailwind(
                              "ml-auto h-4 w-4 stroke-3",
                              selectedValues.includes(option.value)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </div>
                        {option.caption && (
                          <span className="text-xs text-muted-foreground">
                            {option.caption}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}

                  {/* Load more button */}
                  {hasMore && !isLoadingMore && onLoadMore && (
                    <div className="p-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                        onClick={(e) => {
                          e.preventDefault();
                          onLoadMore();
                        }}
                      >
                        Load More ({(total || 0) - filteredOptions.length}{" "}
                        remaining)
                      </Button>
                    </div>
                  )}

                  {/* Loading more indicator */}
                  {isLoadingMore && (
                    <div className="flex items-center justify-center py-2 text-xs text-muted-foreground border-t">
                      <Spinner className="mr-2 h-3 w-3" />
                      Loading more...
                    </div>
                  )}

                  {/* Add new button */}
                  {addNewButton && !isLoading && (
                    <div className="p-1 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(false);
                          addNewButton.onClick();
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {addNewButton.name}
                      </Button>
                    </div>
                  )}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
};
