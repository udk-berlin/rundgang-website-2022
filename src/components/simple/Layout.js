import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const MainLayout = styled(motion.main)`
  width: 100%;
  background-color: ${({ isEvent, theme }) =>
    isEvent ? theme.colors.lightHighlight : theme.colors.white};
`;
const variants = {
  hidden: {
    scaleX: 0,
    originX: "0%",
    x: "0%",
    y: "0%",
  },
  enterleft: {
    scaleX: 1,
    originX: "100%",
    x: "0%",
    y: "0%",
  },
  enterright: {
    scaleX: 1,
    originX: "0%",
    x: "0%",
    y: "0%",
  },
  exitleft: { scaleX: 0, originX: "0%", x: "0%", y: "0%" },
  exitright: { scaleX: 0, originX: "0%", x: "0%", y: "0%" },
};

const Layout = ({ children, direction = "left", isEvent }) => (
  <MainLayout
    initial="hidden"
    animate={`enter${direction}`}
    exit={`exit${direction}`}
    variants={variants}
    isEvent={isEvent}
    transition={{ type: "linear", duration: 0.8 }}
  >
    {children}
  </MainLayout>
);

export default Layout;
