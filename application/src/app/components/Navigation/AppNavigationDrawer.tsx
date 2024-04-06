import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconDisplayer from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useGenerateCategories } from "src/app/hooks/useGenerateCategories";
import { APP_SETTINGS_URL, APP_URL } from "src/common/constants/urls";

export type DrawerElement = {
  icon: string;
  label: string;
  onClick: () => void;
};

const AppNavigationDrawer: FC<{
  openDrawerOnMobile: boolean;
  handleDrawerToggleOnClick: () => void;
}> = ({ openDrawerOnMobile, handleDrawerToggleOnClick }) => {
  const router = useRouter();
  const categories = useGenerateCategories();

  const changePage = (url: string) => {
    router.push(url);
    handleDrawerToggleOnClick();
  };

  // TODO: check if category and icons is empty?
  const drawerElements: DrawerElement[] = [
    ...categories.map((c) => ({
      label: c.name,
      icon: c.icon?.name || "",
      onClick: () => changePage(`${APP_URL}/${c.name.toLowerCase()}`),
    })),
    {
      label: "Settings",
      icon: "settings",
      onClick: () => changePage(APP_SETTINGS_URL),
    },
    {
      label: "Logout",
      icon: "logout",
      onClick: () => signOut(),
    },
  ];

  return (
    <Box component="nav">
      <Drawer open={openDrawerOnMobile} onClose={handleDrawerToggleOnClick}>
        <List>
          {drawerElements.map((e) => (
            <ListItem
              button
              key={`appNavigationDrawerElement_${e.label}`}
              onClick={e.onClick}
            >
              <ListItemIcon>
                <IconDisplayer>{e.icon}</IconDisplayer>
              </ListItemIcon>
              <ListItemText>{e.label}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default AppNavigationDrawer;
