import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { isQueryExist } from "src/common/utils/url";
import CategoryDashboard from "../components/CategoryDashboard/CategoryDashboard";
import AppLayout from "../components/Navigation/AppLayout";
import AddCondensedTransactionForm from "../components/TransactionForm/AddCondensedTransactionForm";
import AddTransactionForm from "../components/TransactionForm/AddTransactionForm";
import EditTransactionForm from "../components/TransactionForm/EditTransactionForm";
import RemoveTransactionForm from "../components/TransactionForm/RemoveTransactionForm";

const Dashboard: FC<{}> = () => {
  useSession({ required: true });
  const router = useRouter();

  return (
    <AppLayout>
      <CategoryDashboard />
      {isQueryExist(router.query?.addTransaction) && <AddTransactionForm />}
      {isQueryExist(router.query?.editTransaction) && <EditTransactionForm />}
      {isQueryExist(router.query?.removeTransaction) && (
        <RemoveTransactionForm />
      )}
      {isQueryExist(router.query?.addCondensedTransaction) && (
        <AddCondensedTransactionForm />
      )}
    </AppLayout>
  );
};

export default Dashboard;
