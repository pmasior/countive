import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { ComponentProps, useState } from "react";

export const useMUIMenu = (uniqueMenuId: string) => {
  const [menuPositioningElement, setMenuPositioningElement] =
    useState<null | HTMLElement>(null);
  const isMenuOpened = Boolean(menuPositioningElement);
  const openMenu = (event: React.MouseEvent<HTMLElement>) =>
    setMenuPositioningElement(event.currentTarget);
  const closeMenu = () => setMenuPositioningElement(null);
  const menuElementId = `${uniqueMenuId}-menu`;
  const menuControlsElementId = `${uniqueMenuId}-menu-controls`;

  const menuControlsProps: ComponentProps<typeof Button> = {
    "aria-controls": menuElementId,
    "aria-haspopup": true,
    "aria-expanded": isMenuOpened ? true : undefined,
    id: menuControlsElementId,
    onClick: openMenu,
  };

  const menuProps: ComponentProps<typeof Menu> = {
    id: menuElementId,
    anchorEl: menuPositioningElement,
    open: isMenuOpened,
    onClose: closeMenu,
    MenuListProps: {
      "aria-labelledby": menuControlsElementId,
    },
  };

  return { closeMenu, menuControlsProps, menuProps };
};
