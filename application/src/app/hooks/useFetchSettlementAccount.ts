import { SettlementAccount } from "@prisma/client";
import { API_SETTLEMENT_ACCOUNT_URL } from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";

export const useFetchSettlementAccount = () => {
  const fetchReturn = useFetchSWR<SettlementAccount[]>(
    API_SETTLEMENT_ACCOUNT_URL
  );
  return { settlementAccounts: fetchReturn.data || [], ...fetchReturn };
};
