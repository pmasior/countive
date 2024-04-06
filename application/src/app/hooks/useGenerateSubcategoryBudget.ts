import { SubcategoryBudget } from "@prisma/client";
import { useFetchSubcategoryBudgets } from "./useFetchSubcategoryBudget";

type Filter = {
  id?: number;
  categoryBudgetId?: number;
  subcategoryId?: number;
};

export const useGenerateSubcategoryBudget = (filter?: Filter) => {
  const { subcategoryBudgets } = useFetchSubcategoryBudgets();

  let filtered: SubcategoryBudget[] = subcategoryBudgets;

  if (subcategoryBudgets && filter) {
    if (filter.id) {
      filtered = filtered.filter((t) => t.id === filter.id);
    }
    if (filter.categoryBudgetId) {
      filtered = filtered.filter(
        (t) => t.categoryBudgetId === filter.categoryBudgetId
      );
    }
    if (filter.subcategoryId) {
      filtered = filtered.filter(
        (t) => t.subcategoryId === filter.subcategoryId
      );
    }
  }

  return subcategoryBudgets ? filtered : [];
};
