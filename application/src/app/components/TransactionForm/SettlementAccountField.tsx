import { isEmpty } from "lodash";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useFetchSettlementAccount } from "src/app/hooks/useFetchSettlementAccount";
import CustomSelectInput from "../Form/CustomSelectInput";
import { FormFieldsNames } from "./TransactionForm";

export const SettlementAccountField: FC<{
  form: UseFormReturn<FormFieldsNames>;
}> = ({ form }) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = form;

  const { settlementAccounts } = useFetchSettlementAccount();

  const name = "settlementAccountId";

  return (
    <>
      {!isEmpty(settlementAccounts) && (
        <CustomSelectInput
          defaultValue={getValues(name)}
          errorText={errors.settlementAccountId?.message}
          inputProps={register("settlementAccountId", {
            required: "Settlement Account is required",
          })}
          label="Settlement Account"
          options={settlementAccounts.map((s) => ({
            value: s.id,
            label: s.name,
          }))}
        />
      )}
    </>
  );
};
