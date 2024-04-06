import { SettlementAccount } from ".prisma/client";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { findRecordById } from "src/app/utils/findRecord";

export const SettlementAccountCell =
  (settlementAccounts: SettlementAccount[]) =>
  (params: GridRenderCellParams) => {
    const settlementAccount = findRecordById(settlementAccounts, params.value);
    return <>{settlementAccount?.name}</>;
  };
