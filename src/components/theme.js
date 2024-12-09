import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(0, 32, 67, 1)",
    },
    secondary: {
      main: "rgba(168, 168, 168, 0.2)",
    },
  },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: "52px",
      color: "#2D2D2B",
      fontWeight: "700",
      lineHeight: "52px",
      "@media (max-width:900px)": {
        fontSize: "36px",
        lineHeight: "40px",
      },
    },
    h2: {
      fontSize: "30px",
      color: "#000",
      fontWeight: "600",
      lineHeight: "36px",
    },
    h3: {
      fontSize: "26px",
      color: "#000",
      fontWeight: "600",
      lineHeight: "33px",
    },
    h4: {
      fontSize: "22px",
      fontWeight: "600",
      lineHeight: "30px",
      color: "rgba(0, 32, 67, 1)",
    },
    h5: {
      fontSize: "19.53px",
      fontWeight: "500",
      lineHeight: "29.29px",
      color: "rgba(0, 32, 67, 1)",
    },
    h6: {
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: "22px",
      color: "#000",
    },
    subtitle1: {
      color: "rgba(51, 51, 51, 1)",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "22px",
    },
    subtitle2: {
      fontSize: "14px",
      color: "rgba(2, 66, 137, 1)",
      fontWeight: "500",
      lineHeight: "19px",
    },
    subtitle3: {
      fontSize: "12px",
      color: "rgba(0, 0, 0, 0.44)",
      fontWeight: "400",
      lineHeight: "14px",
    },
  },
});

export default theme;
