import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { convertFastTransactionToTransaction } from "../utils/convertFastTransactionToTransaction/convertFastTransactionToTransaction";
import { RecognizedField } from "../utils/convertFastTransactionToTransaction/convertFastTransactionToTransaction.types";
import { useFetchMethodOfPayment } from "./useFetchMethodOfPayment";
import { useFetchSettlementAccount } from "./useFetchSettlementAccount";
import { useFetchSubcategories } from "./useFetchSubcategories";
import { useFetchTags } from "./useFetchTags";
import { useRouteParam } from "./useRouteParam";

export const useConvertRouteParamToTransaction = () => {
  const condensedTransaction = useRouteParam("addCondensedTransaction");
  const [transaction, setTransaction] = useState<RecognizedField>();
  const [unprocessabled, setUnprocessabled] = useState<string[] | null>();

  const { subcategories } = useFetchSubcategories();
  const { tags } = useFetchTags();
  const { settlementAccounts } = useFetchSettlementAccount();
  const { methodOfPayments } = useFetchMethodOfPayment();

  useEffect(() => {
    if (!isEmpty(subcategories) && !isEmpty(tags)) {
      const { transaction, unprocessabled } =
        convertFastTransactionToTransaction(condensedTransaction, {
          subcategories,
          tags,
          settlementAccounts,
          methodOfPayments,
        });
      setTransaction(transaction);
      setUnprocessabled(unprocessabled);
    }
  }, [subcategories, tags]);

  return { transaction, unprocessabled };
};
