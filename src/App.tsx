import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
<<<<<<< HEAD
=======
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import ProfileScreen from "./screens/ProfileScreen";
>>>>>>> 938521b32a3332ee640d3ea352441caf07f9538b
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./redux/mainReducer";
import { Provider } from "react-redux";
import { GlobalStyles } from "@mui/material";
<<<<<<< HEAD
import Layout from "./Layout";
=======
>>>>>>> 938521b32a3332ee640d3ea352441caf07f9538b

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
  return (
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
<<<<<<< HEAD
          <Layout />
=======
          {isLoggedIn ? (window.location.pathname === "/profile" ? <ProfileScreen /> : <Dashboard />) : (
            <LoginScreen />
          )}
>>>>>>> 938521b32a3332ee640d3ea352441caf07f9538b
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;
