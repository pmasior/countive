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
import { useFetchTags } from "src/app/hooks/useFetchTags";
import { useGenerateCategories } from "src/app/hooks/useGenerateCategories";
import { APP_SETTINGS_URL } from "src/common/constants/urls";
import { changePathname } from "src/common/utils/url";
import { CategoryCell } from "./CategoryCell";

const TagTable: FC<{}> = () => {
  const router = useRouter();
  const categories = useGenerateCategories();
  const { tags } = useFetchTags();

  const getActions = (params: GridRowParams) => [
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          editTag: params.id,
        })
      }
      icon={<EditIcon />}
      label="Edit"
    />,
    <GridActionsCellItem
      onClick={() =>
        changePathname(router, APP_SETTINGS_URL, {
          removeTag: params.id,
        })
      }
      icon={<DeleteForeverIcon />}
      label="Delete"
    />,
  ];

  const columns: GridEnrichedColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "categoryId",
      headerName: "Category",
      type: "singleSelect",
      renderCell: CategoryCell(categories),
      flex: 1,
    },
    { field: "actions", type: "actions", getActions: getActions },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={tags}
      autoHeight
      density="compact"
    ></DataGrid>
  );
};

export default TagTable;
