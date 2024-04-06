import { SettlementAccount } from ".prisma/client";
import { useFetchSettlementAccount } from "./useFetchSettlementAccount";

type Filter = {
  id?: number;
};

export const useGenerateSettlementAccount = (filter?: Filter) => {
  const { settlementAccounts } = useFetchSettlementAccount();

  let filtered: SettlementAccount[] = settlementAccounts;

  if (settlementAccounts && filter) {
    if (filter.id) {
      filtered = filtered.filter((t) => t.id === filter.id);
    }
  }

  return settlementAccounts && filtered ? filtered : [];
};
