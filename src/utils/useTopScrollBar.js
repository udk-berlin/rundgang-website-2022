import React, { useEffect, useState } from "react";

const useTopScrollBar = (bottom, top) => {
  const [scrollPos, setScrollPos] = useState(0);
  useEffect(() => {
    const bottomScroll = document.getElementById(bottom);
    const topScroll = document.getElementById(top);
    const setFromBottom = e => {
      setScrollPos(e.target.scrollLeft);
      topScroll.scrollLeft = e.target.scrollLeft;
    };
    const setFromTop = e => {
      setScrollPos(e.target.scrollLeft);
      bottomScroll.scrollLeft = e.target.scrollLeft;
    };

    bottomScroll.addEventListener("scroll", setFromBottom);
    topScroll.addEventListener("scroll", setFromTop);

    return () => {
      bottomScroll.removeEventListener("scroll", setFromBottom);
      topScroll.removeEventListener("scroll", setFromTop);
    };
  }, []);

  return scrollPos;
};

export default useTopScrollBar;
