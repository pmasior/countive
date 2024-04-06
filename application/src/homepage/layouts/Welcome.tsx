import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import AppLogo from "src/common/components/AppLogo/AppLogo";
import FullPage from "src/common/components/FullPage/FullPage";
import { LOGIN_URL, REGISTER_URL } from "src/common/constants/urls";
import ActionCard from "../components/ActionCard/ActionCard";

const Welcome: FC<{}> = () => {
  return (
    <FullPage gridItemParams={{ md: 6 }}>
      <Grid container spacing={2} rowSpacing={4}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h2" textAlign="center">
            Welcome to <AppLogo variant="h2" />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" textAlign="center" marginBottom={6}>
            Make managing your household budget more convenient
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ActionCard
            title="Login"
            description="Get back to us"
            href={LOGIN_URL}
          />
        </Grid>
        <Grid item xs={6}>
          <ActionCard
            title="Register"
            description="Check our application"
            href={REGISTER_URL}
          />
        </Grid>
      </Grid>
    </FullPage>
  );
};

export default Welcome;
