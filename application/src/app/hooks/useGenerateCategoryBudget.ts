import { CategoryBudget } from ".prisma/client";
import { mapCategoryBudgetsToNested } from "../utils/entitiesMapper/mapCategoryBudgets";
import { useFetchCategories } from "./useFetchCategories";
import { useFetchCategoryBudgets } from "./useFetchCategoryBudget";

export type CategoryBudgetFilter = {
  id?: number;
  categoryId?: number;
  since?: (e: Date) => boolean;
  until?: (e: Date) => boolean;
};

export const useGenerateCategoryBudget = (filter?: CategoryBudgetFilter) => {
  const { categoryBudgets } = useFetchCategoryBudgets();
  const { categories } = useFetchCategories();

  let filtered: CategoryBudget[] = categoryBudgets;

  if (categoryBudgets && filter) {
    if (filter.id) {
      filtered = filtered.filter((c) => c.id === filter.id);
    }
    if (filter.categoryId) {
      filtered = filtered.filter((c) => c.categoryId === filter.categoryId);
    }
    if (filter.since) {
      filtered = filtered.filter(
        (c) => filter.since && filter.since(new Date(c.since))
      );
    }
    if (filter.until) {
      filtered = filtered.filter(
        (c) => filter.until && filter.until(new Date(c.until))
      );
    }
  }
  return categories && categoryBudgets
    ? mapCategoryBudgetsToNested({ categoryBudgets: filtered, categories })
    : [];
};
