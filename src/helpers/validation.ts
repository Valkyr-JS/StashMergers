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
