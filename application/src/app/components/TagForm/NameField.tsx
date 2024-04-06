import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import CustomTextInput from "../Form/CustomTextInput";
import { FormFieldsNames } from "./TagForm";

export const NameField: FC<{ form: UseFormReturn<FormFieldsNames> }> = ({
  form,
}) => {
  const { register } = form;

  return <CustomTextInput inputProps={register("name")} label="Name" />;
};
