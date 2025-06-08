import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import Layout from "./components/Layout";
import store from "./features/store";

import Button from "./components/Button";
import Table from "./components/Table";
import Auth from "./components/Auth";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TestDashBoard from "./components/TestDashBoard";
import Landing from "./pages/Landing";
import CreateSpacePage from "./pages/CreateSpacePage.jsx";
import ComponentsTestPage from "./pages/ComponentsTestPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Auth />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "home",
          element: <Landing />,
        },
        {
          path: "create-space",
          element: <CreateSpacePage />,
        },
        {
          path: "components-test",
          element: <ComponentsTestPage />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
