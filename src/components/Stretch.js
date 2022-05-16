import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StretchLayout = styled(motion.div)`
  transform-origin: "100% 0%";
  line-height: 1;
  letter-spacing: 0.1px;
  width: fit-content;
  height: fit-content;
  font-size: ${({ fontSize }) => `${fontSize}vh`};
  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ fontSize }) => `${fontSize - 3}vh`};
  }
`;
const INITIAL = {
  hidden: { scaleX: 0, originX: 0, x: "100%", y: 0 },
  enter: {
    scaleX: [null, 1],
    scaleY: [1, 1],
    originX: 0,
    x: "0%",
    y: 0,
  },
  exit: { scaleX: 0, scaleY: 0, originX: 0, x: "0%", y: 0 },
};

const getVariants = scalingX => ({
  hidden: {
    scaleX: 0,
    originX: 0,
    x: "0%",
    y: "0%",
  },
  enter: {
    scaleX: [null, scalingX],
    originX: 0,
    x: "0%",
    y: "0%",
  },
  exit: { scaleX: [scalingX, 0], originX: 0, x: "0%", y: "0%" },
});

const Stretch = ({ children, title, preferredSize, direction }) => {
  const stretchRef = useRef();
  const [variants, setVariants] = useState(INITIAL);
  const [fontSize, setFontSize] = useState(null);

  useEffect(() => {
    if (fontSize && stretchRef?.current?.clientWidth) {
      let factor = window.innerWidth / stretchRef?.current?.clientWidth;
      let scaledVar = getVariants(factor);
      setVariants(scaledVar);
      console.log(
        window.innerWidth / stretchRef?.current?.clientWidth,
        fontSize,
        title.length,
      );
    }
  }, [fontSize, title]);

  useEffect(() => {
    // TODO: multiple conditions to perfect sizing
    if (preferredSize) {
      setFontSize(preferredSize);
    }else if (title.length > 15) {
      setFontSize(6);
    } else {
      setFontSize(11);
    }
  }, [title]);
  return (
    <StretchLayout
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      fontSize={fontSize}
      transition={{ type: "linear", duration: 0.9, times: [0, 0.4] }}
      ref={stretchRef}
    >
      {children}
    </StretchLayout>
  );
};

export default Stretch;
