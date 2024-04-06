import React from "react";

import FullPage from "src/common/components/FullPage/FullPage";
import LoginForm from "../components/LoginForm/LoginForm";

export const Login = () => {
  return (
    <FullPage gridItemParams={{ md: 4 }}>
      <LoginForm />
    </FullPage>
  );
};

export default Login;
