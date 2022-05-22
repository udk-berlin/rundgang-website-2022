import { useState, useEffect } from "react";
const useIsSticky = height => {
  const [stickyClass, setStickyClass] = useState("relative");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > height ? setStickyClass("fixed") : setStickyClass("relative");
    }
  };
  return stickyClass;
};

export default useIsSticky;
