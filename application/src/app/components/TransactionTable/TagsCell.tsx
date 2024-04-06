import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Tag } from "@prisma/client";
import React from "react";
import { findRecordById } from "src/app/utils/findRecord";

export const TagsCell = (tags: Tag[]) => (params: GridRenderCellParams) => {
  return (
    <Stack direction="row" spacing={1}>
      {params.value.map((id: number) => (
        <Chip
          key={`ChipInTransactionTable_${params.row.id}_${id}`}
          label={findRecordById(tags, id)?.name}
          variant="outlined"
          size="small"
        />
      ))}
    </Stack>
  );
};
