export const defaultLocale = "ar" as const;
export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
