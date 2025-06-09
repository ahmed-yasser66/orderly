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
<<<<<<< HEAD
import CreateSpacePage from "./pages/CreateSpacePage.jsx";
import ComponentsTestPage from "./pages/ComponentsTestPage";
=======
import SpaceScreen from "./pages/SpaceScreen";
import { Suspense } from "react";
import Spinner from "./components/Spinner";
>>>>>>> origin/yasser

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
<<<<<<< HEAD
          path: "create-space",
          element: <CreateSpacePage />,
        },
        {
          path: "components-test",
          element: <ComponentsTestPage />,
=======
          path: "checkout",
          element: <SpaceScreen />,
>>>>>>> origin/yasser
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
