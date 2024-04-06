import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridActionsCellItem,
  GridEnrichedColDef,
  GridRowParams,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useCategoryIdFromRouteParam } from "src/app/hooks/useCategoryIdFromRouteParam";
import { useFetchCurrency } from "src/app/hooks/useFetchCurrency";
import { useFetchSettlementAccount } from "src/app/hooks/useFetchSettlementAccount";
import { useFetchTags } from "src/app/hooks/useFetchTags";
import { useGenerateMethodOfPayment } from "src/app/hooks/useGenerateMethodOfPayment";
import { useGenerateSubcategories } from "src/app/hooks/useGenerateSubcategories";
import { useTransactionsForSubcategoryAndBudget } from "src/app/hooks/useTransactionsForSubcategoryAndBudget";
import { findRecordById } from "src/app/utils/findRecord";
import { APP_CATEGORY_URL } from "src/common/constants/urls";
import { changePathname } from "src/common/utils/url";
import { MethodOfPaymentCell } from "./MethodOfPaymentCell";
import { SettlementAccountCell } from "./SettlementAccountCell";
import { SubcategoryCell } from "./SubcategoryCell";
import { TagsCell } from "./TagsCell";

const TransactionTable: FC<{}> = () => {
  const router = useRouter();
  const categoryId = useCategoryIdFromRouteParam();
  const subcategories = useGenerateSubcategories({
    categoryId,
  });
  const transactions = useTransactionsForSubcategoryAndBudget();
  const { settlementAccounts } = useFetchSettlementAccount();
  const { currencies } = useFetchCurrency();
  const methodOfPayments = useGenerateMethodOfPayment();
  const { tags } = useFetchTags();

  const getDate = (params: GridValueGetterParams) => new Date(params.value);

  const getAmountWithCurrency = (params: GridValueGetterParams) => {
    const currency = findRecordById(currencies, params.row.currencyId);
    return `${params.row.amount} ${currency?.shortName}`;
  };

  const getActions = (params: GridRowParams) => [
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_CATEGORY_URL, {
          editTransaction: params.id,
        })
      }
      icon={<EditIcon />}
      label="Edit"
    />,
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_CATEGORY_URL, {
          removeTransaction: params.id,
        })
      }
      icon={<DeleteForeverIcon />}
      label="Delete"
    />,
  ];

  const columns: GridEnrichedColDef[] = [
    {
      field: "addedAt",
      headerName: "Date",
      type: "date",
      valueGetter: getDate,
      width: 100,
    },
    {
      field: "subcategoryId",
      headerName: "Subcategory",
      type: "singleSelect",
      renderCell: SubcategoryCell(subcategories),
      width: 44,
    },
    {
      field: "amountWithCurrency",
      headerName: "Amount",
      valueGetter: getAmountWithCurrency,
      width: 120,
    },
    {
      field: "tags",
      headerName: "Tags",
      renderCell: TagsCell(tags),
      flex: 1,
      minWidth: 180,
    },
    {
      field: "note",
      headerName: "Note",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "settlementAccountId",
      headerName: "SettlementAccount",
      renderCell: SettlementAccountCell(settlementAccounts),
      width: 160,
    },
    {
      field: "methodOfPaymentId",
      headerName: "Method Of Payment",
      renderCell: MethodOfPaymentCell(methodOfPayments),
      width: 160,
    },
    { field: "amount", hide: true },
    { field: "actions", type: "actions", getActions: getActions },
  ];

  // const handleOnRowEditCommit = (id: GridRowId, event: MuiEvent) => {
  //   event.defaultMuiPrevented = true;
  // };

  return (
    <DataGrid
      columns={columns}
      rows={transactions}
      components={{ Toolbar: GridToolbar }}
      // onRowEditCommit={handleOnRowEditCommit}
      // onEditRowsModelChange={}
      // onError={}
    ></DataGrid>
  );
};

export default TransactionTable;
