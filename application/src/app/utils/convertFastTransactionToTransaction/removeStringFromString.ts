/**
 * Remove string from string
 * @param returned string which will be modified
 * @param found string which will be deleted from returned
 * @returns modified string
 */
export const removeStringFromString = (returned: string, found: string) =>
  returned.replace(found, "");

/**
 * Remove strings from string
 * @param returned string which will be modified
 * @param found strings which will be deleted from returned string
 * @returns modified string
 */
export const removeStringsFromString = (returned: string, found: string[]) => {
  const regexWithValuesToRemove = found.join("|");
  const compiledRegex = new RegExp(regexWithValuesToRemove, "g");
  return returned.replace(compiledRegex, "");
};
