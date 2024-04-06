import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Body from "src/auth/layouts/Register";

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register to countive</title>
      </Head>
      <Body />
    </>
  );
};

export default Register;
