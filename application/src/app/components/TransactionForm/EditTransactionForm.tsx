import React, { FC } from "react";
import { useFetchTransaction } from "src/app/hooks/useFetchTransaction";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { API_TRANSACTION_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import TransactionForm from "./TransactionForm";

export const EditTransactionForm: FC<{}> = () => {
  const transactionId = useRouteParam<number>("editTransaction", "number");

  const { transaction } = useFetchTransaction(transactionId);
  const { mutate, loading } = useMutate(
    `${API_TRANSACTION_URL}/${transactionId}`,
    "PUT"
  );

  return (
    <>
      {transaction && (
        <TransactionForm
          defaultValues={{
            ...transaction,
            amount: transaction?.amount?.toString(),
          }}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default EditTransactionForm;
