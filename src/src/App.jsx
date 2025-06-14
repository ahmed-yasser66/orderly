import { createBrowserRouter, RouterProvider } from "react-router-dom"; // fix: should be 'react-router-dom'
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Store
import { store, persistor } from "./features/store";

// Components
import Layout from "./components/Layout";
import Button from "./components/Button";
import Table from "./components/Table";
import Auth from "./components/Auth";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import TestDashBoard from "./components/TestDashBoard";
import UserName from "./components/userNamePopup";
import Spinner from "./components/Spinner";

// Lazy-loaded Pages
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Landing = lazy(() => import("./pages/Landing"));
const SpaceScreen = lazy(() => import("./pages/SpaceScreen"));
const CreateSpacePage = lazy(() => import("./pages/CreateSpacePage"));
const FinalizedOrderPage = lazy(() => import("./pages/FinalizedOrderPage"));
const ComponentsTestPage = lazy(() => import("./pages/ComponentsTestPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));

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
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
