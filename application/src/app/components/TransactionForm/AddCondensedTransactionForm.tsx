import { isEmpty } from "lodash";
import React, { FC } from "react";
import { useConvertRouteParamToTransaction } from "src/app/hooks/useConvertRouteParamToTransaction";
import { useFetchDefaultTransactionValues } from "src/app/hooks/useFetchDefaultTransactionValues";
import { API_TRANSACTION_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import TransactionForm from "./TransactionForm";

export const AddCondensedTransactionForm: FC<{}> = () => {
  const { defaultTransactionValues } = useFetchDefaultTransactionValues();
  const { mutate, loading } = useMutate(API_TRANSACTION_URL, "POST");

  const { transaction, unprocessabled } = useConvertRouteParamToTransaction();

  return (
    <>
      {transaction && !isEmpty(defaultTransactionValues) && (
        <TransactionForm
          defaultValues={{
            addedAt: transaction.date || new Date(),
            amount: transaction.amount?.toString() || "",
            note: transaction.note || "",
            currencyId: defaultTransactionValues?.[0]?.currencyId || "",
            subcategoryId:
              transaction.subcategory ||
              defaultTransactionValues?.[0]?.subcategoryId ||
              "",
            settlementAccountId:
              transaction.settlementAccountId ||
              defaultTransactionValues?.[0]?.settlementAccountId ||
              "",
            methodOfPaymentId:
              transaction.methodOfPaymentId ||
              defaultTransactionValues?.[0]?.methodOfPaymentId ||
              // TODO: fix possible set method of payment for other settlementAccount
              "",
            tags: transaction.tagIds || [],
          }}
          mutate={mutate}
          warningText={
            (unprocessabled &&
              `Value "${unprocessabled.join(" ")}" can not be recognized`) ||
            undefined
          }
        />
      )}
    </>
  );
};

export default AddCondensedTransactionForm;
