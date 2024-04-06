import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";
import { APP_SETTINGS_URL } from "src/common/constants/urls";
import { changePathname } from "src/common/utils/url";
import CategoryBudgetTable from "../CategoryBudgetTable/CategoryBudgetTable";
import CategoryTable from "../CategoryTable/CategoryTable";
import MethodOfPaymentTable from "../MethodOfPaymentTable/MethodOfPaymentTable";
import SettlementAccountTable from "../SettlementAccountTable/SettlementAccountTable";
import SubcategoryBudgetTable from "../SubcategoryBudgetTable/SubcategoryBudgetTable";
import SubcategoryTable from "../SubcategoryTable/SubcategoryTable";
import TagTable from "../TagTable/TagTable";

export const SettingsDashboard = () => {
  const router = useRouter();

  return (
    <Grid container spacing={4} padding={4}>
      <Grid item xs={12}>
        <Stack direction="column" alignItems="flex-start">
          <Typography component="h2" variant="h5" gutterBottom>
            Default values
          </Typography>
          <Button
            onClick={() =>
              changePathname(router, APP_SETTINGS_URL, {
                editDefaultTransactionValues: true,
              })
            }
          >
            Edit Default Transaction Values
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="h2" variant="h5" gutterBottom>
            Categories
          </Typography>
          <Button
            onClick={() =>
              changePathname(router, APP_SETTINGS_URL, { addCategory: true })
            }
          >
            Add
          </Button>
        </Stack>
        {/* TODO: add edit category, delete category */}
        {/* TODO: add below tables */}
        <CategoryTable />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="h2" variant="h5" gutterBottom>
            Subcategories
          </Typography>
          <Button
            onClick={() =>
              changePathname(router, APP_SETTINGS_URL, { addSubcategory: true })
            }
          >
            Add
          </Button>
        </Stack>
        <SubcategoryTable />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="h2" variant="h5" gutterBottom>
            Tags
          </Typography>
          <Button
            onClick={() =>
              changePathname(router, APP_SETTINGS_URL, {
                addTag: true,
              })
            }
          >
            Add
          </Button>
        </Stack>
        <TagTable />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="h2" variant="h5" gutterBottom>
            Categories Budgets
          </Typography>
          <Button
            onClick={() =>
              changePathname(router, APP_SETTINGS_URL, {
                addCategoryBudget: true,
              })
            }
          >
            Add
          </Button>
        </Stack>
        <CategoryBudgetTable />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="h2" variant="h5" gutterBottom>
            Subcategories Budgets
          </Typography>
          <Button
            onClick={() =>
              changePathname(router, APP_SETTINGS_URL, {
                addSubcategoryBudget: true,
              })
            }
          >
            Add
          </Button>
        </Stack>
        <SubcategoryBudgetTable />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="h2" variant="h5" gutterBottom>
            Settlement Accounts
          </Typography>
          <Button
            onClick={() =>
              changePathname(router, APP_SETTINGS_URL, {
                addSettlementAccount: true,
              })
            }
          >
            Add
          </Button>
        </Stack>
        <SettlementAccountTable />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="h2" variant="h5" gutterBottom>
            Method Of Payments
          </Typography>
          <Button
            onClick={() =>
              changePathname(router, APP_SETTINGS_URL, {
                addMethodOfPayment: true,
              })
            }
          >
            Add
          </Button>
        </Stack>
        <MethodOfPaymentTable />
      </Grid>
    </Grid>
  );
};

export default SettingsDashboard;
