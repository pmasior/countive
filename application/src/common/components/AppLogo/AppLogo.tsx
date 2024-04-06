import React, { FC } from "react";
import Typography from "@mui/material/Typography";

import { APP_LOGO_COLOR } from "src/common/constants/appStyle";

const AppLogo: FC<{
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: "default" | "white";
}> = ({ variant, color = "default" }) => {
  const realColor = color === "default" ? APP_LOGO_COLOR : "white";

  return (
    <Typography
      variant={variant}
      noWrap
      component="span"
      sx={{ color: realColor }}
    >
      countive
    </Typography>
  );
};

export default AppLogo;
