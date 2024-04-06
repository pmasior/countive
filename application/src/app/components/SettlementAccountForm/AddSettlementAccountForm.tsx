import React, { FC } from "react";
import { API_SETTLEMENT_ACCOUNT_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import SettlementAccountForm from "./SettlementAccountForm";

export const AddSettlementAccountForm: FC<{}> = () => {
  const { mutate, loading } = useMutate(API_SETTLEMENT_ACCOUNT_URL, "POST");

  return <SettlementAccountForm mutate={mutate} />;
};

export default AddSettlementAccountForm;
