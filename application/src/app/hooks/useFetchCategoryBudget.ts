import { CategoryBudget } from ".prisma/client";
import { API_CATEGORY_BUDGET_URL } from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";

export const useFetchCategoryBudgets = () => {
  const fetchReturn = useFetchSWR<CategoryBudget[]>(API_CATEGORY_BUDGET_URL);
  return { categoryBudgets: fetchReturn.data || [], ...fetchReturn };
};
