import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";

// Components
import Layout from "./components/Layout";
import Spinner from "./components/Spinner";

// features
import Auth from "./components/Auth";
import store from "./features/store";

// Pages
const SignUp = lazy(() => import("./pages/SignUp"));
const Landing = lazy(() => import("./pages/Landing"));
const SpaceScreen = lazy(() => import("./pages/SpaceScreen"));
const CreateSpacePage = lazy(() => import("./pages/CreateSpacePage"));
const FinalizedOrderPage = lazy(() => import("./pages/FinalizedOrderPage"));
const ComponentsTestPage = lazy(() => import("./pages/ComponentsTestPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));

// import SignUp from "./pages/SignUp";
// import Landing from "./pages/Landing";
// import SpaceScreen from "./pages/SpaceScreen";
// import CreateSpacePage from "./pages/CreateSpacePage";
// import FinalizedOrderPage from "./pages/FinalizedOrderPage";
// import ComponentsTestPage from "./pages/ComponentsTestPage";
// import AboutUsPage from "./pages/AboutUsPage";
// import ContactUsPage from "./pages/ContactUsPage";

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
        {
          path: "space/:spaceId",
          element: <SpaceScreen />,
        },
        {
          path: "about-us",
          element: <AboutUsPage />,
        },
        {
          path: "contact-us",
          element: <ContactUsPage />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </Provider>
  );
}

export default App;
