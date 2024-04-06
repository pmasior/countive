import React, { FC } from "react";
import { API_SUBCATEGORY_BUDGET_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import SubcategoryBugdetForm from "./SubcategoryBudgetForm";

export const AddSubcategoryBugdetForm: FC<{}> = () => {
  const { mutate, loading } = useMutate(API_SUBCATEGORY_BUDGET_URL, "POST");

  return <SubcategoryBugdetForm mutate={mutate} />;
};

export default AddSubcategoryBugdetForm;
