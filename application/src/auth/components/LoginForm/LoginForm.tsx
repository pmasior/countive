import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box";

import FormHeader from "../Form/FormHeader";
import FormFields from "../Form/FormFields";
import { FormFieldsNames } from "./LoginForm.types";
import { APP_URL } from "src/common/constants/urls";

const LoginForm: FC<{}> = () => {
  const router = useRouter();
  const [alertText, setAlertText] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<FormFieldsNames>();

  const onSubmit: SubmitHandler<FormFieldsNames> = async (data, e) => {
    const signInResult = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (signInResult?.["error"]) {
      setAlertText(signInResult["error"]);
    } else if (signInResult?.["ok"]) {
      setAlertText(null);
      router.push(APP_URL);
    }
  };

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <FormHeader title="Login" />
      <FormFields
        formProps={{ onSubmit: handleSubmit(onSubmit) }}
        textFieldsProps={[
          { inputProps: register("email"), label: "Email" },
          {
            inputProps: register("password"),
            type: "password",
            label: "Password",
          },
        ]}
        alertText={alertText}
        buttonTitle="Login"
      />
    </Box>
  );
};

export default LoginForm;
