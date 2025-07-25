import { z } from "zod";

export const URL_REQUIRED_FORM_SCHEMA = z
  .string()
  .min(1, "URL is required")
  .transform((currentValue) => {
    const doesNotStartWithHttp =
      currentValue &&
      !(
        currentValue.startsWith("http://") ||
        currentValue.startsWith("https://")
      );

    if (doesNotStartWithHttp) {
      return `http://${currentValue}`;
    }
    return currentValue;
  })
  .pipe(z.url("URL is not valid"));

export const URL_OPTIONAL_FORM_SCHEMA = z
  .string()
  .optional()
  .transform((currentValue) => {
    if (!currentValue) return undefined;

    const doesNotStartWithHttp =
      currentValue &&
      !(
        currentValue.startsWith("http://") ||
        currentValue.startsWith("https://")
      );

    if (doesNotStartWithHttp) {
      return `http://${currentValue}`;
    }
    return currentValue;
  })
  .pipe(z.url("URL is not valid").optional());

export type UrlFormSchema = z.infer<typeof URL_REQUIRED_FORM_SCHEMA>;
export type UrlOptionalFormSchema = z.infer<typeof URL_OPTIONAL_FORM_SCHEMA>;
