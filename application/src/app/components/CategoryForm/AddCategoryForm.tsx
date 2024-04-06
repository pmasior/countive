import React, { FC } from "react";
import { API_CATEGORY_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import CategoryForm from "./CategoryForm";

export const AddCategoryForm: FC<{}> = () => {
  const { mutate, loading } = useMutate(API_CATEGORY_URL, "POST");

  return <CategoryForm mutate={mutate} />;
};

export default AddCategoryForm;
