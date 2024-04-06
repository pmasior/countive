import { Category, CategoryBudget } from "@prisma/client";
import { findRecordById } from "../findRecord";

export const mapCategoryBudgetsToNested = (relatedEntities: {
  categoryBudgets: CategoryBudget[];
  categories: Category[];
}) => {
  const { categoryBudgets, categories } = relatedEntities;

  return categoryBudgets.map((c) => ({
    ...c,
    category: findRecordById(categories, c.categoryId),
  }));
};
