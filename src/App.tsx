import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./redux/mainReducer";
import { Provider } from "react-redux";
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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoggedIn ? <Dashboard /> : <LoginScreen />}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
