import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

export default function NavigationPromptWrapper() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("NavigationPromptWrapper mounted");

    const handlePopState = (event) => {
      console.log("Back button pressed at:", location.pathname);

      if (location.pathname === "/home") {
        const confirmed = window.confirm("Do you want to log out?");
        console.log("User response:", confirmed);

        if (!confirmed) {
          navigate("/home", { replace: true });
          console.log("User canceled, redirected back to /home");
        } else {
          navigate("/", { replace: true });
          console.log("User confirmed logout, redirected to /auth");
        }
      } else {
        console.log("No prompt needed on this path:", location.pathname);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      console.log("NavigationPromptWrapper unmounted");
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location, navigate]);

  return <Outlet />;
}
