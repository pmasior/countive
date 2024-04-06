import React, { FC } from "react";
import { useGenerateSubcategories } from "src/app/hooks/useGenerateSubcategories";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { API_SUBCATEGORY_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import SubcategoryForm from "./SubcategoryForm";

export const EditSubcategoryForm: FC<{}> = () => {
  const subcategoryId = useRouteParam<number>("editSubcategory", "number");

  const subcategory = useGenerateSubcategories({ id: subcategoryId })[0];
  const { mutate, loading } = useMutate(
    `${API_SUBCATEGORY_URL}/${subcategoryId}`,
    "PUT"
  );

  return (
    <>
      {subcategory && (
        <SubcategoryForm
          defaultValues={{
            ...subcategory,
          }}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default EditSubcategoryForm;
