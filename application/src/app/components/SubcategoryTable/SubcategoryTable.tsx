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
import { useFetchIcons } from "src/app/hooks/useFetchIcons";
import { useFetchSubcategories } from "src/app/hooks/useFetchSubcategories";
import { useGenerateCategories } from "src/app/hooks/useGenerateCategories";
import { APP_SETTINGS_URL } from "src/common/constants/urls";
import { changePathname } from "src/common/utils/url";
import { IconCell } from "./IconCell";
import { CategoryCell } from "./CategoryCell";

const SubcategoryTable: FC<{}> = () => {
  const router = useRouter();
  const categories = useGenerateCategories();
  const { subcategories } = useFetchSubcategories();
  const { icons } = useFetchIcons();

  const getActions = (params: GridRowParams) => [
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          editSubcategory: params.id,
        })
      }
      icon={<EditIcon />}
      label="Edit"
    />,
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          removeSubcategory: params.id,
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
      field: "categoryId",
      headerName: "Category",
      type: "singleSelect",
      renderCell: CategoryCell(categories),
      flex: 1,
    },
    { field: "color", headerName: "Color", flex: 1 },
    { field: "actions", type: "actions", getActions: getActions },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={subcategories}
      autoHeight
      density="compact"
    ></DataGrid>
  );
};

export default SubcategoryTable;
