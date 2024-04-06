import format from "date-fns/format";
import { isEmpty } from "lodash";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useGenerateCategoryBudget } from "src/app/hooks/useGenerateCategoryBudget";
import CustomSelectInput from "../Form/CustomSelectInput";
import { FormFieldsNames } from "./SubcategoryBudgetForm";

export const CategoryBudgetField: FC<{ form: UseFormReturn<FormFieldsNames> }> =
  ({ form }) => {
    const {
      register,
      getValues,
      formState: { errors },
    } = form;

    const categoryBudgets = useGenerateCategoryBudget();

    const name = "categoryBudgetId";

    const formatDate = (date: Date) => format(new Date(date), "dd.LL.Y");

    return (
      <>
        {!isEmpty(categoryBudgets) && (
          <CustomSelectInput
            defaultValue={getValues(name)}
            errorText={errors[name]?.message}
            inputProps={register(name, {
              required: "Category Budget is required",
            })}
            label="Category Budget"
            options={categoryBudgets.map((s) => ({
              value: s.id,
              label: `${s.category?.name} - ${formatDate(
                s.since
              )} - ${formatDate(s.until)}`,
            }))}
          />
        )}
      </>
    );
  };
