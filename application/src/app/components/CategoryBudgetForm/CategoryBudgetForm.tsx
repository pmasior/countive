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
import { API_CATEGORY_BUDGET_URL } from "src/common/constants/urls";
import { FetchPostReturn } from "src/common/hooks/useMutate";
import { useSWRConfig } from "swr";
import { AmountField } from "./AmountField";
import { CategoryField } from "./CategoryField";
import { SinceField } from "./SinceField";
import { UntilField } from "./UntilField";

export type FormFieldsNames = {
  amount: string;
  categoryId: number | "";
  since: Date;
  until: Date;
};

type CategoryBudgetFormProps = {
  defaultValues?: Partial<FormFieldsNames>;
  mutate: (body: any) => Promise<FetchPostReturn>;
  warningText?: string;
};

export const CategoryBudgetForm: FC<CategoryBudgetFormProps> = ({
  defaultValues = {},
  mutate,
}) => {
  const [alertText, setAlertText] = useState<string | null>(null);
  const router = useRouter();
  const { mutate: mutateSWR } = useSWRConfig();
  const form = useForm<FormFieldsNames>({
    defaultValues: {
      categoryId: "",
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
      mutateSWR(API_CATEGORY_BUDGET_URL);
      closeModal();
    }
  };

  const closeModal = () => router.back();

  return (
    <Dialog open={true} onBackdropClick={closeModal}>
      <DialogTitle>Add subcategory</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CategoryField form={form} />
            </Grid>
            <Grid item xs={12}>
              <AmountField form={form} />
            </Grid>
            <Grid item xs={12}>
              <SinceField form={form} />
            </Grid>
            <Grid item xs={12}>
              <UntilField form={form} />
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

export default CategoryBudgetForm;
