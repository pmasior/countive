import React, { FC } from "react";
import { useFetchDefaultTransactionValues } from "src/app/hooks/useFetchDefaultTransactionValues";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { API_TRANSACTION_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import TransactionForm from "./TransactionForm";

export const AddTransactionForm: FC<{}> = () => {
  const { defaultTransactionValues } = useFetchDefaultTransactionValues();
  const addTransactionSubcategoryId = useRouteParam(
    "addTransactionSubcategoryId"
  );

  const { mutate, loading } = useMutate(API_TRANSACTION_URL, "POST");

  return (
    <TransactionForm
      defaultValues={{
        addedAt: new Date(),
        subcategoryId: addTransactionSubcategoryId
          ? parseInt(addTransactionSubcategoryId)
          : "" || defaultTransactionValues?.[0]?.subcategoryId || "",
        currencyId: defaultTransactionValues?.[0]?.currencyId || "",
        settlementAccountId:
          defaultTransactionValues?.[0]?.settlementAccountId || "",
        methodOfPaymentId:
          defaultTransactionValues?.[0]?.methodOfPaymentId || "",
      }}
      mutate={mutate}
    />
  );
};

export default AddTransactionForm;
