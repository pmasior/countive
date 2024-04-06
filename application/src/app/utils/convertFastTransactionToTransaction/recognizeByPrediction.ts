import {
  Entity,
  RecognizedField,
} from "./convertFastTransactionToTransaction.types";
import {
  removeStringFromString,
  removeStringsFromString,
} from "./removeStringFromString";
import { splitToWords } from "./splitToWords";

/**
 * Recognize information in short transaction by recognizacleEntries
 * @param inputTransaction shorted transaction f.e. "12.12 -18.49 Sp Kau Kr"
 * @param fieldName field name in Transaction, where recognized value will be saved
 * @param recognizableEntries array with objects which could be recognized in inputTransaction
 * @returns object with recognized field and inputTransaction without recognized information
 */
export const recognizeByPrediction = (
  inputTransaction: string,
  fieldName: keyof RecognizedField,
  recognizableEntries: Entity[]
) => {
  let recognizedFields: RecognizedField = {};

  const words = splitToWords(inputTransaction);
  if (!words) return { recognizedFields: {}, inputTransaction };

  const { foundValue, id } = findOneEntity(words, recognizableEntries);
  if (!foundValue || !id) return { recognizedFields: {}, inputTransaction };

  recognizedFields[fieldName] = id;
  inputTransaction = removeStringFromString(inputTransaction, foundValue);

  return { recognizedFields, inputTransaction };
};

/**
 * Recognize informations in short transaction by recognizacleEntries
 * @param inputTransaction shorted transaction f.e. "12.12 -18.49 Sp Kau Kr"
 * @param fieldName field name in Transaction, where recognized values will be saved
 * @param recognizableEntries array with objects which could be recognized in inputTransaction
 * @returns object with recognized field and inputTransaction without recognized informations
 */
export const recognizeManyByPrediction = (
  inputTransaction: string,
  // TODO: change to mapped type
  fieldName: keyof Pick<RecognizedField, "tagIds">,
  recognizableEntries: Entity[]
) => {
  let recognizedFields: RecognizedField = {};

  const words = splitToWords(inputTransaction);
  if (!words) return { recognizedFields: {}, inputTransaction };

  const { foundValues, ids } = findManyEntities(words, recognizableEntries);
  if (!foundValues || !ids) return { recognizedFields: {}, inputTransaction };

  recognizedFields[fieldName] = ids;
  inputTransaction = removeStringsFromString(inputTransaction, foundValues);

  return { recognizedFields, inputTransaction };
};

/**
 * Recognize informations in array of words based on recognizableEntries
 * @param words array with words to recognize one or more of them
 * @param recognizableEntries array with objects which could be recognized in words
 * @returns object with recognized values from inputTransaction and values to save in Transaction
 */
export const findManyEntities = (
  words: RegExpMatchArray,
  recognizableEntries: Entity[]
) => {
  let foundValues: string[] = [];
  let ids: number[] = [];

  words &&
    words.forEach((w) => {
      const foundEntity = findEntityForWord(w, recognizableEntries);
      if (!foundEntity) return;

      foundValues.push(w);
      ids.push(foundEntity.id);
    });

  return {
    foundValues: foundValues.length > 0 ? foundValues : null,
    ids: ids.length > 0 ? ids : null,
  };
};

/**
 * Recognize information in array of words based on recognizableEntries
 * @param words array with words to recognize one of them
 * @param recognizableEntries array with objects which could be recognized in words
 * @returns object with recognized value from inputTransaction and value to save in Transaction
 */
export const findOneEntity = (
  words: RegExpMatchArray,
  recognizableEntries: Entity[]
) => {
  let foundValue: string | null = null;
  let id: number | null = null;
  let foundMoreThanOneEntity = false;

  words &&
    words.forEach((w) => {
      const foundEntity = findEntityForWord(w, recognizableEntries);
      if (!foundEntity) return;

      if (id) foundMoreThanOneEntity = true;
      id = foundEntity?.id;
      foundValue = w;
    });

  return {
    foundValue: foundMoreThanOneEntity ? null : foundValue,
    id: foundMoreThanOneEntity ? null : id,
  };
};

/**
 * Find one entity matching the word
 * @param word word which wil be match to one of recognizableEntries
 * @param recognizableEntries array with objects which could be recognized in word
 * @returns if find entity then return this entity, otherwise return null
 */
export const findEntityForWord = (
  word: string,
  recognizableEntries: Entity[]
) => {
  const startsWithRegex = new RegExp(`^${word}.*`, "i");
  const matchesToWord = findEntriesMatchingToRegex(
    recognizableEntries,
    startsWithRegex
  );
  if (matchesToWord.length === 1) {
    return matchesToWord[0];
  } else if (matchesToWord.length > 1) {
    console.warn(
      `Recognize more than one entity ${JSON.stringify(matchesToWord)}`
    );
    return null;
  }
};

/**
 * Find entities matching the regex
 * @param recognizableEntries array with objects which could be recognized in word
 * @param startsWithRegex regex which will be try to match in recognizableEntries
 * @returns object with number of matching chars and properties of matching entry
 */
const findEntriesMatchingToRegex = (
  recognizableEntries: Entity[],
  startsWithRegex: RegExp
) => {
  const matchingEntries = recognizableEntries.map((e) => {
    const matchingChars = e.name.match(startsWithRegex)?.[0].length || 0;
    if (matchingChars > 0) return { matchingChars, ...e };
  });
  // TODO: check _.maxBy()
  return matchingEntries.filter((e) => e);
};
