/**
 * Remove comments (text after #) and spaces not preceded by backslash
 *
 * 1. Remove whitespaces before first glyph (char other than whitespace)
 * 2. After last real regex glyph removes whitespaces and comment preceded by #
 * 3. Remove spaces not preceed by backslash
 * 4. Change "\ " to " " (space)
 * 5. Remove all remaining whitespaces
 *
 * @param regex regular expression with comments
 * @returns regular expression without comments
 */
export const removeCommentsFromRegex = (regex: string) =>
  regex
    .replace(/^\s*(.+)$/gm, "$1")
    .replace(/(.+)\s+#.*$/gm, "$1")
    .replace(/(?<!\\) /g, "")
    .replace(/\\ /g, " ")
    .replace(/[\t\n\r\f\v]/g, "");

/**
 * Remove comments form regex and compile this regex
 * @param regex regular expression with comments
 * @param flags flags passed to RegExp object
 * @returns compiled regular expression without comments
 */
export const compileVerboseRegex = (regex: string, flags?: string) => {
  const regexWithoutComments = removeCommentsFromRegex(regex);
  return new RegExp(regexWithoutComments, flags);
};
