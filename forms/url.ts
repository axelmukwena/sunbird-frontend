import * as Yup from "yup";
import { z } from "zod";

const isUrlValid = (value: string): boolean => {
  try {
    const yupSchema = Yup.string()
      .url("URL is not valid")
      .required("URL is required")
      .transform((val) => {
        if (val && !val.startsWith("http://") && !val.startsWith("https://")) {
          return `http://${val}`;
        }
        return val;
      });
    yupSchema.validateSync(value);
    return true;
  } catch {
    return false;
  }
};

export const URL_REQUIRED_FORM_SCHEMA = z
  .string()
  .min(1, "URL is required")
  .refine((value) => isUrlValid(value), "URL is not valid");

export const URL_OPTIONAL_FORM_SCHEMA = z
  .string()
  .optional()
  .refine((value) => {
    if (!value) {
      return true;
    }
    return isUrlValid(value);
  }, "URL is not valid");

export type UrlFormSchema = z.infer<typeof URL_REQUIRED_FORM_SCHEMA>;
export type UrlOptionalFormSchema = z.infer<typeof URL_OPTIONAL_FORM_SCHEMA>;
