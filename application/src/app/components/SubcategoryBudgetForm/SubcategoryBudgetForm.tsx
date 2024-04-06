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
import { API_SUBCATEGORY_BUDGET_URL } from "src/common/constants/urls";
import { FetchPostReturn } from "src/common/hooks/useMutate";
import { useSWRConfig } from "swr";
import { AmountField } from "./AmountField";
import { CategoryBudgetField } from "./CategoryBudgetField";
import { SubcategoryField } from "./SubcategoryField";

export type FormFieldsNames = {
  amount: string;
  subcategoryId: number | "";
  categoryBudgetId: number | "";
};

type SubcategoryBudgetFormProps = {
  defaultValues?: Partial<FormFieldsNames>;
  mutate: (body: any) => Promise<FetchPostReturn>;
  warningText?: string;
};

export const SubcategoryBudgetForm: FC<SubcategoryBudgetFormProps> = ({
  defaultValues = {},
  mutate,
}) => {
  const [alertText, setAlertText] = useState<string | null>(null);
  const router = useRouter();
  const { mutate: mutateSWR } = useSWRConfig();
  const form = useForm<FormFieldsNames>({
    defaultValues: {
      subcategoryId: "",
      categoryBudgetId: "",
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
      mutateSWR(API_SUBCATEGORY_BUDGET_URL);
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
              <CategoryBudgetField form={form} />
            </Grid>
            <Grid item xs={12}>
              <SubcategoryField form={form} />
            </Grid>
            <Grid item xs={12}>
              <AmountField form={form} />
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

export default SubcategoryBudgetForm;
