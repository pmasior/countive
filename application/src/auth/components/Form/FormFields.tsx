import React, { FC, FormHTMLAttributes } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type FormFieldsProps = {
  formProps?: FormHTMLAttributes<HTMLFormElement>;
  textFieldsProps: TextFieldProps[];
  alertText?: string | null;
  buttonTitle: string;
};

const FormFields: FC<FormFieldsProps> = ({
  formProps,
  textFieldsProps,
  alertText,
  buttonTitle,
}) => {
  return (
    <form {...formProps}>
      <Box sx={{ display: "grid", gap: 3 }}>
        {textFieldsProps.map((t) => (
          <TextField key={`form_${t.label}`} {...t} />
        ))}
        {alertText && <Alert severity="error">{alertText}</Alert>}
        <Button
          type="submit"
          variant="contained"
          sx={{ width: 1 / 3, justifySelf: "flex-end" }}
        >
          {buttonTitle}
        </Button>
      </Box>
    </form>
  );
};

export default FormFields;
