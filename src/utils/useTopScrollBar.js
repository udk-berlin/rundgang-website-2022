import React, { useEffect, useState } from "react";

const useTopScrollBar = (bottom, top) => {
  let scrollPos = 0;
  useEffect(() => {
    const bottomScroll = document.getElementById(bottom);
    const topScroll = document.getElementById(top);
    const setFromBottom = e => {
      let newpos = e.target.scrollLeft;
      if (newpos === scrollPos) return false;
      scrollPos = newpos;
      topScroll.scrollLeft = newpos;
    };
    const setFromTop = e => {
      let newpos = e.target.scrollLeft;
      if (newpos === scrollPos) return false;
      scrollPos = newpos;
      bottomScroll.scrollLeft = newpos;
    };

    bottomScroll.addEventListener("scroll", setFromBottom, { passive: true });
    topScroll.addEventListener("scroll", setFromTop, { passive: true });

    return () => {
      bottomScroll.removeEventListener("scroll", setFromBottom, {
        passive: true,
      });
      topScroll.removeEventListener("scroll", setFromTop, { passive: true });
    };
  }, []);

  return scrollPos;
};

export default useTopScrollBar;
