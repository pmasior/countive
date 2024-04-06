import {
  Entity,
  RecognizedField,
} from "./convertFastTransactionToTransaction.types";
import { mergeToObject } from "./mergeToObject";
import {
  findManyEntities,
  recognizeManyByPrediction,
} from "./recognizeByPrediction";
import { recognizeValuesByRegex } from "./recognizeByRegex";

export const TAG_REGEX = String.raw`
  #\S+
`;

/**
 * Recognize tags in shorted transaction based on regular expressions and matching existing tags
 * @param inputTransaction shorted transaction f.e. "12.12 -18.49 Sp Kau Kr"
 * @param recognizableEntries array with objects which could be recognized in inputTransaction
 * @returns object with recognized field and inputTransaction without recognized informations
 */
export const recognizeTag = (
  inputTransaction: string,
  recognizableEntries: Entity[]
) => {
  let recognizedByRegex: RecognizedField;
  ({ recognizedFields: recognizedByRegex, inputTransaction } =
    recognizeValuesByRegex(
      inputTransaction,
      "tagIds",
      TAG_REGEX,
      convertToTags,
      recognizableEntries
    ));

  let recognizedByPrediction: RecognizedField = {};
  ({ recognizedFields: recognizedByPrediction, inputTransaction } =
    recognizeManyByPrediction(inputTransaction, "tagIds", recognizableEntries));

  let recognizedFields: RecognizedField = {};
  mergeToObject(recognizedFields, recognizedByRegex);
  mergeToObject(recognizedFields, recognizedByPrediction);

  return { recognizedFields, inputTransaction };
};

/**
 * Convert found tag names to existing tags id
 * @param foundValues string matching to DATE_REGEX regular expression
 * @param recognizableEntries array with objects which could be recognized in foundValues
 * @returns object with foundValue and parsedValues which contains tags ids
 */
export const convertToTags = (
  foundValues: string[],
  recognizableEntries?: Entity[]
) => {
  if (!recognizableEntries)
    throw new Error(
      "Missing recognizableEntries argument in convertToTags function"
    );
  let parsedValues;
  foundValues = foundValues.map((v) => v.replace("#", ""));
  ({ ids: parsedValues } = findManyEntities(foundValues, recognizableEntries));
  return { foundValues, parsedValues };
};
