import React, { FC } from "react";
import { API_CATEGORY_BUDGET_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import CategoryBugdetForm from "./CategoryBudgetForm";

export const AddCategoryBugdetForm: FC<{}> = () => {
  const { mutate, loading } = useMutate(API_CATEGORY_BUDGET_URL, "POST");

  return <CategoryBugdetForm mutate={mutate} />;
};

export default AddCategoryBugdetForm;
