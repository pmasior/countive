import { Icon } from "@mui/material";
import React, { FC } from "react";

type IconInMenuItemProps = {
  color?: string;
  iconName: string;
  label: string;
};

export const SelectOptionWithIcon: FC<IconInMenuItemProps> = ({
  color = "inherit",
  iconName,
  label,
}) => {
  return (
    <>
      <Icon
        fontSize="small"
        sx={{ color: color, fontSize: 16, verticalAlign: "bottom" }}
      >
        {iconName}
      </Icon>{" "}
      {label}
    </>
  );
};

export default SelectOptionWithIcon;
