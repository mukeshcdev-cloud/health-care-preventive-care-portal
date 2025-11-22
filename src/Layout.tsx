import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Box, Toolbar } from "@mui/material";
import ResponsiveDrawer from "./components/Sidebar";
import Main from "./screens/Root";
import ProviderLayout from "./components/Provider/ProviderLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Box sx={{ display: "flex" }}>
        <ResponsiveDrawer />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - 240px)` },
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Toolbar />
          <Main />
        </Box>
      </Box>
    ),
  },
  {
    path: "/provider",
    element: <ProviderLayout />,
  },
  {
    path: "/provider/*",
    element: <ProviderLayout />,
  },
]);

const Layout = () => {
  return <RouterProvider router={router} />;
};
export default Layout;
