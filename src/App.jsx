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
import Landing from "./pages/Landing";
import SpaceScreen from "./pages/SpaceScreen";
import CreateSpacePage from "./pages/CreateSpacePage";
import FinalizedOrderPage from "./pages/FinalizedOrderPage";
import ComponentsTestPage from "./pages/ComponentsTestPage";
import UserName from "./components/userNamePopup";
import { Suspense } from "react";
import Spinner from "./components/Spinner";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <SignIn />,
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
          path: "checkout",
          element: <SpaceScreen />,
        },
        {
          path: "create-space",
          element: <CreateSpacePage />,
        },
        {
          path: "finalized-order",
          element: <FinalizedOrderPage />,
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
      <Suspense fallback={<Spinner/>}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </Provider>
  
  );
}

export default App;
