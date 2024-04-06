import Grid from "@mui/material/Grid";
import React from "react";
import SubcategoryGrid from "../SubcategoryGrid/SubcategoryGrid";
import TransactionList from "../TransactionList/TransactionList";
import TransactionTable from "../TransactionTable/TransactionTable";

export const CategoryDashboard = () => {
  return (
    <Grid container spacing={4} padding={4} minHeight="100%">
      <Grid item xs={12} md={5} lg={4} xl={3}>
        <SubcategoryGrid />
      </Grid>
      <Grid item xs={12} md={7} lg={8} xl={9}>
        <TransactionTable />
      </Grid>
    </Grid>
  );
};

export default CategoryDashboard;
