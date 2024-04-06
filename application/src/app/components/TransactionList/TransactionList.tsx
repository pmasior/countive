import Icon from "@mui/material/Icon";
import { format, parse } from "date-fns";
import React, { FC } from "react";
import { useGenerateTransaction } from "src/app/hooks/useGenerateTransactionList";

const TransactionList: FC<{}> = () => {
  const transactions = useGenerateTransaction();

  const isDateShouldBeRendered = (index: number) => {
    if (index === 0) return true;

    const earlierTransactionDate =
      new Date(transactions?.[index - 1].addedAt).toDateString() || null;
    const currentTransactionDate = new Date(
      transactions[index].addedAt
    ).toDateString();
    if (earlierTransactionDate !== currentTransactionDate) return true;

    return false;
  };

  return (
    <>
      {transactions.map((t, index) => (
        <>
          {isDateShouldBeRendered(index) && (
            <pre>{format(new Date(t.addedAt), "dd.MM.yyyy")}</pre>
          )}

          <Icon sx={{ color: t.subcategory.color, fontSize: 144 }}>
            {t.subcategory.icon.name}
          </Icon>
          <pre>{t.settlementAccountId}</pre>
          <pre>{t.amount}</pre>
        </>
      ))}
    </>
  );
};

export default TransactionList;
