import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import CustomTextInput from "../Form/CustomTextInput";
import { FormFieldsNames } from "./SubcategoryBudgetForm";

export const AmountField: FC<{ form: UseFormReturn<FormFieldsNames> }> = ({
  form,
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <CustomTextInput
      errorText={errors.amount?.message}
      inputProps={register("amount", {
        required: "Amount is required",
        pattern: {
          value: /^-?\d+\.?\d*$/,
          message:
            "Amount must be a number. It may contain . as a decimal separator.",
        },
      })}
      label="Amount"
    />
  );
};
