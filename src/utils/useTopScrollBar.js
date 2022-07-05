import React, { useEffect, useState, useRef } from "react";

const useTopScrollBar = (switchPos, sundayPos) => {
  const [scrollPos, setScrollPos] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const bottomScroll = useRef();
  const topScroll = useRef();

  useEffect(() => {
    if (switchPos < scrollPos) {
      setSelectedDay(1);
    } else {
      setSelectedDay(0);
    }
  }, [scrollPos]);

  const switchDay = day => {
    if (day == 1) {
      setSelectedDay(1);
      bottomScroll.current.scrollLeft = sundayPos;
      topScroll.current.scrollLeft = sundayPos;
    } else {
      setSelectedDay(0);
      bottomScroll.current.scrollLeft = 0;
      topScroll.current.scrollLeft = 0;
    }
  };

  useEffect(() => {
    const setFromBottom = e => {
      if (topScroll.current) {
        let newpos = e.target.scrollLeft;
        setScrollPos(newpos);
        topScroll.current.scrollLeft = newpos;
      }
    };

    const setFromTop = e => {
      if (bottomScroll.current) {
        let newpos = e.target.scrollLeft;
        setScrollPos(newpos);
        bottomScroll.current.scrollLeft = newpos;
      }
    };

    bottomScroll.current.addEventListener("scroll", setFromBottom);
    topScroll.current.addEventListener("scroll", setFromTop);

    return () => {
      bottomScroll?.current?.removeEventListener("scroll", setFromBottom);
      topScroll?.current?.removeEventListener("scroll", setFromTop);
    };
  }, []);

  return { switchDay, selectedDay, bottomScroll, topScroll };
};

export default useTopScrollBar;
