import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { APP_SETTINGS_URL } from "src/common/constants/urls";
import { useMUIMenu } from "src/common/hooks/useMUIMenu";

export const ProfileMenu: FC<{}> = () => {
  const router = useRouter();
  const { closeMenu, menuControlsProps, menuProps } = useMUIMenu("profile");

  const goToUrl = (url: string) => {
    router.push(url);
    closeMenu();
  };

  return (
    <>
      <IconButton {...menuControlsProps}>
        <Avatar sx={{ width: 24, height: 24 }}>P</Avatar>
      </IconButton>
      <Menu {...menuProps}>
        <MenuItem onClick={() => goToUrl(APP_SETTINGS_URL)}>Settings</MenuItem>
        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
      </Menu>
    </>
  );
};
