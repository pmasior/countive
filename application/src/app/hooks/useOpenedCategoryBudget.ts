import {
  CategoryBudgetFilter,
  useGenerateCategoryBudget,
} from "./useGenerateCategoryBudget";
import { useRouteParam } from "./useRouteParam";

export const useOpenedCategoryBudget = () => {
  const categoryBudgetId = parseInt(useRouteParam("budget"));
  const categoryBudgetFilter: CategoryBudgetFilter = (categoryBudgetId && {
    id: categoryBudgetId,
  }) || {
    since: (since) => new Date() >= since,
    until: (until) => new Date() < until,
  };
  return useGenerateCategoryBudget(categoryBudgetFilter)?.[0];
};
