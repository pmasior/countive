import Icon from "@mui/material/Icon";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { mapSubcategoriesToNested } from "src/app/utils/entitiesMapper/mapSubcategories";
import { findRecordById } from "src/app/utils/findRecord";

export const SubcategoryCell =
  (categories: ReturnType<typeof mapSubcategoriesToNested>) =>
  (params: GridRenderCellParams) => {
    const subcategory = findRecordById(categories, params.value);
    return (
      <>
        <Icon style={{ fontSize: 16 }}>{subcategory?.icon?.name}</Icon>{" "}
        {subcategory?.name}
      </>
    );
  };
