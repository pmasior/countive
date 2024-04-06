import { TransactionWithRelations } from "backend/types/TransactionWithRelations";
import { isArray, isNumber } from "lodash";
import { useFetchTransactions } from "./useFetchTransaction";

type Filter = {
  subcategoryId?: number | number[];
  addedAt?: (e: Date) => boolean;
};

export const useGenerateTransactions = (filter?: Filter) => {
  const { transactions } = useFetchTransactions();

  let filtered: TransactionWithRelations[] = transactions;

  if (transactions && filter) {
    if (filter.subcategoryId) {
      if (isNumber(filter.subcategoryId)) {
        filtered = filtered.filter(
          (t) => t.subcategoryId === filter.subcategoryId
        );
      } else if (isArray(filter.subcategoryId)) {
        filtered = filtered.filter((t) =>
          (filter.subcategoryId as number[])?.includes(t.subcategoryId)
        );
      }
    }
    if (filter.addedAt) {
      filtered = filtered.filter(
        (t) => filter.addedAt && filter.addedAt(new Date(t.addedAt))
      );
    }
    return filtered;
  }
  return transactions ? transactions : [];
};
