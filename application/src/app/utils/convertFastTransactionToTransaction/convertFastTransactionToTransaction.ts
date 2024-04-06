import {
  RecognizableEntries,
  RecognizedField,
} from "./convertFastTransactionToTransaction.types";
import { mergeToObject } from "./mergeToObject";
import { recognizeAmount } from "./recognizeAmount";
import { recognizeDate } from "./recognizeDate";
import { recognizeMethodOfPayment } from "./recognizeMethodOfPayment";
import { recognizeNote } from "./recognizeNote";
import { recognizeSettlementAccount } from "./recognizeSettlementAccount";
import { recognizeSubcategory } from "./recognizeSubcategory";
import { recognizeTag } from "./recognizeTags";
import { splitToWords } from "./splitToWords";

/**
 * Convert shorted transaction write by user into correct Transaction object
 * @param inputTransaction shorted transaction f.e. "12.12 -18.49 Sp Kau Kr"
 * @param recognizableEntries array with objects which could be recognized in inputTransaction
 * @returns Transaction object with recognized informations
 */
export const convertFastTransactionToTransaction = (
  inputTransaction: string,
  recognizableEntries: RecognizableEntries
) => {
  const { subcategories, tags, settlementAccounts, methodOfPayments } =
    recognizableEntries;
  let recognizedFields: RecognizedField = {};
  let transaction: RecognizedField = {};

  ({ recognizedFields, inputTransaction } = recognizeDate(inputTransaction));
  mergeToObject(transaction, recognizedFields);

  ({ recognizedFields, inputTransaction } = recognizeAmount(inputTransaction));
  mergeToObject(transaction, recognizedFields);

  ({ recognizedFields, inputTransaction } = recognizeNote(inputTransaction));
  mergeToObject(transaction, recognizedFields);

  ({ recognizedFields, inputTransaction } = recognizeSubcategory(
    inputTransaction,
    subcategories
  ));
  mergeToObject(transaction, recognizedFields);

  ({ recognizedFields, inputTransaction } = recognizeSettlementAccount(
    inputTransaction,
    settlementAccounts
  ));
  mergeToObject(transaction, recognizedFields);

  ({ recognizedFields, inputTransaction } = recognizeMethodOfPayment(
    inputTransaction,
    methodOfPayments.filter(
      (m) => m.settlementAccountId === transaction.settlementAccountId
    )
  ));
  mergeToObject(transaction, recognizedFields);

  ({ recognizedFields, inputTransaction } = recognizeTag(
    inputTransaction,
    tags
  ));
  mergeToObject(transaction, recognizedFields);

  const unprocessabled = splitToWords(inputTransaction);

  return {
    transaction,
    unprocessabled,
  };
};
