import { Entity } from "./convertFastTransactionToTransaction.types";
import { recognizeByPrediction } from "./recognizeByPrediction";

export const recognizeSettlementAccount = (
  inputTransaction: string,
  recognizableEntries: Entity[]
) =>
  recognizeByPrediction(
    inputTransaction,
    "settlementAccountId",
    recognizableEntries
  );
