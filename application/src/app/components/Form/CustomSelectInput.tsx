import { SelectProps } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { FC, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type CustomSelectInputProps = {
  errorText?: string | undefined;
  defaultValue?: string | number | Date;
  SelectProps?: SelectProps;
  inputProps: UseFormRegisterReturn;
  label: string;
  options: Option[];
};

type Option = {
  label: string | ReactNode;
  value: string | number;
};

export const CustomSelectInput: FC<CustomSelectInputProps> = ({
  errorText = null,
  inputProps,
  SelectProps,
  defaultValue,
  label,
  options,
}) => {
  return (
    <TextField
      select
      SelectProps={SelectProps}
      defaultValue={defaultValue}
      inputProps={inputProps}
      label={label}
      error={!!errorText}
      helperText={errorText}
      margin="dense"
      fullWidth
    >
      {options.map((m) => (
        <MenuItem key={`menuItem_${label}_${m.value}`} value={m.value}>
          {m.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CustomSelectInput;
