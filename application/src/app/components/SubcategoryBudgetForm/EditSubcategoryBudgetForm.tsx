import React, { FC } from "react";
import { useGenerateSubcategoryBudget } from "src/app/hooks/useGenerateSubcategoryBudget";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { API_SUBCATEGORY_BUDGET_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import SubcategoryBudgetsForm from "./SubcategoryBudgetForm";

export const EditSubcategoryBudgetForm: FC<{}> = () => {
  const subcategoryBudgetId = useRouteParam<number>(
    "editSubcategoryBudget",
    "number"
  );

  const subcategoryBudget = useGenerateSubcategoryBudget({
    id: subcategoryBudgetId,
  })[0];
  const { mutate, loading } = useMutate(
    `${API_SUBCATEGORY_BUDGET_URL}/${subcategoryBudgetId}`,
    "PUT"
  );

  return (
    <>
      {subcategoryBudget && (
        <SubcategoryBudgetsForm
          defaultValues={{
            ...subcategoryBudget,
            amount: subcategoryBudget?.amount?.toString(),
          }}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default EditSubcategoryBudgetForm;
