import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === "PUSH") {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    }
  }, [pathname, navType]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return null;
}
