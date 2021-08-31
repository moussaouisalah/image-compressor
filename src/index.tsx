import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import { pink, red } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D8810E",
      contrastText: "#D9D9D9",
    },
    secondary: {
      main: "#DD5A51",
    },
    background: {
      default: "#000",
    },
    text: {
      primary: "#D9D9D9",
      secondary: "#FFCC4D",
    },
    action: {
      disabledBackground: "rgba(216, 129, 14, 0.4)",
      disabled: "rgba(255, 255, 255, 0.4)",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
