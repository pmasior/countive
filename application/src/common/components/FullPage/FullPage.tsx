import React, { FC, ReactNode } from "react";
import Grid, { GridProps } from "@mui/material/Grid";

import styles from "./FullPage.module.css";

const FullPage: FC<{ children: ReactNode; gridItemParams?: GridProps }> = ({
  children,
  gridItemParams,
}) => {
  return (
    <Grid container className={styles.fullPage}>
      <Grid item {...gridItemParams}>
        {children}
      </Grid>
    </Grid>
  );
};

export default FullPage;
