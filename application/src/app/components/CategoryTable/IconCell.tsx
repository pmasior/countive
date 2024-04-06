import IconDisplayer from "@mui/material/Icon";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Icon } from "@prisma/client";
import { findRecordById } from "src/app/utils/findRecord";

export const IconCell = (icons: Icon[]) => (params: GridRenderCellParams) => {
  const icon = findRecordById(icons, params.value);
  return <IconDisplayer style={{ fontSize: 16 }}>{icon?.name}</IconDisplayer>;
};
