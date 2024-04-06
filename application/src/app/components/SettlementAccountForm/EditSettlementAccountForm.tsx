import React, { FC } from "react";
import { useGenerateSettlementAccount } from "src/app/hooks/useGenerateSettlementAccount";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { API_SETTLEMENT_ACCOUNT_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import SettlementAccountForm from "./SettlementAccountForm";

export const EditSettlementAccountForm: FC<{}> = () => {
  const settlementAccountId = useRouteParam<number>(
    "editSettlementAccount",
    "number"
  );

  const settlementAccount = useGenerateSettlementAccount({
    id: settlementAccountId,
  })[0];
  const { mutate, loading } = useMutate(
    `${API_SETTLEMENT_ACCOUNT_URL}/${settlementAccountId}`,
    "PUT"
  );

  return (
    <>
      {settlementAccount && (
        <SettlementAccountForm
          defaultValues={{
            ...settlementAccount,
          }}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default EditSettlementAccountForm;
