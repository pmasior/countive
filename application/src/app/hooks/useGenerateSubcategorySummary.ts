import { Prisma } from ".prisma/client";
import { isDateBetween } from "src/common/utils/dateCompare";
import { useCategoryIdFromRouteParam } from "./useCategoryIdFromRouteParam";
import { useGenerateSubcategories } from "./useGenerateSubcategories";
import { useGenerateSubcategoryBudget } from "./useGenerateSubcategoryBudget";
import { useGenerateTransactions } from "./useGenerateTransactions";
import { useOpenedCategoryBudget } from "./useOpenedCategoryBudget";

export const useGenerateSubcategorySummary = () => {
  const categoryId = useCategoryIdFromRouteParam();
  const subcategories = useGenerateSubcategories({ categoryId });
  const categoryBudget = useOpenedCategoryBudget();
  const subcategoryBudgets = useGenerateSubcategoryBudget({
    categoryBudgetId: categoryBudget?.id,
  });
  const transactions = useGenerateTransactions({
    addedAt: (date: Date) =>
      isDateBetween(date, categoryBudget.since, categoryBudget.until),
  });

  const countRemainingBudget = (
    subcategoryId: number,
    amount: Prisma.Decimal
  ) => {
    const subcategoryBudget = subcategoryBudgets.find(
      (s) => s.subcategoryId === subcategoryId
    );
    return subcategoryBudget
      ? Prisma.Decimal.add(subcategoryBudget.amount, amount)
      : "";
  };

  const countAmount = (subcategoryId: number) =>
    transactions
      .filter((t) => t.subcategoryId === subcategoryId)
      .reduce(
        (amountSum, t) => Prisma.Decimal.add(amountSum, t.amount),
        new Prisma.Decimal(0)
      );

  return subcategories.map((s) => ({
    id: s.id,
    name: s.name,
    color: s.color,
    amount: countAmount(s.id).toString(),
    remainAmount: countRemainingBudget(s.id, countAmount(s.id)).toString(),
    currency: "PLN", //TODO: change to dynamic data
    icon: s.icon?.name || "",
  }));
};
