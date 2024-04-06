import { isEmpty } from "lodash";
import React, { FC } from "react";
import { useFetchDefaultTransactionValues } from "src/app/hooks/useFetchDefaultTransactionValues";
import { API_DEFAULT_TRANSACTION_VALUES_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import DefaultTransactionValuesForm from "./DefaultTransactionValuesForm";

export const EditDefaultTransactionValuesForm: FC<{}> = () => {
  const { defaultTransactionValues: defaultTransactionValuesArray } =
    useFetchDefaultTransactionValues();

  let defaultTransactionValues = defaultTransactionValuesArray?.[0];
  let id = defaultTransactionValues?.userId;

  const { mutate } = useMutate(
    `${API_DEFAULT_TRANSACTION_VALUES_URL}/${id}`,
    "PUT"
  );

  return (
    <>
      {!isEmpty(defaultTransactionValuesArray) && (
        <DefaultTransactionValuesForm
          defaultValues={{
            ...defaultTransactionValues,
            subcategoryId: defaultTransactionValues.subcategoryId || "",
            currencyId: defaultTransactionValues.currencyId || "",
            settlementAccountId:
              defaultTransactionValues.settlementAccountId || "",
            methodOfPaymentId: defaultTransactionValues.methodOfPaymentId || "",
          }}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default EditDefaultTransactionValuesForm;
