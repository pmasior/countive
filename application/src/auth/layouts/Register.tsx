import React from "react";

import FullPage from "src/common/components/FullPage/FullPage";
import RegisterForm from "../components/RegisterForm/RegisterForm";

export const Register = () => {
  return (
    <FullPage gridItemParams={{ md: 4 }}>
      <RegisterForm />
    </FullPage>
  );
};

export default Register;
