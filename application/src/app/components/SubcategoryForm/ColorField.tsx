import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import CustomTextInput from "../Form/CustomTextInput";
import { FormFieldsNames } from "./SubcategoryForm";

export const ColorField: FC<{ form: UseFormReturn<FormFieldsNames> }> = ({
  form,
}) => {
  const { register } = form;

  return <CustomTextInput inputProps={register("color")} label="Color" />;
};
