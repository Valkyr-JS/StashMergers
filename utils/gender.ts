/** File converted from
 * https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/utils/gender.ts
 * */

/** A map of gender strings with each enum for use in pace of the const enum. */
export const stringGenderMap = new Map<string, GenderEnum>([
  ["Male", GenderEnum.Male],
  ["Female", GenderEnum.Female],
  ["Transgender Male", GenderEnum.TransgenderMale],
  ["Transgender Female", GenderEnum.TransgenderFemale],
  ["Intersex", GenderEnum.Intersex],
  ["Non-Binary", GenderEnum.NonBinary],
]);

/** Helper function to convert a GenderEnum to a string. */
export const genderToString = (value?: GenderEnum | string | null) => {
  if (!value) {
    return undefined;
  }

  const foundEntry = Array.from(stringGenderMap.entries()).find((e) => {
    return e[1] === value;
  });

  if (foundEntry) {
    return foundEntry[0];
  }
};

/** Helper function to convert a string to a GenderEnum. */
export const stringToGender = (
  value?: string | null,
  caseInsensitive?: boolean
): GenderEnum | undefined => {
  if (!value) {
    return undefined;
  }

  const existing = Object.entries(stringGenderMap).find((e) => e[1] === value);
  if (existing) return existing[1];

  const ret = stringGenderMap.get(value);
  if (ret || !caseInsensitive) {
    return ret;
  }

  const asUpper = value.toUpperCase();
  const foundEntry = Array.from(stringGenderMap.entries()).find((e) => {
    return e[0].toUpperCase() === asUpper;
  });

  if (foundEntry) {
    return foundEntry[1];
  }
};

export const genderStrings = Array.from(stringGenderMap.keys());
