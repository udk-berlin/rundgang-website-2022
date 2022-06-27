import { useState, useEffect } from "react";
const useIsScrolled = height => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkIfScrolled);

    return () => {
      window.removeEventListener("scroll", checkIfScrolled);
    };
  }, []);

  const checkIfScrolled = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > height ? setScrolled(true) : setScrolled(false);
    }
  };
  return scrolled;
};

export const useIsScrolledX = (limit, id) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let target = document.getElementById(id);
    target.addEventListener("scroll", checkIfScrolled);

    return () => {
      target.removeEventListener("scroll", checkIfScrolled);
    };
  }, []);

  const checkIfScrolled = (e) => {
    if (window !== undefined && id !== undefined) {
      let scrollpos = e.target.scrollLeft;
      scrollpos > limit ? setScrolled(true) : setScrolled(false);
    }
  };
  return scrolled;
};

export default useIsScrolled;
