import * as React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import JobsSearchPage from "./pages/JobsSearchPage";
import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Lexend", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#55EFC4",
      light: "#55EFC4",
      dark: "#55EFC4",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <JobsSearchPage />
    </ThemeProvider>
  );
}

export default App;
