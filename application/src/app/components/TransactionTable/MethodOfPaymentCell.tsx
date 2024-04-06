import Icon from "@mui/material/Icon";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { mapMethodOfPaymentsToNested } from "src/app/utils/entitiesMapper/mapMethodOfPayment";
import { findRecordById } from "src/app/utils/findRecord";

export const MethodOfPaymentCell =
  (methodOfPayments: ReturnType<typeof mapMethodOfPaymentsToNested>) =>
  (params: GridRenderCellParams) => {
    const methodOfPayment = findRecordById(methodOfPayments, params.value);
    return (
      <>
        <Icon sx={{ fontSize: 144 }}>{methodOfPayment?.icon?.name}</Icon>{" "}
        {methodOfPayment?.name}
      </>
    );
  };
