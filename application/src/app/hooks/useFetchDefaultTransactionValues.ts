import { DefaultTransactionValues } from "@prisma/client";
import { API_DEFAULT_TRANSACTION_VALUES_URL } from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";

export const useFetchDefaultTransactionValues = () => {
  const fetchReturn = useFetchSWR<DefaultTransactionValues[]>(
    API_DEFAULT_TRANSACTION_VALUES_URL
  );
  return { defaultTransactionValues: fetchReturn.data || [], ...fetchReturn };
};
