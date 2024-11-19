/** File converted from
 * https://github.com/stashapp/stash/blob/master/ui/v2.5/src/utils/circumcised.ts
 * */

/** A map of circumsised strings with each enum for use in place of the cost
 * enum. */
export const stringCircumMap = new Map<string, CircumisedEnum>([
  ["Uncut", CircumisedEnum.Uncut],
  ["Cut", CircumisedEnum.Cut],
]);

/** Helper function to sonvert a CircumisedEnum to a string */
export const circumcisedToString = (value?: CircumisedEnum | String | null) => {
  if (!value) {
    return undefined;
  }

  const foundEntry = Array.from(stringCircumMap.entries()).find((e) => {
    return e[1] === value;
  });

  if (foundEntry) {
    return foundEntry[0];
  }
};

/** Helper function to convert a string to a CircumisedEnum. */
export const stringToCircumcised = (
  value?: string | null,
  caseInsensitive?: boolean
): CircumisedEnum | undefined => {
  if (!value) {
    return undefined;
  }

  const existing = Object.entries(stringCircumMap).find((e) => e[1] === value);
  if (existing) return existing[1];

  const ret = stringCircumMap.get(value);
  if (ret || !caseInsensitive) {
    return ret;
  }
  const asUpper = value.toUpperCase();
  const foundEntry = Array.from(stringCircumMap.entries()).find((e) => {
    return e[0].toUpperCase() === asUpper;
  });

  if (foundEntry) {
    return foundEntry[1];
  }
};

export const circumcisedStrings = Array.from(stringCircumMap.keys());
