import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[]
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
