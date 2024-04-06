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
import { useFetchCategoryBudgets } from "src/app/hooks/useFetchCategoryBudget";
import { useGenerateCategories } from "src/app/hooks/useGenerateCategories";
import { APP_SETTINGS_URL } from "src/common/constants/urls";
import { changePathname } from "src/common/utils/url";
import { CategoryCell } from "./CategoryCell";

const CategoryBudgetTable: FC<{}> = () => {
  const router = useRouter();
  const categories = useGenerateCategories();
  const { categoryBudgets } = useFetchCategoryBudgets();

  const getDate = (params: GridValueGetterParams) => new Date(params.value);

  const getActions = (params: GridRowParams) => [
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          editCategoryBudget: params.id,
        })
      }
      icon={<EditIcon />}
      label="Edit"
    />,
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          removeCategoryBudget: params.id,
        })
      }
      icon={<DeleteForeverIcon />}
      label="Delete"
    />,
  ];

  const columns: GridEnrichedColDef[] = [
    {
      field: "categoryId",
      headerName: "Category",
      type: "singleSelect",
      renderCell: CategoryCell(categories),
      flex: 1,
    },
    {
      field: "since",
      headerName: "Since",
      type: "date",
      valueGetter: getDate,
      flex: 1,
    },
    {
      field: "until",
      headerName: "Until",
      type: "date",
      valueGetter: getDate,
      flex: 1,
    },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "actions", type: "actions", getActions: getActions },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={categoryBudgets}
      autoHeight
      density="compact"
    ></DataGrid>
  );
};

export default CategoryBudgetTable;
