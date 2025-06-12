import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const useConfirmNavigation = (message = "Are you sure?", when = true) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!when) return;

    const handlePopState = (event) => {
      const confirmLeave = window.confirm(message);
      if (confirmLeave) {
        navigate("/", { replace: true }); // Navigate to Auth/Login
      } else {
        // Stay on current page by re-pushing the same location
        navigate(location.pathname, { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [when, message, navigate, location]);
};

export default useConfirmNavigation;
