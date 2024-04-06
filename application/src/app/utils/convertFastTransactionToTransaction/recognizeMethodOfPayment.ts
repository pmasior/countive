import { Entity } from "./convertFastTransactionToTransaction.types";
import { recognizeByPrediction } from "./recognizeByPrediction";

export const recognizeMethodOfPayment = (
  inputTransaction: string,
  recognizableEntries: Entity[]
) =>
  recognizeByPrediction(
    inputTransaction,
    "methodOfPaymentId",
    recognizableEntries
  );
