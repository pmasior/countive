import { isEmpty } from "lodash";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useGenerateSettlementAccount } from "src/app/hooks/useGenerateSettlementAccount";
import CustomSelectInput from "../Form/CustomSelectInput";
import { FormFieldsNames } from "./MethodOfPaymentForm";

export const SettlementAccountField: FC<{
  form: UseFormReturn<FormFieldsNames>;
}> = ({ form }) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = form;

  const settlementAccounts = useGenerateSettlementAccount();

  const name = "settlementAccountId";

  return (
    <>
      {!isEmpty(settlementAccounts) && (
        <CustomSelectInput
          defaultValue={getValues(name)}
          errorText={errors[name]?.message}
          inputProps={register(name, {
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
