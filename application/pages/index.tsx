import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Body from "src/homepage/layouts/Welcome";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to countive</title>
        {/* TODO: responsive meta tag is needed? */}
      </Head>
      <Body />
    </>
  );
};

export default Index;
