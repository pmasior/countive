import { TransactionWithRelations } from "backend/types/TransactionWithRelations";
import { API_TRANSACTION_URL } from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";

export const useFetchTransaction = (id: number) => {
  const fetchReturn = useFetchSWR<TransactionWithRelations>(
    `${API_TRANSACTION_URL}/${id}`
  );
  return { transaction: fetchReturn.data, ...fetchReturn };
};

export const useFetchTransactions = () => {
  const fetchReturn =
    useFetchSWR<TransactionWithRelations[]>(API_TRANSACTION_URL);
  return { transactions: fetchReturn.data || [], ...fetchReturn };
};
