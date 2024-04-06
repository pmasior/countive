import Icon from "@mui/material/Icon";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { mapSubcategoriesToNested } from "src/app/utils/entitiesMapper/mapSubcategories";
import { findRecordById } from "src/app/utils/findRecord";

export const SubcategoryCell =
  (subcategories: ReturnType<typeof mapSubcategoriesToNested>) =>
  (params: GridRenderCellParams) => {
    const subcategory = findRecordById(subcategories, params.value);
    return (
      <Icon sx={{ color: subcategory?.color, fontSize: 144 }}>
        {subcategory?.icon?.name}
      </Icon>
    );
  };
