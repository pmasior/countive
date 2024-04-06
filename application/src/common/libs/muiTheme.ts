import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ["Ubuntu", "-apple-system"].join(","),
    fontWeightBold: "revert",
    fontWeightLight: "revert",
    fontWeightMedium: "revert",
    fontWeightRegular: "revert",
  },
  palette: {
    primary: {
      main: "#0070f3",
    },
  },
});
