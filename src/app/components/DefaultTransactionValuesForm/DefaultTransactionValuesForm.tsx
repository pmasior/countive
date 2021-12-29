import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_DEFAULT_TRANSACTION_VALUES_URL } from "src/common/constants/urls";
import { FetchPostReturn } from "src/common/hooks/useMutate";
import { useSWRConfig } from "swr";
import { CurrencyField } from "./CurrencyField";
import { MethodOfPaymentField } from "./MethodOfPaymentField";
import { SettlementAccountField } from "./SettlementAccountField";
import { SubcategoryField } from "./SubcategoryField";

export type FormFieldsNames = {
  subcategoryId: number | "";
  currencyId: number | "";
  settlementAccountId: number | "";
  methodOfPaymentId: number | "";
};

type TransactionFormProps = {
  defaultValues: Partial<FormFieldsNames>;
  mutate: (body: any) => Promise<FetchPostReturn>;
};

export const TransactionForm: FC<TransactionFormProps> = ({
  defaultValues,
  mutate,
}) => {
  const [alertText, setAlertText] = useState<string | null>(null);
  const router = useRouter();
  const { mutate: mutateSWR } = useSWRConfig();
  const form = useForm<FormFieldsNames>({
    defaultValues: {
      subcategoryId: "",
      currencyId: "",
      settlementAccountId: "",
      methodOfPaymentId: "",
      ...defaultValues,
    },
  });
  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<FormFieldsNames> = async (data, e) => {
    const { error, json, text } = await mutate(data);
    if (error) {
      setAlertText(json?.message || text);
    } else {
      setAlertText(null);
      mutateSWR(API_DEFAULT_TRANSACTION_VALUES_URL);
      closeModal();
    }
  };

  const closeModal = () => router.back();

  return (
    <Dialog open={true} onBackdropClick={closeModal}>
      <DialogTitle>Add transaction</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SubcategoryField form={form} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CurrencyField form={form} />
            </Grid>
            <Grid item xs={12} md={6}>
              <SettlementAccountField form={form} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MethodOfPaymentField form={form} />
            </Grid>
            {alertText && (
              <Grid item xs={12}>
                <Alert severity="error">{alertText}</Alert>
              </Grid>
            )}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionForm;
