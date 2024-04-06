import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import CustomTextInput from "../Form/CustomTextInput";
import { FormFieldsNames } from "./TransactionForm";

export const NoteField: FC<{ form: UseFormReturn<FormFieldsNames> }> = ({
  form,
}) => {
  const { register } = form;

  return <CustomTextInput inputProps={register("note")} label="Note" />;
};
