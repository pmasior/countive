import { isEmpty } from "lodash";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useGenerateSubcategories } from "src/app/hooks/useGenerateSubcategories";
import CustomSelectInput from "../Form/CustomSelectInput";
import SelectOptionWithIcon from "../Form/SelectOptionWithIcon";
import { FormFieldsNames } from "./SubcategoryBudgetForm";

export const SubcategoryField: FC<{ form: UseFormReturn<FormFieldsNames> }> = ({
  form,
}) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = form;

  const subcategories = useGenerateSubcategories();

  const name = "subcategoryId";

  return (
    <>
      {!isEmpty(subcategories) && (
        <CustomSelectInput
          defaultValue={getValues(name)}
          errorText={errors[name]?.message}
          inputProps={register(name, {
            required: "Subcategory is required",
          })}
          label="Subcategory"
          options={subcategories.map((s) => ({
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
