import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";

import Layout from "./components/Layout";
import store from "./features/store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
