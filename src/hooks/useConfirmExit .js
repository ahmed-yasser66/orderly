// hooks/useConfirmExit.js
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function useConfirmExit(shouldBlock) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (shouldBlock) {
        e.preventDefault();
        e.returnValue = ""; // Required for some browsers
      }
    };

    const handlePopState = () => {
      if (shouldBlock) {
        const confirmExit = window.confirm("Do you want to log out?");
        if (!confirmExit) {
          // Push the same path to prevent navigation
          navigate(location.pathname, { replace: true });
        } else {
          // allow logout
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [shouldBlock, navigate, location]);
}
