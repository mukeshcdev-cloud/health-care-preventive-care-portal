/**
 * App Component
 *
 * Root component of the Healthcare Wellness Portal application.
 * Sets up the theme, routing, and global providers.
 */

import { BrowserRouter as Router } from "react-router-dom";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouter } from "./navigation";

/**
 * Material UI Theme Configuration
 * Healthcare-focused color palette with teal and blue tones
 */

import { configureStore } from "@reduxjs/toolkit";
import reducer from "./redux/mainReducer";
import { Provider } from "react-redux";
import { GlobalStyles } from "@mui/material";

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
    accent: {
      main: "#673AB7",
      light: "#9572D2",
      dark: "#482880",
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
const store = configureStore({ reducer: { root: reducer } });
function App() {
  return (
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <AppRouter />
          </Router>
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;
