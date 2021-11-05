import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Grid from "@mui/material/Grid";

import FullPage from "components/FullPage/FullPage";
import Welcome from "widgets/welcome/Welcome";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to countive</title>
        {/* TODO: responsive meta tag is needed? */}
      </Head>
      <FullPage>
        <Grid item md={6}>
          <Welcome />
        </Grid>
      </FullPage>
    </>
  );
};

export default Index;
