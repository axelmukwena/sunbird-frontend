import { useAtom } from "jotai";
import { useEffect } from "react";

import { previousPathnameAtom } from "@/store/previousPathname";

import { LocalStorageKey } from "../../storage/local/enum";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../storage/local/storage";

interface UsePreviousPathname {
  previousPathname?: string | null;
  setPreviousPathname: (pathname: string) => void;
}

export const usePreviousPathname = (): UsePreviousPathname => {
  const [previousPathname, setPreviousPathname] = useAtom(previousPathnameAtom);

  useEffect(() => {
    const value = getLocalStorageItem(LocalStorageKey.PREVIOUS_PATHNAME);
    if (value) {
      setPreviousPathname(value as string);
    }
  }, [setPreviousPathname]);

  const handleSetPreviousPathname = (pathname: string): void => {
    setPreviousPathname(pathname);
    setLocalStorageItem(LocalStorageKey.PREVIOUS_PATHNAME, pathname);
  };

  return {
    previousPathname,
    setPreviousPathname: handleSetPreviousPathname,
  };
};
