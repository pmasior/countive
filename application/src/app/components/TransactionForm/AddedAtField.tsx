import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { CustomDatePicker } from "../Form/CustomDatePicker";
import { FormFieldsNames } from "./TransactionForm";

export const AddedAtField: FC<{ form: UseFormReturn<FormFieldsNames> }> = ({
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

  return (
    <CustomDatePicker
      errorText={errors.addedAt?.message}
      reactHookFormProps={{
        registerReturn: register("addedAt", {
          valueAsDate: true,
          required: "Added at is required",
        }),
        control,
        setValue,
        setError,
        clearErrors,
      }}
      label="Added At"
      name="addedAt"
    />
  );
};
