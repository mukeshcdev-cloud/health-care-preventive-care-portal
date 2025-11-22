import { useState } from "react";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./redux/mainReducer";
import { Provider } from "react-redux";
import { GlobalStyles } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00897B",
      light: "#4DB6AC",
      dark: "#00695C",
    },
    secondary: {
      main: "#0288D1",
      light: "#4FC3F7",
      dark: "#01579B",
    },
    accent: {
      main: "#673AB7",
      light: "#9572D2",
      dark: "#482880",
    },
    background: {
      default: "#F0F7F7",
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
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change to false to see login screen

  return (
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isLoggedIn ? <Dashboard /> : <LoginScreen />}
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;
