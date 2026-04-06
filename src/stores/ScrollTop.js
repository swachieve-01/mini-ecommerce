import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("path:", pathname);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
}
