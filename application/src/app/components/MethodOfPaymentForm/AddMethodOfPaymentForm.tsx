import React, { FC } from "react";
import { API_METHOD_OF_PAYMENT_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import MethodOfPaymentForm from "./MethodOfPaymentForm";

export const AddMethodOfPaymentForm: FC<{}> = () => {
  const { mutate, loading } = useMutate(API_METHOD_OF_PAYMENT_URL, "POST");

  return <MethodOfPaymentForm mutate={mutate} />;
};

export default AddMethodOfPaymentForm;
