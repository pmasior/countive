import React, { FC } from "react";
import { useGenerateCategories } from "src/app/hooks/useGenerateCategories";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { API_CATEGORY_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import CategoryForm from "./CategoryForm";

export const EditCategoryForm: FC<{}> = () => {
  const categoryId = useRouteParam<number>("editCategory", "number");

  const category = useGenerateCategories({ id: categoryId })[0];
  const { mutate, loading } = useMutate(
    `${API_CATEGORY_URL}/${categoryId}`,
    "PUT"
  );

  return (
    <>
      {category && (
        <CategoryForm
          defaultValues={{
            ...category,
          }}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default EditCategoryForm;
