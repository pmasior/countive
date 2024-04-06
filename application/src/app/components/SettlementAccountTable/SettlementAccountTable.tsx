import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridActionsCellItem,
  GridEnrichedColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useFetchSettlementAccount } from "src/app/hooks/useFetchSettlementAccount";
import { APP_SETTINGS_URL } from "src/common/constants/urls";
import { changePathname } from "src/common/utils/url";

const SettlementAccountTable: FC<{}> = () => {
  const router = useRouter();
  const { settlementAccounts } = useFetchSettlementAccount();

  const getActions = (params: GridRowParams) => [
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          editSettlementAccount: params.id,
        })
      }
      icon={<EditIcon />}
      label="Edit"
    />,
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          removeSettlementAccount: params.id,
        })
      }
      icon={<DeleteForeverIcon />}
      label="Delete"
    />,
  ];

  const columns: GridEnrichedColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "color", headerName: "Color", flex: 1 },
    { field: "actions", type: "actions", getActions: getActions },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={settlementAccounts}
      autoHeight
      density="compact"
    ></DataGrid>
  );
};

export default SettlementAccountTable;
