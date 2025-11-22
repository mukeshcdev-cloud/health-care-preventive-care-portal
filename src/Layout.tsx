import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ResponsiveDrawer from "./components/Sidebar";
import Main from "./screens/Root";
import ProviderLayout from "./components/Provider/ProviderLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <ResponsiveDrawer />
        <div className="pl-0 md:pl-[239px]">
          <Main />
        </div>
      </div>
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
