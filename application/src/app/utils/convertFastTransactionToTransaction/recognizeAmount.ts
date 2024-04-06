import { Prisma } from "@prisma/client";
import { recognizeByRegex } from "./recognizeByRegex";

const DIGITS = String.raw`\d+`;
const DECIMAL_SEPARATOR = String.raw`[,.]`;
const MINUS_OR_PLUS = String.raw`[+-]`;

export const AMOUNT_REGEX = String.raw`
  ${MINUS_OR_PLUS}?\ ?${DIGITS}${DECIMAL_SEPARATOR}\ ?${DIGITS}  # ex: 30,00
  |
  ${MINUS_OR_PLUS}?${DIGITS}${DECIMAL_SEPARATOR}? # ex: 30 +30 -30 +30. -30,
`;

export const recognizeAmount = (inputTransaction: string) =>
  recognizeByRegex(inputTransaction, "amount", AMOUNT_REGEX, convertToAmount);

/**
 * Convert found amount to correct Decimal object
 * @param foundValue string matching to AMOUNT_REGEX regular expression
 * @returns object with foundValue and foundValue convert to correct Decimal
 */
export const convertToAmount = (foundValue: string) => {
  let parsedValue;
  parsedValue = foundValue.replace(",", ".");
  parsedValue = parsedValue.replace(" ", "");
  parsedValue = new Prisma.Decimal(parsedValue);
  return { foundValue, parsedValue };
};
