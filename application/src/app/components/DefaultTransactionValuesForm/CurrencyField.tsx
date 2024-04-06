import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useFetchCurrency } from "src/app/hooks/useFetchCurrency";
import CustomSelectInput from "../Form/CustomSelectInput";
import { FormFieldsNames } from "./DefaultTransactionValuesForm";

export const CurrencyField: FC<{ form: UseFormReturn<FormFieldsNames> }> = ({
  form,
}) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = form;

  const { currencies } = useFetchCurrency();

  const name = "currencyId";

  return (
    <CustomSelectInput
      defaultValue={getValues(name)}
      errorText={errors.currencyId?.message}
      inputProps={register("currencyId")}
      label="Currency"
      options={
        currencies?.map((c) => ({
          value: c.id,
          label: c.shortName,
        })) || []
      }
    />
  );
};
