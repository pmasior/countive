import TextField from "@mui/material/TextField";
import React, { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type CustomTextInputProps = {
  errorText?: string | undefined;
  inputProps: UseFormRegisterReturn;
  label: string;
};

export const CustomTextInput: FC<CustomTextInputProps> = ({
  errorText = undefined,
  inputProps,
  label,
}) => {
  return (
    <TextField
      inputProps={inputProps}
      label={label}
      error={!!errorText}
      helperText={errorText}
      margin="dense"
      fullWidth
    />
  );
};

export default CustomTextInput;
