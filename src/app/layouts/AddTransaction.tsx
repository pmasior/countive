import { useSession } from "next-auth/react";
import React, { FC } from "react";
import CategoryDashboard from "../components/CategoryDashboard/CategoryDashboard";
import AppNavigation from "../components/Navigation/AppNavigation";
import AddTransactionForm from "../components/TransactionForm/AddTransactionForm";

const AddTransaction: FC<{}> = () => {
  useSession({ required: true });

  return (
    <AppNavigation>
      <CategoryDashboard />
      <AddTransactionForm />
    </AppNavigation>
  );
};

export default AddTransaction;
