import { isEmpty } from "lodash";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useGenerateCategories } from "src/app/hooks/useGenerateCategories";
import CustomSelectInput from "../Form/CustomSelectInput";
import SelectOptionWithIcon from "../Form/SelectOptionWithIcon";
import { FormFieldsNames } from "./CategoryBudgetForm";

export const CategoryField: FC<{ form: UseFormReturn<FormFieldsNames> }> = ({
  form,
}) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = form;

  const categories = useGenerateCategories();

  const name = "categoryId";

  return (
    <>
      {!isEmpty(categories) && (
        <CustomSelectInput
          defaultValue={getValues(name)}
          errorText={errors[name]?.message}
          inputProps={register(name, {
            required: "Category is required",
          })}
          label="Category"
          options={categories.map((s) => ({
            value: s.id,
            label: (
              <SelectOptionWithIcon
                iconName={s.icon?.name || ""}
                label={s.name}
              />
            ),
          }))}
        />
      )}
    </>
  );
};
