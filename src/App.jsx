import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";

import Layout from "./components/Layout";
import store from "./features/store";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import Landing from "./pages/Landing";
import SpaceScreen from "./pages/SpaceScreen";

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
        {
          path:"home",
          element: <Landing/>
        },
        {
          path:"checkout",
          element: <SpaceScreen/>
        }
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
