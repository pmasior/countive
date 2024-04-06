import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import deLocale from "date-fns/locale/de";
import React from "react";
import {
  Control,
  Path,
  UseFormClearErrors,
  UseFormRegisterReturn,
  UseFormSetError,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

type ReactHookFormDatePickerProps<TFormFieldsNames> = {
  registerReturn: UseFormRegisterReturn;
  control: Control<TFormFieldsNames, object>;
  setValue: UseFormSetValue<TFormFieldsNames>;
  setError: UseFormSetError<TFormFieldsNames>;
  clearErrors: UseFormClearErrors<TFormFieldsNames>;
};

type CustomDatePickerProps<TFormFieldsNames> = {
  errorText?: string | undefined;
  label: string;
  name: Path<TFormFieldsNames>;
  reactHookFormProps: ReactHookFormDatePickerProps<TFormFieldsNames>;
};

export const CustomDatePicker = <T extends {}>({
  errorText,
  label,
  name,
  reactHookFormProps,
}: CustomDatePickerProps<T>) => {
  const { control, setValue, setError, clearErrors } = reactHookFormProps;
  const watchDateValue = useWatch<T>({ control, name });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
      <DatePicker
        onChange={(date) => {
          if (date) setValue(name, date);
        }}
        onError={(reason) =>
          reason ? setError(name, { message: reason }) : clearErrors(name)
        }
        value={watchDateValue}
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...params}
            label={label}
            error={!!errorText}
            helperText={errorText}
            margin="dense"
            fullWidth
          />
        )}
        mask="__.__.____"
      ></DatePicker>
    </LocalizationProvider>
  );
};
