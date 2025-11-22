/**
 * App Component
 *
 * Root component of the Healthcare Wellness Portal application.
 * Sets up the theme, routing, and global providers.
 */

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouter } from "./navigation";

/**
 * Material UI Theme Configuration
 * Healthcare-focused color palette with teal and blue tones
 */
const theme = createTheme({
  palette: {
    primary: {
      main: "#00897B", // Teal
      light: "#4DB6AC",
      dark: "#00695C",
    },
    secondary: {
      main: "#0288D1", // Blue
      light: "#4FC3F7",
      dark: "#01579B",
    },
    background: {
      default: "#F0F7F7", // Light teal background
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRouter />
      </Router>
    </ThemeProvider>
  );
}

export default App;
