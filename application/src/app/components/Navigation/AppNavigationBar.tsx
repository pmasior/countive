import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React, { FC } from "react";
import AppLogo from "src/common/components/AppLogo/AppLogo";
import { BudgetMenu } from "./BudgetMenu";
import { NavigationTabs } from "./NavigationTabs";
import { ProfileMenu } from "./ProfileMenu";
import { SearchField } from "./SearchField";

const AppNavigationBar: FC<{
  handleDrawerToggleOnClick: () => void;
}> = ({ handleDrawerToggleOnClick }) => {
  const displayOnMobileScreen = {
    display: { xs: "block", md: "none" },
  };
  const displayOnDesktopScreen = {
    display: { xs: "none", md: "block" },
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container columnSpacing={1} alignItems="center">
            <Grid item sx={{ ...displayOnMobileScreen }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggleOnClick}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{ ...displayOnDesktopScreen }}>
              <AppLogo variant={"h5"} color={"white"} />
            </Grid>
            <Grid item sx={{ ...displayOnDesktopScreen }}>
              <NavigationTabs />
            </Grid>
            <Grid item sx={{ flexGrow: 1 }} />
            <Grid item>
              <SearchField />
            </Grid>
            <Grid item>
              <BudgetMenu />
            </Grid>
            <Grid item sx={{ ...displayOnDesktopScreen }}>
              <ProfileMenu />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default AppNavigationBar;
