import { Currency } from "@prisma/client";
import { API_CURRENCY_URL } from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";

export const useFetchCurrency = () => {
  const fetchReturn = useFetchSWR<Currency[]>(API_CURRENCY_URL);
  return { currencies: fetchReturn.data || [], ...fetchReturn };
};
