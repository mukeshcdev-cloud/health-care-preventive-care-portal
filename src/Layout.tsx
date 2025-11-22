import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ResponsiveDrawer from "./components/Sidebar";
import Main from "./screens/Root";
import styled from "@emotion/styled";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
]);

const Layout = () => {
  return (
    <div>
      <ResponsiveDrawer />
      <div className="pl-0 md:pl-[239px] ">
        <RouterProvider router={router} />;
      </div>
    </div>
  );
};
export default Layout;
