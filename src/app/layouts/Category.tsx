import { useSession } from "next-auth/react";
import React, { FC } from "react";

import CategoryDashboard from "../components/CategoryDashboard/CategoryDashboard";
import AppNavigation from "../components/Navigation/AppNavigation";

const Dashboard: FC<{}> = () => {
  const { data: sessionData } = useSession({ required: true });

  return (
    // TODO: set height to extend TransactionTable height
    <AppNavigation>
      {/* TODO: remove below */}
      <p>{JSON.stringify(sessionData)}</p>
      <CategoryDashboard />
    </AppNavigation>
  );
};

export default Dashboard;
