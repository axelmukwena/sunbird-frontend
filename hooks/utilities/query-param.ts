import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { QueryParamKey } from "@/types/general";
import { ALL_QUERY_OPTIONS } from "@/utilities/constants/url-query";

type UseQueryParamReturn<T> = [
  T | null,
  (newValue: string) => void,
  (updates: Record<string, string>) => void,
];

export const useQueryParam = <T>(
  key: QueryParamKey,
  array = false,
): UseQueryParamReturn<T> => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const options = ALL_QUERY_OPTIONS[key];

  const getValidValue = useCallback((): T | null => {
    const rawValues = searchParams.getAll(key);
    const validValues: string[] = options
      ? rawValues.filter((value) =>
          options.some((option) => option.value === value),
        )
      : rawValues;
    if (!array) {
      return validValues.length > 0 ? (validValues[0] as unknown as T) : null;
    }
    return validValues as unknown as T;
  }, [searchParams, key, options, array]);

  const [value, setValue] = useState<T | null>(getValidValue);

  useEffect(() => {
    setValue(getValidValue());
  }, [getValidValue, searchParams]);

  const getUpdatedParams = ({
    params,
    updateKey,
    newValue,
  }: {
    params: URLSearchParams;
    updateKey: string;
    newValue: string;
  }): URLSearchParams => {
    if (!newValue) {
      params.delete(updateKey);
    } else if (array) {
      const currentValues = params.getAll(updateKey);
      const index = currentValues.indexOf(newValue);
      if (index > -1) {
        const updatedValues = currentValues.filter((v) => v !== newValue);
        params.delete(updateKey);
        if (updatedValues.length) {
          updatedValues.forEach((item) => params.append(updateKey, item));
        }
      } else {
        params.append(updateKey, newValue);
      }
    } else if (params.get(updateKey) === newValue) {
      params.delete(updateKey);
    } else {
      params.set(updateKey, newValue);
    }
    return params;
  };

  const updateQueryParams = useCallback(
    (newValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      getUpdatedParams({ params, updateKey: key, newValue });
      const newSearchString = params.toString();
      router.push(`${pathname}${newSearchString ? `?${newSearchString}` : ""}`);
    },
    [array, key, pathname, router, searchParams],
  );

  const updateMultipleQueryParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([updateKey, updateValue]) => {
        getUpdatedParams({ params, updateKey, newValue: updateValue });
      });
      const newSearchString = params.toString();
      router.push(`${pathname}${newSearchString ? `?${newSearchString}` : ""}`);
    },
    [pathname, router, searchParams],
  );

  return [value, updateQueryParams, updateMultipleQueryParams];
};
