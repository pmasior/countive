import React, { FC } from "react";
import { useGenerateCategoryBudget } from "src/app/hooks/useGenerateCategoryBudget";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { API_CATEGORY_BUDGET_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import CategoryBudgetForm from "./CategoryBudgetForm";

export const EditCategoryBudgetForm: FC<{}> = () => {
  const categoryBudgetId = useRouteParam<number>(
    "editCategoryBudget",
    "number"
  );

  const categoryBudget = useGenerateCategoryBudget({ id: categoryBudgetId })[0];
  const { mutate, loading } = useMutate(
    `${API_CATEGORY_BUDGET_URL}/${categoryBudgetId}`,
    "PUT"
  );

  return (
    <>
      {categoryBudget && (
        <CategoryBudgetForm
          defaultValues={{
            ...categoryBudget,
            amount: categoryBudget?.amount?.toString(),
          }}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default EditCategoryBudgetForm;
