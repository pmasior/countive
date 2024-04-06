import { SubcategoryBudget } from "@prisma/client";
import { API_SUBCATEGORY_BUDGET_URL } from "src/common/constants/urls";
import { useFetchSWR } from "src/common/hooks/useFetchSWR";

export const useFetchSubcategoryBudgets = () => {
  const fetchReturn = useFetchSWR<SubcategoryBudget[]>(
    API_SUBCATEGORY_BUDGET_URL
  );
  return { subcategoryBudgets: fetchReturn.data || [], ...fetchReturn };
};
