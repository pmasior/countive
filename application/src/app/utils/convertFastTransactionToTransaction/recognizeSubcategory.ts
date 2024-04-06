import { Entity } from "./convertFastTransactionToTransaction.types";
import { recognizeByPrediction } from "./recognizeByPrediction";

export const recognizeSubcategory = (
  inputTransaction: string,
  recognizableEntries: Entity[]
) =>
  recognizeByPrediction(inputTransaction, "subcategory", recognizableEntries);
