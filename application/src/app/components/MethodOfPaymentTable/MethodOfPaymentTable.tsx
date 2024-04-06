import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridActionsCellItem,
  GridEnrichedColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useFetchIcons } from "src/app/hooks/useFetchIcons";
import { useFetchMethodOfPayment } from "src/app/hooks/useFetchMethodOfPayment";
import { useFetchSettlementAccount } from "src/app/hooks/useFetchSettlementAccount";
import { findRecordById } from "src/app/utils/findRecord";
import { APP_SETTINGS_URL } from "src/common/constants/urls";
import { changePathname } from "src/common/utils/url";
import { IconCell } from "./IconCell";

const MethodOfPaymentTable: FC<{}> = () => {
  const router = useRouter();
  const { methodOfPayments } = useFetchMethodOfPayment();
  const { icons } = useFetchIcons();
  const { settlementAccounts } = useFetchSettlementAccount();

  const getSettlementAccount = (params: GridValueGetterParams) => {
    const settlementAccount = findRecordById(
      settlementAccounts,
      params.row.settlementAccountId
    );
    return settlementAccount?.name || "";
  };

  const getActions = (params: GridRowParams) => [
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          editMethodOfPayment: params.id,
        })
      }
      icon={<EditIcon />}
      label="Edit"
    />,
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          removeMethodOfPayment: params.id,
        })
      }
      icon={<DeleteForeverIcon />}
      label="Delete"
    />,
  ];

  const columns: GridEnrichedColDef[] = [
    {
      field: "iconId",
      headerName: "Icon",
      type: "singleSelect",
      renderCell: IconCell(icons),
      minWidth: 40,
      width: 44,
    },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "settlementAccountId",
      headerName: "Settlement Account",
      type: "singleSelect",
      valueGetter: getSettlementAccount,
      flex: 1,
    },
    { field: "actions", type: "actions", getActions: getActions },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={methodOfPayments}
      autoHeight
      density="compact"
    ></DataGrid>
  );
};

export default MethodOfPaymentTable;
