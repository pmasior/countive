import React, { FC } from "react";
import Grid from "@mui/material/Grid";

import SubcategoryCard from "./SubcategoryCard";
import { useGenerateSubcategorySummary } from "src/app/hooks/useGenerateSubcategorySummary";

const SubcategoryGrid: FC<{}> = () => {
  const subcategorySummary = useGenerateSubcategorySummary();

  return (
    <Grid container spacing={1}>
      {subcategorySummary.map((s) => (
        <Grid item xs={4} key={`subcategoryCard_${s.name}`}>
          <SubcategoryCard {...s} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SubcategoryGrid;
