import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const mergeTailwind = (...inputs: ClassValue[]): string =>
  twMerge(clsx(inputs));
