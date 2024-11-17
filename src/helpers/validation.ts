/** Check a provided string is a valid Stash date string; i.e formated as
 * YYYY-MM-DD  */
export const validateDateString = (val: string): boolean => {
  // Check date string is valid
  const isDate = !!Date.parse(val);

  // Check each segment of the date is a valid length
  const yyyyIs4 = val.split("-")[0].length === 4;
  const mmIs2 =
    val.split("-").length > 1 ? val.split("-")[1].length === 2 : true;
  const ddIs2 =
    val.split("-").length > 2 ? val.split("-")[2].length === 2 : true;

  return isDate && yyyyIs4 && mmIs2 && ddIs2;
};

/** Validate that a string contains only whole numbers. Set `wholeOnly` to true
 * to only allow whole numbers. */
export const validateNumString = (
  val: string,
  wholeOnly?: boolean
): boolean => {
  const isNum = !!+val;
  const isWhole = isNum && !val.includes(".");

  return wholeOnly ? isWhole : isNum;
};

/** Validate that an array contains only unique values. */
export const validateArrayContainsOnlyUniques = (arr: any[]): boolean => {
  const unique = Array.from(new Set([...arr]));
  return unique.length === arr.length;
};

/** Compare two arrays and return a boolean indicating whether they match. */
export const compareArrays = (a: any[], b: any[]) =>
  a.length === b.length && a.every((element, index) => element === b[index]);
