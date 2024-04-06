import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { CustomDatePicker } from "../Form/CustomDatePicker";
import { FormFieldsNames } from "./CategoryBudgetForm";

export const SinceField: FC<{ form: UseFormReturn<FormFieldsNames> }> = ({
  form,
}) => {
  const {
    control,
    setValue,
    setError,
    clearErrors,
    register,
    formState: { errors },
  } = form;

  const name = "since";

  return (
    <CustomDatePicker
      errorText={errors[name]?.message}
      reactHookFormProps={{
        registerReturn: register(name, {
          valueAsDate: true,
          required: "Since is required",
        }),
        control,
        setValue,
        setError,
        clearErrors,
      }}
      label="Since"
      name={name}
    />
  );
};
