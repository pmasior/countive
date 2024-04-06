import {
  removeStringFromString,
  removeStringsFromString,
} from "./removeStringFromString";
import { compileVerboseRegex } from "src/common/utils/verboseRegex";
import {
  Entity,
  RecognizedField,
} from "./convertFastTransactionToTransaction.types";

/**
 * Recognize information in short transaction by regular expression
 * @param inputTransaction shorted transaction f.e. "12.12 -18.49 Sp Kau Kr"
 * @param fieldName field name in Transaction, where recognized value will be saved
 * @param regex regular expression which will be used to recognize value
 * @param convert fuction which converts recognized value to entity
 * @returns object with recognized field and inputTransaction without recognized information
 */
export const recognizeByRegex = <T>(
  inputTransaction: string,
  // TODO: change to mapped type
  fieldName: keyof Pick<
    RecognizedField,
    "date" | "amount" | "note" | "subcategory"
  >,
  regex: string,
  // TODO: change any to specified type
  convert: (foundValue: string) => { foundValue: string; parsedValue: any }
) => {
  let recognizedFields: RecognizedField = {};
  let foundValue;
  let parsedValue;

  foundValue = findValue(inputTransaction, regex);
  if (!foundValue) return { recognizedFields: {}, inputTransaction };

  ({ foundValue, parsedValue } = convert(foundValue));
  if (!parsedValue) return { recognizedFields: {}, inputTransaction };

  recognizedFields[fieldName] = parsedValue;
  inputTransaction = removeStringFromString(inputTransaction, foundValue);
  return { recognizedFields, inputTransaction };
};

/**
 * Recognize informations in short transaction by regular expression
 * @param inputTransaction shorted transaction f.e. "12.12 -18.49 Sp Kau Kr"
 * @param fieldName field name in Transaction, where recognized value will be saved
 * @param regex regular expression which will be used to recognize values
 * @param convert fuction which converts recognized values to entity
 * @returns object with recognized field and inputTransaction without recognized informations
 */
export const recognizeValuesByRegex = (
  inputTransaction: string,
  // TODO: change to mapped type
  fieldName: keyof Pick<RecognizedField, "tagIds">,
  regex: string,
  convert: (
    foundValues: string[],
    recognizableEntries?: Entity[]
  ) => { foundValues: string[]; parsedValues: number[] | null },
  recognizableEntries?: Entity[]
) => {
  let recognizedFields: RecognizedField = {};
  let foundValues;
  let parsedValues;

  foundValues = findValues(inputTransaction, regex);
  if (!foundValues) return { recognizedFields: {}, inputTransaction };

  ({ foundValues, parsedValues } = convert(foundValues, recognizableEntries));
  if (!parsedValues) return { recognizedFields: {}, inputTransaction };

  recognizedFields[fieldName] = parsedValues;
  inputTransaction = removeStringsFromString(inputTransaction, foundValues);
  return { recognizedFields, inputTransaction };
};

/**
 * Find value matched to regular expression
 * @param inputTransaction shorted transaction f.e. "12.12 -18.49 Sp Kau Kr"
 * @param regex regular expression which will be used to recognize values
 * @returns matched value
 */
const findValue = (inputTransaction: string, regex: string) => {
  const compiledRegex = compileVerboseRegex(regex);
  const matchedByRegex = inputTransaction.match(compiledRegex);
  return matchedByRegex?.[0];
};

/**
 * Find values matched to regular expression
 * @param inputTransaction shorted transaction f.e. "12.12 -18.49 Sp Kau Kr"
 * @param regex regular expression which will be used to recognize values
 * @returns matched values
 */
const findValues = (inputTransaction: string, regex: string) => {
  const compiledRegex = compileVerboseRegex(regex, "g");
  const matchedByRegex = inputTransaction.match(compiledRegex);
  return matchedByRegex;
};
