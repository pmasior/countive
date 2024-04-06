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
import { useFetchSubcategoryBudgets } from "src/app/hooks/useFetchSubcategoryBudget";
import { useGenerateCategoryBudget } from "src/app/hooks/useGenerateCategoryBudget";
import { useGenerateSubcategories } from "src/app/hooks/useGenerateSubcategories";
import { findRecordById } from "src/app/utils/findRecord";
import { APP_SETTINGS_URL } from "src/common/constants/urls";
import { changePathname } from "src/common/utils/url";
import { SubcategoryCell } from "./SubcategoryCell";

const SubcategoryBudgetTable: FC<{}> = () => {
  const router = useRouter();
  const { subcategoryBudgets } = useFetchSubcategoryBudgets();
  const subcategories = useGenerateSubcategories();
  const categoryBudgets = useGenerateCategoryBudget();

  const getDate =
    (paramName: "since" | "until") => (params: GridValueGetterParams) => {
      const categoryBudget = findRecordById(
        categoryBudgets,
        params.row.categoryBudgetId
      );
      return new Date(categoryBudget?.[paramName] || "");
    };

  const getActions = (params: GridRowParams) => [
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          editSubcategoryBudget: params.id,
        })
      }
      icon={<EditIcon />}
      label="Edit"
    />,
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          removeSubcategoryBudget: params.id,
        })
      }
      icon={<DeleteForeverIcon />}
      label="Delete"
    />,
  ];

  const columns: GridEnrichedColDef[] = [
    {
      field: "subcategoryId",
      headerName: "Subcategory",
      type: "singleSelect",
      renderCell: SubcategoryCell(subcategories),
      flex: 1,
    },
    { field: "amount", flex: 1 },
    {
      field: "categoryBudgetSince",
      headerName: "Category Budget Since",
      type: "date",
      valueGetter: getDate("since"),
      flex: 0.5,
    },
    {
      field: "categoryBudgetUntil",
      headerName: "Category Budget Until",
      type: "date",
      valueGetter: getDate("until"),
      flex: 0.5,
    },
    { field: "actions", type: "actions", getActions: getActions },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={subcategoryBudgets}
      autoHeight
      density="compact"
    ></DataGrid>
  );
};

export default SubcategoryBudgetTable;
