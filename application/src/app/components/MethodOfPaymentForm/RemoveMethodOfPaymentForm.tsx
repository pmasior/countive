import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { useRouteParam } from "src/app/hooks/useRouteParam";
import { API_METHOD_OF_PAYMENT_URL } from "src/common/constants/urls";
import { useMutate } from "src/common/hooks/useMutate";
import { useSWRConfig } from "swr";

export const RemoveMethodOfPaymentForm: FC<{}> = () => {
  const { mutate: mutateSWR } = useSWRConfig();
  const router = useRouter();
  const removeMethodOfPaymentId = useRouteParam("removeMethodOfPayment");
  const { mutate, loading } = useMutate(
    `${API_METHOD_OF_PAYMENT_URL}/${removeMethodOfPaymentId}`,
    "DELETE"
  );
  const [alertText, setAlertText] = useState<string | null>(null);

  const closeModal = () => router.back();

  const onSubmit = async () => {
    const { error, json, text } = await mutate();
    if (error) {
      setAlertText(json?.message || text);
    } else {
      setAlertText(null);
      mutateSWR(API_METHOD_OF_PAYMENT_URL);
      closeModal();
    }
  };

  return (
    <Dialog open={true} onBackdropClick={closeModal}>
      <DialogTitle>Remove method of payment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove the method of payment?
        </DialogContentText>
        {alertText && (
          <Grid item xs={12}>
            <Alert severity="error">{alertText}</Alert>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={onSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveMethodOfPaymentForm;
