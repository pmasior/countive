import { compileVerboseRegex } from "src/common/utils/verboseRegex";

/**
 * Split string by whitespaces into array of words
 * @param inputTransaction input string with words separated by whitespaces
 * @returns array with words
 */
export const splitToWords = (inputTransaction: string) => {
  const WORD_REGEX = String.raw`\w+`;
  const compiledRegex = compileVerboseRegex(WORD_REGEX, "g");
  return inputTransaction.match(compiledRegex);
};
