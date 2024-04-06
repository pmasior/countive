import React, { FC } from "react";
import { API_SUBCATEGORY_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import SubcategoryForm from "./SubcategoryForm";

export const AddSubcategoryForm: FC<{}> = () => {
  const { mutate, loading } = useMutate(API_SUBCATEGORY_URL, "POST");

  return <SubcategoryForm mutate={mutate} />;
};

export default AddSubcategoryForm;
