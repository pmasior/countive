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
import { useFetchCategories } from "src/app/hooks/useFetchCategories";
import { useFetchIcons } from "src/app/hooks/useFetchIcons";
import { APP_SETTINGS_URL } from "src/common/constants/urls";
import { changePathname } from "src/common/utils/url";
import { IconCell } from "./IconCell";

const CategoryTable: FC<{}> = () => {
  const router = useRouter();
  const { categories } = useFetchCategories();
  const { icons } = useFetchIcons();

  const getActions = (params: GridRowParams) => [
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          editCategory: params.id,
        })
      }
      icon={<EditIcon />}
      label="Edit"
    />,
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          removeCategory: params.id,
        })
      }
      icon={<DeleteForeverIcon />}
      label="Delete"
    />,
  ];

  const columns: GridEnrichedColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "iconId",
      headerName: "Icon",
      type: "singleSelect",
      renderCell: IconCell(icons),
      minWidth: 40,
      width: 44,
    },
    { field: "actions", type: "actions", getActions: getActions },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={categories}
      autoHeight
      density="compact"
    ></DataGrid>
  );
};

export default CategoryTable;
