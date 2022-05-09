import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StretchLayout = styled(motion.div)`
  transform-origin: "100% 0%";
  line-height: 1;
  letter-spacing: 0.1px;
  font-size: 10vh;
  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: 8vh;
  }
`;
const variants = {
  hidden: { scaleX: 0, originX: 0, x: "100%", y: 0 },
  enter: { scaleX: [null, 1], scaleY: [1, 1, 1], originX: 0, x: "0%", y: 0 },
  exit: { scaleX: 0, scaleY: 0, originX: 0, x: "0%", y: 0 },
};

const Stretch = ({ children }) => (
  <StretchLayout
    initial="hidden"
    animate="enter"
    exit="exit"
    variants={variants}
    transition={{ type: "linear", duration: 0.9, times: [0, 0.4] }}
  >
    {children}
  </StretchLayout>
);

export default Stretch;
