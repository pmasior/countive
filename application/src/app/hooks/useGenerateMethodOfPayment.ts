import { MethodOfPayment } from ".prisma/client";
import { mapMethodOfPaymentsToNested } from "../utils/entitiesMapper/mapMethodOfPayment";
import { useFetchIcons } from "./useFetchIcons";
import { useFetchMethodOfPayment } from "./useFetchMethodOfPayment";
import { useFetchSettlementAccount } from "./useFetchSettlementAccount";

type Filter = {
  id?: number;
};

export const useGenerateMethodOfPayment = (filter?: Filter) => {
  const { methodOfPayments } = useFetchMethodOfPayment();
  const { icons } = useFetchIcons();
  const { settlementAccounts } = useFetchSettlementAccount();

  let filtered: MethodOfPayment[] = methodOfPayments;

  if (methodOfPayments && filter) {
    if (filter.id) {
      filtered = filtered.filter((t) => t.id === filter.id);
    }
  }

  return methodOfPayments && icons && settlementAccounts
    ? mapMethodOfPaymentsToNested({
        methodOfPayments: filtered,
        icons,
        settlementAccounts,
      })
    : [];
};
