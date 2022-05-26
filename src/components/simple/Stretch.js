import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import useWindowSize from "@/utils/useWindowSize";

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
  hidden: {
    scaleX: 0,
    originX: "0%",
    x: "0%",
    y: "0%",
  },
  visible: {
    scaleX: 1,
    originX: "0%",
    x: "0%",
    y: "0%",
  },
};

const getVariants = (scalingX, direction) => ({
  hidden: {
    scaleX: 0,
    originX: "0%",
    x: "0%",
    y: "0%",
    width: 0,
  },
  visible: {
    scaleX: scalingX,
    originX: "0%",
    x: `${direction == "left" ? 100 : 0}%`,
    y: "0%",
    width: "100%",
  },
});

const Stretch = ({
  children,
  title,
  preferredSize,
  direction = "left",
  duration = 0.1,
}) => {
  const stretchRef = useRef();
  const size = useWindowSize();
  const [variants, setVariants] = useState(INITIAL);
  const [fontSize, setFontSize] = useState(null);

  useEffect(() => {
    if (fontSize && stretchRef?.current?.clientWidth) {
      let factor = size.width / stretchRef?.current?.clientWidth;
      if (factor > 1) {
        factor = variants.visible.scaleX * factor;
      } else if (factor < 1) {
        factor = variants.visible.scaleX / factor;
      }
      factor -= 0.02;
      let scaledVar = getVariants(factor);
      setVariants(scaledVar, direction);
    }
  }, [title, size]);

  useEffect(() => {
    // TODO: multiple conditions to perfect sizing
    if (preferredSize) {
      setFontSize(preferredSize);
    } else if (title.length > 15) {
      setFontSize(6);
    } else {
      setFontSize(11);
    }
  }, [title]);
  return (
    <StretchLayout
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      fontSize={fontSize}
      transition={{ type: "linear", duration: duration }}
      ref={stretchRef}
    >
      {children}
    </StretchLayout>
  );
};

export default Stretch;
