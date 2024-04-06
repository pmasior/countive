import { isEmpty } from "lodash";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useGenerateSubcategories } from "src/app/hooks/useGenerateSubcategories";
import CustomSelectInput from "../Form/CustomSelectInput";
import SelectOptionWithIcon from "../Form/SelectOptionWithIcon";
import { FormFieldsNames } from "./TransactionForm";

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
          errorText={errors.subcategoryId?.message}
          inputProps={register("subcategoryId", {
            required: "Subcategory is required",
          })}
          label="Subcategory"
          // TODO: filter subcategories by category
          options={subcategories.map((s) => ({
            value: s.id,
            label: (
              <SelectOptionWithIcon
                color={s.color}
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
