import { Icon, MethodOfPayment, SettlementAccount } from "@prisma/client";
import { findRecordById } from "../findRecord";

export const mapMethodOfPaymentsToNested = (relatedEntities: {
  methodOfPayments: MethodOfPayment[];
  icons: Icon[];
  settlementAccounts: SettlementAccount[];
}) => {
  const { methodOfPayments, icons, settlementAccounts } = relatedEntities;

  return methodOfPayments.map((m) => ({
    ...m,
    icon: findRecordById(icons, m.iconId),
    settlementAccount: findRecordById(
      settlementAccounts,
      m.settlementAccountId
    ),
  }));
};
