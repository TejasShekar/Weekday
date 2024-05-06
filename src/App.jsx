import * as React from "react";
import { createTheme, ThemeProvider, CssBaseline, Typography } from "@mui/material";
import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Lexend", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Typography variant="h3">Search Jobs | Weekday</Typography>
    </ThemeProvider>
  );
}

export default App;
