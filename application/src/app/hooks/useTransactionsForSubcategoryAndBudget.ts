import { isDateBetween } from "src/common/utils/dateCompare";
import { useCategoryIdFromRouteParam } from "./useCategoryIdFromRouteParam";
import { useGenerateSubcategories } from "./useGenerateSubcategories";
import { useGenerateTransactions } from "./useGenerateTransactions";
import { useOpenedCategoryBudget } from "./useOpenedCategoryBudget";
import { useSubcategoryIdFromRouteParam } from "./useSubcategoryIdFromRouteParam";

export const useTransactionsForSubcategoryAndBudget = () => {
  const categoryBudget = useOpenedCategoryBudget();
  const categoryId = useCategoryIdFromRouteParam();
  const subcategories = useGenerateSubcategories({
    categoryId,
  });
  const subcategoriesId = subcategories.map((s) => s.id);
  const subcategoryId = useSubcategoryIdFromRouteParam();

  return useGenerateTransactions({
    subcategoryId: subcategoryId || subcategoriesId,
    addedAt: (date: Date) =>
      isDateBetween(date, categoryBudget.since, categoryBudget.until),
  });
};
