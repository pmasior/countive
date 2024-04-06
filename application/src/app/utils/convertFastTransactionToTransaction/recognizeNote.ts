import { recognizeByRegex } from "./recognizeByRegex";

export const NOTE_REGEX = String.raw`
  [\`\'\"].*$
`;

export const recognizeNote = (inputTransaction: string) =>
  recognizeByRegex(inputTransaction, "note", NOTE_REGEX, convertToNote);

/**
 * Convert found note to note without begin ', `, or "" char
 * @param foundValue string matching to NOTE_REGEX regular expression
 * @returns object with foundValue and foundValue convert to correct Note
 */
export const convertToNote = (foundValue: string) => {
  const parsedValue = foundValue.replace(/`|'|"/g, "");
  return { foundValue, parsedValue };
};
