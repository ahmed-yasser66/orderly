import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";

import Layout from "./components/Layout";
import store from "./features/store";
import Auth from "./components/Auth";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <LoginForm />,
        },
        {
          path: "signup",
          element: <SignUp />,
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
