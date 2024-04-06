import Icon from "@mui/material/Icon";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { mapCategoriesToNested } from "src/app/utils/entitiesMapper/mapCategories";
import { findRecordById } from "src/app/utils/findRecord";

export const CategoryCell =
  (categories: ReturnType<typeof mapCategoriesToNested>) =>
  (params: GridRenderCellParams) => {
    const category = findRecordById(categories, params.value);
    return (
      <>
        <Icon style={{ fontSize: 16 }}>{category?.icon?.name}</Icon>{" "}
        {category?.name}
      </>
    );
  };
