import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const usePrompt = (shouldPrompt) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      console.log("Back button clicked");
      if (shouldPrompt) {
        const confirmed = window.confirm("Do you want to log out?");
        if (!confirmed) {
          // Push current location back to avoid navigation
          navigate(location.pathname, { replace: true });
        } else {
          navigate("/", { replace: true }); // go to Auth page
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [shouldPrompt, navigate, location.pathname]);
};

export default usePrompt;
