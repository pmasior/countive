import { isEmpty } from "lodash";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useFetchSettlementAccount } from "src/app/hooks/useFetchSettlementAccount";
import CustomSelectInput from "../Form/CustomSelectInput";
import { FormFieldsNames } from "./DefaultTransactionValuesForm";

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
          inputProps={register("settlementAccountId")}
          SelectProps={{ displayEmpty: true }}
          label="Settlement Account"
          options={[
            { value: "", label: "⠀" },
            ...settlementAccounts.map((s) => ({
              value: s.id,
              label: s.name,
            })),
          ]}
        />
      )}
    </>
  );
};
