import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Body from "src/auth/layouts/Login";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login to countive</title>
      </Head>
      <Body />
    </>
  );
};

export default Login;
