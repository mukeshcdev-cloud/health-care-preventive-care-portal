import { useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./redux/mainReducer";
import Layout from "./Layout";
import { GlobalStyles, StyledEngineProvider } from "@mui/material";

const store = configureStore({ reducer: { root: reducer } });
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <Provider store={store}>
          <Layout />
        </Provider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
