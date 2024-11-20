import * as Countries from "i18n-iso-countries";
Countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

/** Converts a country ISO code to its country name. */
export const getCountryByISO = (
  iso: string | null | undefined,
  locale: string = "en"
): string | undefined => {
  if (!iso) return;

  const ret = Countries.getName(iso, getLocaleCode(locale));
  if (ret) {
    return ret;
  }

  // fallback to english if locale is not en
  if (locale !== "en") {
    return Countries.getName(iso, "en");
  }
};

/** Returns an array of all countries in an object containing { label: name,
 * value: ISO code } */
export const getCountries = (locale: string = "en") => {
  let countries = Countries.getNames(getLocaleCode(locale));
  if (!countries.length) {
    countries = Countries.getNames("en");
  }

  return Object.entries(countries).map(([code, name]) => ({
    label: name,
    value: code,
  }));
};

/** Converts a country name to its ISO code. */
export const getISOByCountry = (name: string, locale: string = "en") => {
  return (
    Countries.getAlpha2Code(name, locale) ?? Countries.getAlpha2Code(name, "en")
  );
};

/** Converts a country ISO code to its local code variant */
export const getLocaleCode = (code: string) => {
  if (code === "zh-CN") return "zh";
  if (code === "zh-TW") return "tw";
  return code.slice(0, 2);
};
