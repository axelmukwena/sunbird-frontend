import { z } from "zod";

export const MONEY_OPTIONAL_FORM_SCHEMA = z
  .union([z.string(), z.number()])
  .transform((value) => {
    if (value === "" || value === null || value === undefined) {
      return null;
    }
    return typeof value === "string" ? parseFloat(value) : value;
  })
  .pipe(
    z
      .number({
        error: "Value must be a number.",
      })
      .min(0, "Value must be a positive number.")
      .refine((value) => {
        const moneyRegex = /^(\d{1,3}(,\d{3})*|\d+)(\.\d{0,2})?$/;
        return moneyRegex.test(value.toString());
      }, "Monetary values should be in the format of money: 0.00")
      .nullable(),
  )
  .optional();

export const MONEY_REQUIRED_FORM_SCHEMA = z
  .union([z.string(), z.number()])
  .transform((value) => {
    if (value === "" || value === null || value === undefined) {
      return null;
    }
    return typeof value === "string" ? parseFloat(value) : value;
  })
  .pipe(
    z
      .number({
        error: "Value must be a number.",
      })
      .min(0, "Value must be a positive number.")
      .refine((value) => {
        if (value === null || value === undefined) {
          return false;
        }
        const moneyRegex = /^(\d{1,3}(,\d{3})*|\d+)(\.\d{0,2})?$/;
        return moneyRegex.test(value.toString());
      }, "Monetary values should be in the format of money: 0.00"),
  );

export const CURRENCY_CODE_REQUIRED_FORM_SCHEMA = z
  .string()
  .min(1, "Currency code is required")
  .refine(
    (value) => value.length === 3,
    "Currency code must be 3 characters long",
  )
  .refine(
    (value) => /^[a-zA-Z]+$/.test(value),
    "Currency code must contain only alphabet characters",
  );

export const CURRENCY_CODE_OPTIONAL_FORM_SCHEMA = z
  .string()
  .optional()
  .refine(
    (value) => !value || value.length === 3,
    "Currency code must be 3 characters long",
  )
  .refine(
    (value) => !value || /^[a-zA-Z]+$/.test(value),
    "Currency code must contain only alphabet characters",
  );

export type MoneyFormSchema = z.infer<typeof MONEY_OPTIONAL_FORM_SCHEMA>;
export type MoneyRequiredFormSchema = z.infer<
  typeof MONEY_REQUIRED_FORM_SCHEMA
>;
export type CurrencyCodeRequiredFormSchema = z.infer<
  typeof CURRENCY_CODE_REQUIRED_FORM_SCHEMA
>;
export type CurrencyCodeOptionalFormSchema = z.infer<
  typeof CURRENCY_CODE_OPTIONAL_FORM_SCHEMA
>;
