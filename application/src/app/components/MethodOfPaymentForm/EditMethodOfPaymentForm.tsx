import React, { FC } from "react";
import { useGenerateMethodOfPayment } from "src/app/hooks/useGenerateMethodOfPayment";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { API_METHOD_OF_PAYMENT_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import MethodOfPaymentForm from "./MethodOfPaymentForm";

export const EditMethodOfPaymentForm: FC<{}> = () => {
  const methodOfPaymentId = useRouteParam<number>(
    "editMethodOfPayment",
    "number"
  );

  const methodOfPayment = useGenerateMethodOfPayment({
    id: methodOfPaymentId,
  })[0];
  const { mutate, loading } = useMutate(
    `${API_METHOD_OF_PAYMENT_URL}/${methodOfPaymentId}`,
    "PUT"
  );

  return (
    <>
      {methodOfPayment && (
        <MethodOfPaymentForm
          defaultValues={{
            ...methodOfPayment,
          }}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default EditMethodOfPaymentForm;
