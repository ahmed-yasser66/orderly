import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import Layout from "./components/Layout";
import store from "./features/store";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import Landing from "./pages/Landing";

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
          path:"home",
          element: <Landing/>
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
