import { Tag } from ".prisma/client";
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
import { API_TRANSACTION_URL } from "src/common/constants/urls";
import { FetchPostReturn } from "src/common/hooks/useMutate";
import { useSWRConfig } from "swr";
import { AddedAtField } from "./AddedAtField";
import { AmountField } from "./AmountField";
import { CurrencyField } from "./CurrencyField";
import { MethodOfPaymentField } from "./MethodOfPaymentField";
import { NoteField } from "./NoteField";
import { SettlementAccountField } from "./SettlementAccountField";
import { SubcategoryField } from "./SubcategoryField";
import { TagsField } from "./TagsField";

export type FormFieldsNames = {
  addedAt: Date;
  amount: string;
  note: string;
  currencyId: number | "";
  subcategoryId: number | "";
  settlementAccountId: number | "";
  methodOfPaymentId: number | "";
  tags: number[];
};

type TransactionFormProps = {
  defaultValues: Partial<FormFieldsNames>;
  mutate: (body: any) => Promise<FetchPostReturn>;
  warningText?: string;
};

export const TransactionForm: FC<TransactionFormProps> = ({
  defaultValues,
  mutate,
  warningText,
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
      mutateSWR(API_TRANSACTION_URL);
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
              <AddedAtField form={form} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AmountField form={form} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CurrencyField form={form} />
            </Grid>
            <Grid item xs={12}>
              <SubcategoryField form={form} />
            </Grid>
            <Grid item xs={12} md={6}>
              <SettlementAccountField form={form} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MethodOfPaymentField form={form} />
            </Grid>
            <Grid item xs={12}>
              <TagsField form={form} />
            </Grid>
            <Grid item xs={12}>
              <NoteField form={form} />
            </Grid>
            {alertText && (
              <Grid item xs={12}>
                <Alert severity="error">{alertText}</Alert>
              </Grid>
            )}
            {warningText && (
              <Grid item xs={12}>
                <Alert severity="warning">{warningText}</Alert>
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
