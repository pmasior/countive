import DateRangeIcon from "@mui/icons-material/DateRange";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import format from "date-fns/format";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useCategoryIdFromRouteParam } from "src/app/hooks/useCategoryIdFromRouteParam";
import { useGenerateCategoryBudget } from "src/app/hooks/useGenerateCategoryBudget";
import { APP_CATEGORY_URL } from "src/common/constants/urls";
import { useMUIMenu } from "src/common/hooks/useMUIMenu";
import { changePathname } from "src/common/utils/url";

export const BudgetMenu: FC<{}> = () => {
  const router = useRouter();
  const { closeMenu, menuControlsProps, menuProps } = useMUIMenu("budget");
  const categoryId = useCategoryIdFromRouteParam();
  const categoryBudgets = useGenerateCategoryBudget({ categoryId });

  const changeBudget = (budgetId: number) => {
    changePathname(router, APP_CATEGORY_URL, { budget: budgetId });
    closeMenu();
  };

  const formatDate = (date: Date) => format(new Date(date), "dd.LL.Y");

  return (
    <>
      <IconButton {...menuControlsProps}>
        <DateRangeIcon />
      </IconButton>
      <Menu {...menuProps}>
        {!isEmpty(categoryBudgets) &&
          categoryBudgets.map((c) => (
            <MenuItem
              key={`budgetMenuElement_${c.id}`}
              onClick={() => changeBudget(c.id)}
            >
              {`${formatDate(c.since)} - ${formatDate(c.until)}`}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};
