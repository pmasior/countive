import { MethodOfPayment } from "@prisma/client";
import { API_METHOD_OF_PAYMENT_URL } from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";

export const useFetchMethodOfPayment = () => {
  const fetchReturn = useFetchSWR<MethodOfPayment[]>(API_METHOD_OF_PAYMENT_URL);
  return { methodOfPayments: fetchReturn.data || [], ...fetchReturn };
};
