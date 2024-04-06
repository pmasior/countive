import { isEmpty } from "lodash";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useGenerateMethodOfPayment } from "src/app/hooks/useGenerateMethodOfPayment";
import CustomSelectInput from "../Form/CustomSelectInput";
import SelectOptionWithIcon from "../Form/SelectOptionWithIcon";
import { FormFieldsNames } from "./TransactionForm";

export const MethodOfPaymentField: FC<{
  form: UseFormReturn<FormFieldsNames>;
}> = ({ form }) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = form;

  const methodOfPayments = useGenerateMethodOfPayment();

  const name = "methodOfPaymentId";

  return (
    <>
      {!isEmpty(methodOfPayments) && (
        <CustomSelectInput
          defaultValue={getValues(name)}
          errorText={errors.methodOfPaymentId?.message}
          inputProps={register("methodOfPaymentId", {
            required: "Method of Payment is required",
          })}
          label="Method of Payment"
          options={methodOfPayments.map((m) => ({
            value: m.id,
            label: (
              <SelectOptionWithIcon
                color={"initial"}
                iconName={m.icon?.name || ""}
                label={m.name}
              />
            ),
          }))}
        />
      )}
    </>
  );
};
